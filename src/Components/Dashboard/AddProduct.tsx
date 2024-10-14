import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';

import axios from 'axios';

interface Category {
  categoryID: number;
  categoryName: string;
}

interface Supplier {
  supplierID: number;
  supplierName: string;
}

interface User {
  userID: number;
  userName: string;
}

interface ProductFormValues {
  productID: string;
  productName: string;
  description: string;
  categoryID: number;
  supplierID: number;
  userID: number;
  quantityAvailable: number;
  purchasePrice: number;
  sellingPrice: number;
  image?: File; 
}

const AddProducts: React.FC = () => {
  const [form] = Form.useForm<ProductFormValues>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null); 

  // Fetch categories, suppliers, and users from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch {
        message.error('Failed to fetch categories');
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

    fetchCategories();
    fetchSuppliers();
    fetchUsers();
  }, []);

  // Handle form submission
  const onFinish = async (values: ProductFormValues) => {
    console.log('Received values:', values);

    // Create a FormData object to handle image and other fields
    const formData = new FormData();
    formData.append('productID', values.productID);
    formData.append('productName', values.productName);
    formData.append('description', values.description);
    formData.append('categoryID', values.categoryID.toString());
    formData.append('supplierID', values.supplierID.toString());
    formData.append('userID', values.userID.toString());
    formData.append('quantityAvailable', values.quantityAvailable.toString());
    formData.append('purchasePrice', values.purchasePrice.toString());
    formData.append('sellingPrice', values.sellingPrice.toString());
   

    // Append the image file
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Product added successfully!');
      form.resetFields(); 
      setImageFile(null); 
    } catch {
      message.error('Failed to add product');
    }
  };

  // Handle image upload change
  const handleImageChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      // If image is uploaded successfully, save the file
      setImageFile(info.file.originFileObj as File); // Use correct type assertion for File
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
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
      {/* Product ID */}
      <Form.Item name="productID" label="Product ID" rules={[{ required: true, message: 'Please enter product ID' }]}>
        <Input placeholder="Enter product ID" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Product Name */}
      <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
        <Input placeholder="Enter product name" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Product Description */}
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter product description' }]}>
        <Input.TextArea rows={4} placeholder="Enter product description" style={{ fontSize: '15px' }} />
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

      {/* Quantity Available */}
      <Form.Item
        name="quantityAvailable"
        label="Quantity Available"
        rules={[{ required: true, message: 'Please enter quantity available' }]}
      >
        <InputNumber min={1} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter quantity available" />
      </Form.Item>

      {/* Purchase Price */}
      <Form.Item name="purchasePrice" label="Purchase Price" rules={[{ required: true, message: 'Please enter the purchase price' }]}>
        <InputNumber min={0} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter purchase price" formatter={(value) => `${value}` } />
      </Form.Item>

      {/* Selling Price */}
      <Form.Item name="sellingPrice" label="Selling Price" rules={[{ required: true, message: 'Please enter the selling price' }]}>
        <InputNumber min={0} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter selling price" formatter={(value) =>  `${value}`} />
      </Form.Item>

    
      {/* Image Upload */}
      <Form.Item name="image" label="Product Image" valuePropName="fileList" getValueFromEvent={handleImageChange}>
        <Upload
          name="image"
          listType="picture"
          accept="image/*"
          customRequest={() => {}} 
          beforeUpload={(file) => {
            setImageFile(file); 
            return false; 
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProducts