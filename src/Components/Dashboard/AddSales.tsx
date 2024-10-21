import React, { useEffect, useState } from 'react';
import { Form, Button, Select, InputNumber, DatePicker, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

interface Product {
  productID: string; 
  productName: string;
}

interface SaleFormValues {
  productID: string;
  quantitySold: number;
  unitPrice: number;
  saleDate: moment.Moment;
  statusOfPayment: string;
}

const AddSales: React.FC = () => {
  const [form] = Form.useForm<SaleFormValues>();
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/products');
        console.log('Fetched products:', response.data); // Log the fetched data

        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Access the products array
        } else {
          message.error('Invalid product data format');
        }
      } catch (error) {
        message.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  // Function to handle form submission
  const onFinish = async (values: SaleFormValues) => {
    console.log('Received values:', values);
    
    try {
      await axios.post('http://localhost:4000/api/sale/sales', values); 
      message.success('Sale added successfully!');
      form.resetFields(); // Reset form after submission
    } catch {
      message.error('Failed to add sale');
    }
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={onFinish} 
      style={{ 
        width: 500, 
        margin: '100px auto',
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {/* Product Selection */}
      <Form.Item name="productID" label="Product" rules={[{ required: true, message: 'Please select a product' }]}>

        <Select 
          placeholder="Select product" 
          style={{ height: '40px', fontSize: '16px' }} // Increased select size
        >
          {products.map((product) => (
            <Select.Option key={product.productID} value={product.productID}>
              {product.productName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Quantity Sold */}
      <Form.Item
        name="quantitySold"
        label="Quantity Sold"
        rules={[{ required: true, message: 'Please enter the quantity sold' }]}
      >
        <InputNumber 
          min={1} 
          style={{ width: '100%', height: '40px', fontSize: '16px' }} 
          placeholder="Enter quantity sold" 
        />
      </Form.Item>

      {/* Unit Price */}
      <Form.Item name="unitPrice" label="Unit Price" rules={[{ required: true, message: 'Please enter the unit price' }]}>
        <InputNumber
          min={0}
          style={{ width: '100%', height: '40px', fontSize: '16px' }} 
          placeholder="Enter unit price"
          formatter={(value) => `$ ${value}`}
        />
      </Form.Item>

      {/* Sale Date */}
      <Form.Item name="saleDate" label="Sale Date" rules={[{ required: true, message: 'Please select a sale date' }]}>
        <DatePicker 
          defaultValue={moment()} 
          style={{ width: '100%', height: '40px' }} 
        />
      </Form.Item>

      {/* Payment Status */}
      <Form.Item
        name="statusOfPayment"
        label="Payment Status"
        rules={[{ required: true, message: 'Please select payment status' }]}
      >
        <Select 
          placeholder="Select payment status" 
          style={{ height: '40px', fontSize: '16px' }} 
        >
          <Select.Option value="Cash">Cash</Select.Option>
          <Select.Option value="MobileMoney">MobileMoney</Select.Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', fontSize: '16px' }}>
          Add Sale
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSales;
