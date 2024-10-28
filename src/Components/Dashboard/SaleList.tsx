import React, { useEffect, useState } from 'react';
import { Table, message, Button, Modal, Form, InputNumber, DatePicker, Select } from 'antd';
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
  
      if (response.data.success && Array.isArray(response.data.sales)) {
        const formattedSales = response.data.sales.map(sale => {
          const saleDateMoment = moment(sale.saleDate);
          return {
            ...sale,
            saleDate: saleDateMoment.format('YYYY-MM-DD'), // Only date
            time: saleDateMoment.format('HH:mm:ss'), // Separate time
          };
        });
        setSales(formattedSales);
      } else {
        message.error('Failed to fetch sales');
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
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
      const updatedSale = {
        ...form.getFieldsValue(),
        saleDate: form.getFieldValue('saleDate').toISOString(), 
      };
      
      // Log the updated data to verify it before sending
      console.log("Updated Sale Data:", updatedSale);
  
      const response = await axios.put(`http://localhost:4000/api/sale/update/${editingSale?._id}`, updatedSale);
  
      // Check if the response was successful and proceed
      if (response.data.success) {
        message.success('Sale updated successfully');
  
        // Update the local sales state immediately for better UX
        setSales(prevSales =>
          prevSales.map(sale => sale._id === editingSale?._id ? { ...sale, ...updatedSale } : sale)
        );
  
        // Reset editing state
        setIsEditing(false);
        setEditingSale(null);
      } else {
        message.error('Failed to update sale');
      }
    } catch (error) {
      console.error('Failed to update sale:', error);
      message.error('Failed to update sale');
    }
  };
  

  
  const columns = [
    {
      title: 'No.',
      key: 'index', // Key for the index column
      render: (_: any, __: Sale, index: number) => index + 1, 
    },
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
      title: 'Time',
      dataIndex: 'time',
      
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
          {/* <Popconfirm
            title="Are you sure you want to delete this sale?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm> */}
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
        open={isEditing}  
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
