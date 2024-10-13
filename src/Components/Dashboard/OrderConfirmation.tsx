import React, { useEffect, useState } from 'react';
import { Modal, Button, message } from 'antd';
import axios from 'axios';

interface Order {
  orderID: number;
  quantityOrdered: number;
  supplierID: number;
  userID: number;
  productID: number;
  orderDate: string;
  status: string; 
}

interface OrderConfirmationProps {
  orderId: number; 
  onClose: () => void; 
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get<Order>(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(response.data);
      } catch {
        message.error('Failed to fetch order details');
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleConfirm = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: 'Confirmed' });
      message.success('Order confirmed successfully');
      onClose(); 
    } catch {
      message.error('Failed to confirm the order');
    }
  };

  if (!order) {
    return <div>Loading order details...</div>; 
  }

  return (
    <Modal
      title={`Confirm Order #${order.orderID}`}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          Confirm Order
        </Button>,
      ]}
    >
      <div>
        <h3>Order Details:</h3>
        <p>Order ID: {order.orderID}</p>
        <p>Quantity Ordered: {order.quantityOrdered}</p>
        <p>Product ID: {order.productID}</p>
        <p>Supplier ID: {order.supplierID}</p>
        <p>User ID: {order.userID}</p>
        <p>Order Date: {order.orderDate}</p>
        <p>Status: {order.status}</p>
      </div>
    </Modal>
  );
};

export default OrderConfirmation;
