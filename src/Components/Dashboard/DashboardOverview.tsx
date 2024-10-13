import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, message } from 'antd';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface SalesData {
  date: string;
  sales: number;
}

const Dashboard: React.FC = () => {
  const [dailySales, setDailySales] = useState<number>(0);
  const [weeklySales, setWeeklySales] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const [dailySalesData, setDailySalesData] = useState<SalesData[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<SalesData[]>([]);

  // Fetch sales and order data
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const dailyResponse = await axios.get('http://localhost:5000/api/sales/daily');
        const weeklyResponse = await axios.get('http://localhost:5000/api/sales/weekly');
        const monthlyResponse = await axios.get('http://localhost:5000/api/sales/monthly');
        const ordersResponse = await axios.get('http://localhost:5000/api/orders/total');
        const productsResponse = await axios.get('http://localhost:5000/api/products/total');
        const usersResponse = await axios.get('http://localhost:5000/api/users/total');
        
        // Fetch data for charts
        const dailySalesDataResponse = await axios.get('http://localhost:5000/api/sales/daily/last-week');
        const monthlySalesDataResponse = await axios.get('http://localhost:5000/api/sales/monthly/last-year');

        setDailySales(dailyResponse.data.dailySales);
        setWeeklySales(weeklyResponse.data.weeklySales);
        setMonthlySales(monthlyResponse.data.monthlySales);
        setTotalOrders(ordersResponse.data.totalOrders);
        setTotalProducts(productsResponse.data.totalProducts);
        setTotalUsers(usersResponse.data.totalUsers);

        // Set the data for the graphs
        setDailySalesData(dailySalesDataResponse.data);
        setMonthlySalesData(monthlySalesDataResponse.data);

      } catch {
        message.error('Failed to fetch sales data');
      }
    };

    fetchAnalysisData();
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
  const totalUsersCardStyle = { ...cardStyle, backgroundColor: '#f3e5f5' };

  return (
    <div style={dashboardStyle}>
      <h2>Analysis</h2>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card style={dailyCardStyle} hoverable>
            <Statistic
              title="Daily Sales"
              value={dailySales}
              precision={2}
              prefix="UGX"
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={weeklyCardStyle} hoverable>
            <Statistic
              title="Weekly Sales"
              value={weeklySales}
              precision={2}
              prefix="UGX"
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={monthlyCardStyle} hoverable>
            <Statistic
              title="Monthly Sales"
              value={monthlySales}
              precision={2}
              prefix="UGX"
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={totalOrdersCardStyle} hoverable>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={totalProductsCardStyle} hoverable>
            <Statistic
              title="Total Products"
              value={totalProducts}
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={totalUsersCardStyle} hoverable>
            <Statistic
              title="Total Users"
              value={totalUsers}
              valueStyle={statisticTextStyle}
            />
          </Card>
        </Col>
      </Row>

      {/* Graph Section */}
      <h3>Sales Over Time</h3>
      <Row gutter={[16, 16]}>
        {/* Daily Sales Chart */}
        <Col span={12}>
          <Card hoverable>
            <h4>Daily Sales (Last 7 Days)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Monthly Sales Chart */}
        <Col span={12}>
          <Card hoverable>
            <h4>Monthly Sales (Last 12 Months)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
