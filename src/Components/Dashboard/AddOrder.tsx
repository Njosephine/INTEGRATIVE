import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import axios from 'axios';

interface Product {
  productID: number;
  productName: string;
}

interface Supplier {
  supplierID: string;
  supplierName: string;
}

interface Category {
  categoryID: string;
  categoryName: string;
}

interface OrderFormValues {
  quantityOrdered: number;
  orderDate: string;
  supplierID: string; 
  productID: number;
  categoryID: string;
}

const CreateOrders: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch products, suppliers, and categories from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/products');
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
        if (Array.isArray(response.data)) {
          const formattedSuppliers = response.data.map((supplier: any) => ({
            supplierID: supplier.supplierID,
            supplierName: `${supplier.supplier_first_name} ${supplier.supplier_last_name}`,
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/category/categories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          message.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Failed to fetch categories');
      }
    };

    fetchProducts();
    fetchSuppliers();
    fetchCategories();
  }, []);

  // Handle form submission
  const onFinish = async (values: OrderFormValues) => {
    const orderData = {
      quantityOrdered: values.quantityOrdered,
      orderDate: values.orderDate,
      productID: values.productID,
      supplierID: values.supplierID,
      categoryID: values.categoryID,
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
        <Input type="date" style={{ height: '40px', fontSize: '15px' }} />
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

      {/* Category Selection */}
      <Form.Item name="categoryID" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
        <Select placeholder="Select category" style={{ height: '40px', fontSize: '16px' }}>
          {categories.map((category) => (
            <Select.Option key={category.categoryID} value={category.categoryID}>
              {category.categoryName}
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
