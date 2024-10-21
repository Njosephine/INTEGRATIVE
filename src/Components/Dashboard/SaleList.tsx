import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, InputNumber, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

interface Sale {
  _id: string;
  productID: number;
  quantitySold: number;
  unitPrice: number;
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
      const response = await axios.get<{ success: boolean; sales: Sale[] }>('http://localhost:4000/api/sale/sales');
      console.log('API Response:', response.data); // Log the full response

      if (response.data.success && Array.isArray(response.data.sales)) {
        setSales(response.data.sales); // Set sales from the correct property
        console.log('Sales Data:', response.data.sales); // Log the sales data
      } else {
        message.error('Failed to fetch sales');
      }
    } catch (error) {
      console.error('Error fetching sales:', error); // Log any errors
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
      productID: record.productID,
      quantitySold: record.quantitySold,
      unitPrice: record.unitPrice,
      saleDate: moment(record.saleDate), // Convert string to moment for DatePicker
      statusOfPayment: record.statusOfPayment,
    });
  };

  // Handle Update action after editing
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/sales/${editingSale?._id}`, {
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
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
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
            onConfirm={() => handleDelete(record._id)}
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
        rowKey="_id" 
        pagination={{ pageSize: 5 }} 
        style={{ marginTop: '20px' }} 
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Sale"
        open={isEditing}  // Use 'open' instead of 'visible'
        onCancel={() => {
          setIsEditing(false);
          setEditingSale(null);
        }}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Quantity Sold" name="quantitySold" rules={[{ required: true, message: 'Please input quantity sold!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Unit Price" name="unitPrice" rules={[{ required: true, message: 'Please input unit price!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Sale Date" name="saleDate" rules={[{ required: true, message: 'Please select sale date!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Payment Status" name="statusOfPayment" rules={[{ required: true, message: 'Please select payment status!' }]}>
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="MobileMoney">MobileMoney</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SalesList;
