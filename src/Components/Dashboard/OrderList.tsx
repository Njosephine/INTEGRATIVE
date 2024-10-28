import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, Input, Select, InputNumber } from 'antd';
import axios from 'axios';

interface Order {
  orderID: number;
  quantityOrdered: number;
  orderDate: string;
  supplierID: string;
  productID: string;
}

interface Supplier {
  supplierID: string;
  supplierName: string; 
}

interface Product {
  productID: string;
  productName: string; 
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch orders data from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:4000/api/order/orders');
      console.log('Fetched Orders:', response.data); // Log fetched orders
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Failed to fetch orders');
    }
  };

  // Fetch suppliers data from the API
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get<{ success: boolean; suppliers: Supplier[] }>('http://localhost:4000/api/supplier/suppliers');
      console.log('Fetched Suppliers:', response.data); 
      if (response.data.success) {
        setSuppliers(response.data.suppliers); 
      } else {
        message.error('Failed to fetch suppliers');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      message.error('Failed to fetch suppliers');
    }
  };

  // Fetch products data from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ success: boolean; products: Product[] }>('http://localhost:4000/api/products/products');
      console.log('Fetched Products:', response.data); 
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

  // Fetch orders, suppliers, and products data on component mount
  useEffect(() => {
    fetchOrders();
    fetchSuppliers();
    fetchProducts();
  }, []);

  // Log the fetched data
useEffect(() => {
  console.log('Orders:', orders);
  console.log('Suppliers:', suppliers);
  console.log('Products:', products);
}, [orders, suppliers, products]);

  // Handle deleting an order
  const handleDelete = async (orderID: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${orderID}`);
      message.success('Order deleted successfully');
      setOrders(orders.filter((order) => order.orderID !== orderID));
    } catch (error) {
      console.error('Error deleting order:', error);
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
        await axios.put(`http://localhost:4000/api/orders/${editingOrder.orderID}`, values);
        message.success('Order updated successfully!');
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.orderID === editingOrder.orderID ? { ...editingOrder, ...values } : order))
        );
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        console.error('Error updating order:', error);
        message.error('Failed to update order');
      }
    }
  };

  const columns = [

    {
      title: 'No.',
      key: 'index', // Key for the index column
      render: (_: any, __: Order, index: number) => index + 1, 
    },
    {
      title: 'Quantity Ordered',
      dataIndex: 'quantityOrdered',
      key: 'quantityOrdered',
    },
    {
      title: 'Supplier',
      key: 'supplier',
      render: (_: unknown, record: Order) => {
          const supplierID = String(record.supplierID);
          console.log('Looking for Supplier ID:', supplierID);

          const supplier = suppliers.find(s => s.supplierID === supplierID);
          console.log('Supplier:', supplier, 'for Order:', record); // Log for debugging

          return supplier ? supplier.supplierName : 'Unknown Supplier';
      },
    },
    {
      title: 'Product',
      key: 'product',
      render: (_: unknown, record: Order) => {
        const product = products.find(p => p.productID === String(record.productID));
        console.log('Product:', product, 'for Order:', record); // Log for debugging
        return product ? product.productName : 'Unknown Product';
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Order) => (
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
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={editingOrder || {}}
        >
          {/* Order Date */}
          <Form.Item name="orderDate" label="Order Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>

          {/* Product */}
          <Form.Item name="productID" label="Product" rules={[{ required: true }]}>
            <Select>
              {products.map(product => (
                <Select.Option key={product.productID} value={product.productID}>
                  {product.productName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Supplier */}
          <Form.Item name="supplierID" label="Supplier" rules={[{ required: true }]}>
            <Select>
              {suppliers.map(supplier => (
                <Select.Option key={supplier.supplierID} value={supplier.supplierID}>
                  {supplier.supplierName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Quantity Ordered */}
          <Form.Item name="quantityOrdered" label="Quantity Ordered" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderList;
