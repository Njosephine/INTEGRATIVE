import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

interface Category {
  categoryID: number;
  categoryName: string;
}

interface Supplier {
  supplierID: number;
  supplierName: string;
}

interface ProductFormValues {
  productID: string;
  productName: string;
  description: string;
  categoryID: number;
  supplierID: number;
  quantityAvailable: number;
  purchasePrice: number;
  sellingPrice: number;
  image?: File;
}

const AddProducts: React.FC = () => {
  const [form] = Form.useForm<ProductFormValues>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:4000/api/category/categories');
        setCategories(response.data);
      } catch {
        message.error('Failed to fetch categories');
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get<Supplier[]>('http://localhost:4000/api/supplier/suppliers');
        setSuppliers(response.data);
      } catch {
        message.error('Failed to fetch suppliers');
      }
    };

    fetchCategories();
    fetchSuppliers();
  }, []);

  const onFinish = async (values: ProductFormValues) => {
    console.log('Received values:', values);

    const formData = new FormData();
    formData.append('productID', values.productID);
    formData.append('productName', values.productName);
    formData.append('description', values.description);
    formData.append('categoryID', values.categoryID.toString());
    formData.append('supplierID', values.supplierID.toString());
    formData.append('quantityAvailable', values.quantityAvailable.toString());
    formData.append('purchasePrice', values.purchasePrice.toString());
    formData.append('sellingPrice', values.sellingPrice.toString());

    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj as File);
    }

    try {
      await axios.post('http://localhost:4000/api/products/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Product added successfully!');
      form.resetFields();
      setFileList([]);
    } catch {
      message.error('Failed to add product');
    }
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
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
      <Form.Item name="productID" label="Product ID" rules={[{ required: true, message: 'Please enter product ID' }]}>
        <Input placeholder="Enter product ID" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
        <Input placeholder="Enter product name" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter product description' }]}>
        <Input.TextArea rows={4} placeholder="Enter product description" style={{ fontSize: '15px' }} />
      </Form.Item>

      <Form.Item name="categoryID" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
        <Select placeholder="Select category" style={{ height: '40px', fontSize: '16px' }}>
          {categories.map((category) => (
            <Select.Option key={category.categoryID} value={category.categoryID}>
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="supplierID" label="Supplier" rules={[{ required: true, message: 'Please select a supplier' }]}>
        <Select placeholder="Select supplier" style={{ height: '40px', fontSize: '16px' }}>
          {suppliers.map((supplier) => (
            <Select.Option key={supplier.supplierID} value={supplier.supplierID}>
              {supplier.supplierName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="quantityAvailable" label="Quantity Available" rules={[{ required: true, message: 'Please enter quantity available' }]}>
        <InputNumber min={1} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter quantity available" />
      </Form.Item>

      <Form.Item name="purchasePrice" label="Purchase Price" rules={[{ required: true, message: 'Please enter the purchase price' }]}>
        <InputNumber min={0} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter purchase price" />
      </Form.Item>

      <Form.Item name="sellingPrice" label="Selling Price" rules={[{ required: true, message: 'Please enter the selling price' }]}>
        <InputNumber min={0} style={{ width: '100%', height: '40px', fontSize: '16px' }} placeholder="Enter selling price" />
      </Form.Item>

      <Form.Item label="Product Image">
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleUploadChange}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProducts;
