import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UploadFile } from 'antd/es/upload/interface';

interface Users {
  first_name: string;
  last_name: string;
  emailAddress: string;
  password: string;
  userName: string;
  role: string; 
  status: string;
  image?: File;
}

const AddUser: React.FC = () => {
  const [form] = Form.useForm<Users>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Function to handle form submission
  const onFinish = async (values: Users) => {
  const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('emailAddress', values.emailAddress);
    formData.append('userName', values.userName);
    formData.append('password', values.password);
    formData.append('role', values.role);
    formData.append('status', values.status);

    
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj as File);
    }

    try {
      
      await axios.post('http://localhost:4000/api/user/add-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success message and form reset
      message.success('User added successfully!');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error('Failed to add user');
    }
  };

  // Function to handle image upload changes
  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
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
     

      {/* First Name */}
      <Form.Item 
        name="first_name" 
        label="First Name" 
        rules={[{ required: true, message: 'Please enter first name' }]}
      >
        <Input placeholder="Enter first name" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Last Name */}
      <Form.Item 
        name="last_name" 
        label="Last Name" 
        rules={[{ required: true, message: 'Please enter last name' }]}
      >
        <Input placeholder="Enter last name" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Email */}
      <Form.Item 
        name="emailAddress" 
        label="Email" 
        rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input placeholder="Enter email" style={{ height: '40px', fontSize: '15px' }} />
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
        <Input.Password placeholder="Enter password" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Username */}
      <Form.Item 
        name="userName" 
        label="Username" 
        rules={[{ required: true, message: 'Please enter a username' }]}
      >
        <Input placeholder="Enter username" style={{ height: '40px', fontSize: '15px' }} />
      </Form.Item>

      {/* Role */}
      <Form.Item
        name="role"
        label="User Role"
        rules={[{ required: true, message: 'Please select a user role' }]}
      >
        <Select placeholder="Select user role" style={{ height: '40px', fontSize: '16px' }}>
          <Select.Option value="Supplier">Supplier</Select.Option>
          <Select.Option value="Salesperson">Salesperson</Select.Option>
        </Select>
      </Form.Item>

      {/* Status */}
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status' }]}
      >
        <Select placeholder="Select status">
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>

      {/* Image Upload */}
      <Form.Item label="Profile Image" valuePropName="fileList">
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={() => false} // Prevent immediate upload
          onChange={handleUploadChange}
          maxCount={1} // Allow only one image
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', fontSize: '16px' }}>
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
