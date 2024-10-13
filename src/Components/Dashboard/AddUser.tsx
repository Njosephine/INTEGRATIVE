import React  from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

interface UserFormValues {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role: string; // Role can be either 'Supplier' or 'Salesperson'
}

const AddUser: React.FC = () => {
  const [form] = Form.useForm<UserFormValues>();
  
  // Function to handle form submission
  const onFinish = async (values: UserFormValues) => {
    console.log('Received values:', values);
    
    try {
      await axios.post('http://localhost:5000/api/users', values); 
      message.success('User added successfully!');
      form.resetFields(); // Reset form after submission
    } catch  {
      message.error('Failed to add user');
    }
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={onFinish} 
      style={{ 
        maxWidth: '500px', 
        margin: '100px auto',
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {/* User ID */}
      <Form.Item 
        name="userID" 
        label="User ID" 
        rules={[{ required: true, message: 'Please enter user ID' }]}
      >
        <Input 
          placeholder="Enter user ID" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>

      {/* First Name */}
      <Form.Item 
        name="firstName" 
        label="First Name" 
        rules={[{ required: true, message: 'Please enter first name' }]}
      >
        <Input 
          placeholder="Enter first name" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>

      {/* Last Name */}
      <Form.Item 
        name="lastName" 
        label="Last Name" 
        rules={[{ required: true, message: 'Please enter last name' }]}
      >
        <Input 
          placeholder="Enter last name" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>

      {/* Email */}
      <Form.Item 
        name="email" 
        label="Email" 
        rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input 
          placeholder="Enter email" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>

       {/* Password */}
       <Form.Item 
        name="password" 
        label="Password" 
        rules={[
          { required: true, message: 'Please enter a password' }, 
          { min: 6, message: 'Password must be at least 6 characters' }
        ]}
      >
        <Input.Password 
          placeholder="Enter password" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>


      {/* Username */}
      <Form.Item 
        name="username" 
        label="Username" 
        rules={[{ required: true, message: 'Please enter a username' }]}
      >
        <Input 
          placeholder="Enter username" 
          style={{ height: '40px', fontSize: '15px' }} 
        />
      </Form.Item>

      {/* User Role */}
      <Form.Item
        name="role"
        label="User Role"
        rules={[{ required: true, message: 'Please select a user role' }]}
      >
        <Select 
          placeholder="Select user role" 
          style={{ height: '40px', fontSize: '16px' }} 
        >
          <Select.Option value="Supplier">Supplier</Select.Option>
          <Select.Option value="Salesperson">Salesperson</Select.Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ width: '100%', height: '40px', fontSize: '16px' }}
        >
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
