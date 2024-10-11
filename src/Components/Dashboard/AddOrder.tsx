import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import axios from 'axios';

interface Product {
  productID: number;
  productName: string;
}

interface Supplier {
  supplierID: number;
  supplierName: string;
}

interface User {
  userID: number;
  userName: string;
}

interface OrderFormValues {
  orderID: number;
  quantityOrdered: number;
  orderDate: string;
  supplierID: number;
  userID: number;
  productID: number;
}

const CreateOrders: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch products, suppliers, and users from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch {
        message.error('Failed to fetch products');
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get<Supplier[]>('http://localhost:5000/api/suppliers');
        setSuppliers(response.data);
      } catch {
        message.error('Failed to fetch suppliers');
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch {
        message.error('Failed to fetch users');
      }
    };

    fetchProducts();
    fetchSuppliers();
    fetchUsers();
  }, []);

  // Handle form submission
  const onFinish = async (values: OrderFormValues) => {
    console.log('Received values:', values);

    const orderData = {
      orderID: values.orderID,
      quantityOrdered: values.quantityOrdered,
      orderDate: values.orderDate,
      productID: values.productID,
      supplierID: values.supplierID,
      userID: values.userID,
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      message.success('Order placed successfully!');
      form.resetFields(); // Reset form after submission
    } catch {
      message.error('Failed to place order');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{
        width: 600,
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Order ID */}
      <Form.Item name="orderID" label="Order ID" rules={[{ required: true, message: 'Please enter order ID' }]}>
        <Input placeholder="Enter order ID" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Order Date */}
      <Form.Item name="orderDate" label="Order Date" rules={[{ required: true, message: 'Please enter order date' }]}>
        <Input type="date" placeholder="Select order date" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Product Selection */}
      <Form.Item name="productID" label="Product" rules={[{ required: true, message: 'Please select a product' }]}>
        <Select placeholder="Select product" style={{ height: '40px', fontSize: '16px' }}>
          {products.map((product) => (
            <Select.Option key={product.productID} value={product.productID}>
              {product.productName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Supplier Selection */}
      <Form.Item name="supplierID" label="Supplier" rules={[{ required: true, message: 'Please select a supplier' }]}>
        <Select placeholder="Select supplier" style={{ height: '40px', fontSize: '16px' }}>
          {suppliers.map((supplier) => (
            <Select.Option key={supplier.supplierID} value={supplier.supplierID}>
              {supplier.supplierName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* User Selection */}
      <Form.Item name="userID" label="User" rules={[{ required: true, message: 'Please select a user' }]}>
        <Select placeholder="Select user" style={{ height: '40px', fontSize: '16px' }}>
          {users.map((user) => (
            <Select.Option key={user.userID} value={user.userID}>
              {user.userName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Quantity Ordered */}
      <Form.Item name="quantityOrdered" label="Quantity Ordered" rules={[{ required: true, message: 'Please enter quantity ordered' }]}>
        <InputNumber min={1} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter quantity ordered" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
          Place Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrders;
