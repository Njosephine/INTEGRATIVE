// src/components/TotalUsersCard.tsx
import React, { useEffect, useState } from 'react';
import { Card, Statistic, message } from 'antd';
import axios from 'axios';

const TotalUsersCard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/total');
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error('Error fetching total users:', error);
        message.error('Failed to fetch total users');
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <Card
      hoverable
      style={{
        backgroundColor: '#f3e5f5',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}
    >
      <Statistic title="Total Users" value={totalUsers} />
    </Card>
  );
};

export default TotalUsersCard;
