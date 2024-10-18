import React, { useEffect, useState } from 'react';
import { Card, Button, Avatar, message, Popconfirm, Typography, Modal } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const { Text } = Typography;

interface User {
  userID: number; // Ensure userID is required
  first_name: string;
  last_name: string;
  emailAddress: string;
  role: string;
  status: string;
  dateAdded: string;
  imageUrl?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:4000/api/user/users');
        setUsers(response.data);
      } catch (error) {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser({ ...user }); // Ensure user object is spread correctly
    setIsModalVisible(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      message.success('User deleted successfully');
      setUsers(users.filter(user => user.userID !== userId));
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto', padding: '20px', gap: '16px' }}>
        {users.map(user => (
          <Card
            key={user.userID}
            style={{
              width: '300px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
              transition: 'transform 0.3s',
              backgroundColor: '#f0f2f5',
              color: '#333',
            }}
            cover={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '8px 8px 0 0',
              }}>
                {user.imageUrl ? (
                  <img
                    alt={`${user.first_name} ${user.last_name}`}
                    src={user.imageUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Avatar size={140} style={{ backgroundColor: '#fff', fontSize: '48px' }}>
                    {user.first_name ? user.first_name[0] : '?'}
                    {user.last_name ? user.last_name[0] : '?'}
                  </Avatar>
                )}
              </div>
            }
            actions={[
              <Button
                key={`edit-${user.userID}`}
                onClick={() => handleEdit(user)}
                style={{
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  border: 'none',
                  transition: 'background-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#40a9ff')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1890ff')}
              >
                Edit
              </Button>,
              <Popconfirm
                key={`delete-${user.userID}`}
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDelete(user.userID)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  key={`delete-btn-${user.userID}`}
                  danger
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    transition: 'background-color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff7875')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4f')}
                >
                  Delete
                </Button>
              </Popconfirm>,
            ]}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Meta
              title={<Text strong style={{ fontSize: '18px', marginBottom: '8px' }}>{`${user.first_name} ${user.last_name}`}</Text>}
              description={
                <>
                  <Text type="secondary">Role: {user.role}</Text>
                  <br />
                  <Text type="secondary">Status: {user.status}</Text>
                </>
              }
            />
            <div>
              <p>Email: {user.emailAddress}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit User Modal */}
      <Modal
  title="Edit User"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      if (editingUser) {
        const { userID, first_name, last_name, emailAddress } = editingUser;
        // Ensure you include userID when sending the update
        try {
          await axios.put(`http://localhost:5000/api/users/${userID}`, { first_name, last_name, emailAddress });
          message.success('User updated successfully');
          setIsModalVisible(false);
          // Update the users list after editing
          const updatedUsers = users.map(user => 
            user.userID === userID ? { ...user, first_name, last_name, emailAddress } : user
          );
          setUsers(updatedUsers);
        } catch (error) {
          message.error('Failed to update user');
        }
      }
    }}
    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} // Flexbox for layout
  >
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>First Name</label>
      <input
        type="text"
        value={editingUser?.first_name || ''} // Use fallback value for controlled input
        onChange={(e) => setEditingUser(prev => ({ ...prev!, first_name: e.target.value }))}
        required
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d9d9d9',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>Last Name</label>
      <input
        type="text"
        value={editingUser?.last_name || ''}
        onChange={(e) => setEditingUser(prev => ({ ...prev!, last_name: e.target.value }))}
        required
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d9d9d9',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
      <input
        type="email"
        value={editingUser?.emailAddress || ''}
        onChange={(e) => setEditingUser(prev => ({ ...prev!, emailAddress: e.target.value }))}
        required
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d9d9d9',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
      />
    </div>
    {/* Add more fields as needed */}
    <Button type="primary" htmlType="submit" style={{ alignSelf: 'flex-end' }}>Update</Button>
  </form>
</Modal>

    </>
  );
};

export default UserList;
