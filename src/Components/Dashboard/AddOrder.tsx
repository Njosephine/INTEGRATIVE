import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import axios from 'axios';

interface Product {
  productID: number;
  productName: string;
}

interface Supplier {
  supplierID: string; // Change to string based on your API response
  supplierName: string; // Combine first and last name
}

interface OrderFormValues {
  quantityOrdered: number;
  orderDate: string;
  supplierID: string; 
 
  productID: number;
}

const CreateOrders: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Fetch products and suppliers from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ success: boolean; products: Product[] }>('http://localhost:4000/api/products/products');
        console.log('Products response:', response.data);

        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          message.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to fetch products');
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/supplier/suppliers');
        console.log('Suppliers response:', response.data);

        if (Array.isArray(response.data)) { // Ensure the response is an array
          const formattedSuppliers = response.data.map((supplier: any) => ({
            supplierID: supplier.supplierID, // Use the correct field from your response
            supplierName: `${supplier.supplier_first_name} ${supplier.supplier_last_name}`, // Combine names
          }));
          setSuppliers(formattedSuppliers);
        } else {
          message.error('Failed to fetch suppliers');
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        message.error('Failed to fetch suppliers');
      }
    };

    fetchProducts();
    fetchSuppliers();
  }, []);

  // Handle form submission
  const onFinish = async (values: OrderFormValues) => {
    console.log('Received values:', values);

    const orderData = {
      quantityOrdered: values.quantityOrdered,
      orderDate: values.orderDate,
      productID: values.productID,
      supplierID: values.supplierID,
     
    };

    try {
      await axios.post('http://localhost:4000/api/order/orders', orderData);
      message.success('Order placed successfully!');
      form.resetFields(); // Reset form after submission
    } catch (error) {
      console.error('Error placing order:', error);
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
