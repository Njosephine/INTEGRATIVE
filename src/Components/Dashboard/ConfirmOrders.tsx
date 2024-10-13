import React, { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import OrderConfirmation from './OrderConfirmation'; 
import axios from 'axios';

// Define the Order interface
interface Order {
  orderID: number;
  quantityOrdered: number;
  supplierID: number;
  userID: number;
  productID: number;
  orderDate: string;
  status: string; 
}

const ConfirmOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); 

  // Fetch orders from the API when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:5000/api/orders');
        setOrders(response.data); 
      } catch  {
        message.error('Failed to fetch orders');
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []);

  const showConfirmationModal = (orderId: number) => {
    setSelectedOrderId(orderId); 
    setIsModalVisible(true); 
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); 
    setSelectedOrderId(null); 
  };

  if (loading) {
    return <Spin size="large" tip="Loading orders..." />;
  }

  return (
    <div>
      {/* Dynamically render buttons for each order */}
      {orders.map(order => (
        <Button key={order.orderID} onClick={() => showConfirmationModal(order.orderID)}>
          Confirm Order #{order.orderID} - Product ID: {order.productID}
        </Button>
      ))}

      {/* Render the OrderConfirmation modal if conditions are met */}
      {isModalVisible && selectedOrderId !== null && (
        <OrderConfirmation 
          orderId={selectedOrderId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ConfirmOrders;
