import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

interface Product {
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // Fetch product data from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch {
      message.error('Failed to fetch products');
    }
  };

  // Fetch products data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Edit action
  const handleEdit = (record: Product) => {
    setIsEditing(true);
    setEditingProduct(record);
    form.setFieldsValue({
      productName: record.productName,
      description: record.description,
      quantityAvailable: record.quantityAvailable,
      purchasePrice: record.purchasePrice,
      sellingPrice: record.sellingPrice,
    });
  };

  // Handle Update action after editing
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct?.productID}`, form.getFieldsValue());
      message.success('Product updated successfully');
      fetchProducts(); // Refresh product list
      setIsEditing(false);
      setEditingProduct(null);
    } catch {
      message.error('Failed to update product');
    }
  };

  // Handle Delete action
  const handleDelete = async (productID: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productID}`);
      message.success('Product deleted successfully');
      fetchProducts(); // Refresh product list
    } catch {
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
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
      title: 'Category ID',
      dataIndex: 'categoryID',
      key: 'categoryID',
    },
    {
      title: 'Quantity Available',
      dataIndex: 'quantityAvailable',
      key: 'quantityAvailable',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Product) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.productID)}
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
        dataSource={products} 
        columns={columns} 
        rowKey="productID" 
        pagination={{ pageSize: 5 }} 
        style={{ marginTop: '50px' }} 
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Product"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setEditingProduct(null);
        }}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Product Name" name="productName">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Quantity Available" name="quantityAvailable">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Purchase Price" name="purchasePrice">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Selling Price" name="sellingPrice">
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductList;
