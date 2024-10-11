import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, InputNumber, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

interface Sale {
  saleID: string;
  prodID: number;
  quantitySold: number;
  unitPrice: number;
  totalPrice: number;
  saleDate: string;
  statusOfPayment: string;
}

const SalesList: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [form] = Form.useForm();

  // Fetch sales data from the API
  const fetchSales = async () => {
    try {
      const response = await axios.get<Sale[]>('http://localhost:5000/api/sales');
      setSales(response.data);
    } catch {
      message.error('Failed to fetch sales');
    }
  };

  // Fetch sales data on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  // Handle Edit action
  const handleEdit = (record: Sale) => {
    setIsEditing(true);
    setEditingSale(record);
    form.setFieldsValue({
      prodID: record.prodID,
      quantitySold: record.quantitySold,
      unitPrice: record.unitPrice,
      totalPrice: record.totalPrice,
      saleDate: moment(record.saleDate), // Convert string to moment for DatePicker
      statusOfPayment: record.statusOfPayment,
    });
  };

  // Handle Update action after editing
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/sales/${editingSale?.saleID}`, {
        ...form.getFieldsValue(),
        saleDate: form.getFieldValue('saleDate').format('YYYY-MM-DD'),
      });
      message.success('Sale updated successfully');
      fetchSales(); // Refresh sales list
      setIsEditing(false);
      setEditingSale(null);
    } catch {
      message.error('Failed to update sale');
    }
  };

  // Handle Delete action
  const handleDelete = async (saleID: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/sales/${saleID}`);
      message.success('Sale deleted successfully');
      fetchSales(); // Refresh sales list
    } catch {
      message.error('Failed to delete sale');
    }
  };

  const columns = [
    {
      title: 'Sale ID',
      dataIndex: 'saleID',
      key: 'saleID',
    },
    {
      title: 'Product ID',
      dataIndex: 'prodID',
      key: 'prodID',
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
    {
      title: 'Payment Status',
      dataIndex: 'statusOfPayment',
      key: 'statusOfPayment',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Sale) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this sale?"
            onConfirm={() => handleDelete(record.saleID)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table 
        dataSource={sales} 
        columns={columns} 
        rowKey="saleID" 
        pagination={{ pageSize: 5 }} 
        style={{ marginTop: '20px' }} 
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Sale"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setEditingSale(null);
        }}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Product ID" name="prodID">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Quantity Sold" name="quantitySold">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Unit Price" name="unitPrice">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Total Price" name="totalPrice">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Sale Date" name="saleDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Payment Status" name="statusOfPayment">
            <Select>
              <Select.Option value="Paid">Paid</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Overdue">Overdue</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SalesList;
