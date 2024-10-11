import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, message } from 'antd';
import axios from 'axios';

const Sales: React.FC = () => {
  const [dailySales, setDailySales] = useState<number>(0);
  const [weeklySales, setWeeklySales] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Fetch sales and order data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Replace these API calls with your actual API endpoints
        const dailyResponse = await axios.get('http://localhost:5000/api/sales/daily');
        const weeklyResponse = await axios.get('http://localhost:5000/api/sales/weekly');
        const monthlyResponse = await axios.get('http://localhost:5000/api/sales/monthly');
        const ordersResponse = await axios.get('http://localhost:5000/api/orders/total');
        const productsResponse = await axios.get('http://localhost:5000/api/products/total');

        setDailySales(dailyResponse.data.dailySales);
        setWeeklySales(weeklyResponse.data.weeklySales);
        setMonthlySales(monthlyResponse.data.monthlySales);
        setTotalOrders(ordersResponse.data.totalOrders);
        setTotalProducts(productsResponse.data.totalProducts);
      } catch {
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
    textAlign: 'center'
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

  const dailyCardStyle = { ...cardStyle, backgroundColor: '#e8f5e9' }; 
  const weeklyCardStyle = { ...cardStyle, backgroundColor: '#e3f2fd' }; 
  const monthlyCardStyle = { ...cardStyle, backgroundColor: '#fff3e0' }; 
  const totalOrdersCardStyle = { ...cardStyle, backgroundColor: '#fce4ec' }; 
  const totalProductsCardStyle = { ...cardStyle, backgroundColor: '#f3e5f5' }; 


  return (
    <div style={dashboardStyle}>
      <h2>Sales Dashboard</h2>
      <Row gutter={[16, 16]}>
        {/* Card for Daily Sales */}
        <Col span={6}>
          <Card style={dailyCardStyle} hoverable>
            <Statistic
              title="Daily Sales"
              value={dailySales}
              precision={2}
              prefix="$"
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>

        {/* Card for Weekly Sales */}
        <Col span={6}>
          <Card style={weeklyCardStyle} hoverable>
            <Statistic
              title="Weekly Sales"
              value={weeklySales}
              precision={2}
              prefix="$"
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>

        {/* Card for Monthly Sales */}
        <Col span={6}>
          <Card style={monthlyCardStyle} hoverable>
            <Statistic
              title="Monthly Sales"
              value={monthlySales}
              precision={2}
              prefix="$"
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

        {/* Card for Total Products/Stocks */}
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