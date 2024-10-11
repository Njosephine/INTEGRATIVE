// SalesList.tsx
import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

interface Order {
    orderID: number;
    quantityOrdered: number;
    orderDate: string;
    supplierID: number;
    userID: number;
    productID: number;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch sales data from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch {
      message.error('Failed to fetch sales');
    }
  };

  // Fetch sales data on component mount
  useEffect(() => {
    fetchOrders();
  }, []);


  // Handle deleting an order
  const handleDelete = async (orderID: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderID}`);
      message.success('Order deleted successfully');
      setOrders(orders.filter((order) => order.orderID !== orderID));
    } catch {
      message.error('Failed to delete order');
    }
  };

  // Show the modal and populate form with order data
  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
    form.setFieldsValue(order);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle form submission to update order
  const handleUpdate = async (values: Order) => {
    if (editingOrder) {
      try {
        await axios.put(`http://localhost:5000/api/orders/${editingOrder.orderID}`, values);
        message.success('Order updated successfully!');
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.orderID === editingOrder.orderID ? { ...editingOrder, ...values } : order))
        );
        setIsModalVisible(false);
        form.resetFields();
      } catch {
        message.error('Failed to update order');
      }
    }
  };
 const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderID',
    key: 'orderID',
  },
  {
    title: 'Quantity Ordered',
    dataIndex: 'quantityOrdered',
    key: 'quantityOrdered',
  },
  {
    title: 'Supplier ID',
    dataIndex: 'supplierID',
    key: 'supplierID',
  },
  {
    title: 'User ID',
    dataIndex: 'userID',
    key: 'userID',
  },
  {
    title: 'Product ID',
    dataIndex: 'productID',
    key: 'productID',
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: unknown, record: Order) => ( // Explicitly type 'record' as 'Order'
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this order?"
          onConfirm={() => handleDelete(record.orderID)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];


  return (
    <>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderID"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: '50px' }}
      />

      {/* Modal for editing order */}
      <Modal
        title="Edit Order"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Use form submit button for modal actions
      >
      <Form
         form={form}
         layout="vertical"
         onFinish={handleUpdate}
         initialValues={editingOrder || undefined} // Pass undefined instead of null
       >
          {/* Order Date */}
          <Form.Item name="orderDate" label="Order Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>

          {/* Product */}
          <Form.Item name="productID" label="Product" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>

          {/* Supplier */}
          <Form.Item name="supplierID" label="Supplier" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>

          {/* Quantity Ordered */}
          <Form.Item name="quantityOrdered" label="Quantity Ordered" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Update Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderList;