import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, message } from 'antd';
import axios from 'axios';

const Sales: React.FC = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Fetch sales and order data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const saleResponse = await axios.get('http://localhost:4000/api/sale/total');
        const ordersResponse = await axios.get('http://localhost:4000/api/order/total');
        const productsResponse = await axios.get('http://localhost:4000/api/products/total');

        // Log responses for debugging
        console.log('Sales:', saleResponse.data);
        console.log('Orders:', ordersResponse.data);
        console.log('Products:', productsResponse.data);

        setTotalSales(saleResponse.data.total); 
        setTotalOrders(ordersResponse.data.total); 
        setTotalProducts(productsResponse.data.total); 
      } catch(error) {
        console.error('Error fetching sales data:', error);
        message.error('Failed to fetch sales data');
      }
    };

    fetchSalesData();
  }, []);

  // Inline styles for the cards and layout
  const cardStyle: React.CSSProperties = {
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    textAlign: 'center',
  };

  const dashboardStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  };

  const statisticTextStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
  };

  const totalsalesCardStyle = { ...cardStyle, backgroundColor: '#fff3e0' };
  const totalOrdersCardStyle = { ...cardStyle, backgroundColor: '#fce4ec' };
  const totalProductsCardStyle = { ...cardStyle, backgroundColor: '#f3e5f5' };

  return (
    <div style={dashboardStyle}>
      <h2>Sales Dashboard</h2>
      <Row gutter={[16, 16]}>
        {/* Card for Total Sales */}
        <Col span={6}>
          <Card style={totalsalesCardStyle} hoverable>
            <Statistic
              title="Total Sales"
              value={totalSales}
             
              
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>

        {/* Card for Total Orders */}
        <Col span={6}>
          <Card style={totalOrdersCardStyle} hoverable>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>

        {/* Card for Total Products */}
        <Col span={6}>
          <Card style={totalProductsCardStyle} hoverable>
            <Statistic
              title="Total Products"
              value={totalProducts}
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Sales;
