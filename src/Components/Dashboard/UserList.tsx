import React, { useEffect, useState } from 'react';
import { Card, Button, Avatar, message,  Popconfirm  } from 'antd';
import axios from 'axios';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  dateAdded: string;
  image?: File; // Image as File
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch  {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Function to convert the file to a URL for preview
  const getImageUrl = (image: File | undefined) => {
    if (image) {
      return URL.createObjectURL(image); // Convert file to object URL for display
    }
    return '';
  };

  // Function to handle edit action
  const handleEdit = (userId: number) => {
    message.info(`Edit user with ID: ${userId}`);
    // Navigate to edit user page or show an edit modal
  };

  // Function to handle delete action
  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      message.success('User deleted successfully');
      // Refresh the user list after deletion
      setUsers(users.filter(user => user.id !== userId));
    } catch {
      message.error('Failed to delete user');
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
      {users.map((user) => (
        <Card
          key={user.id}
          style={{ width: 300 }}
          cover={
            user.image ? (
              <img alt={`${user.firstname} ${user.lastname}`} src={getImageUrl(user.image)} />
            ) : (
              <Avatar size={300} style={{ backgroundColor: '#87d068' }}>
                {user.firstname[0]}
                {user.lastname[0]}
              </Avatar>
            )
          }
          actions={[
            <Button key="edit" onClick={() => handleEdit(user.id)}>Edit</Button>,
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button key="delete">Delete</Button>
            </Popconfirm>,
            <Button key="view">View</Button>,
          ]}
        >
          <Card.Meta
            title={`${user.firstname} ${user.lastname}`}
            description={`Role: ${user.role} | Status: ${user.status}`}
          />
          <p>Email: {user.email}</p>
          <p>Date Added: {user.dateAdded}</p>
        </Card>
      ))}
    </div>
  );
};

export default UserList;