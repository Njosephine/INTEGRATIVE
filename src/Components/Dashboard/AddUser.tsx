import React, {useState} from 'react';
import { Form, Input, Button, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UploadFile } from 'antd/es/upload/interface';
interface UserFormValues {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role: string; 
  image?: File; 
   status: string;
  }

const AddUser: React.FC = () => {
  const [form] = Form.useForm<UserFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]); 
  
  // Function to handle form submission
  const onFinish = async (values: UserFormValues) => {
  const formData = new FormData();
    
    formData.append('userID', values.userID);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('role', values.role);
    formData.append('status', values.status);
    
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj as File); // Attach the image to the form data
    }
    
    try {
      await axios.post('http://localhost:5000/api/users', values); 
      message.success('User added successfully!');
      form.resetFields(); // Reset form after submission
    } catch  {
      message.error('Failed to add user');
    }
  };

  // Function to handle image upload change
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
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleUploadChange}
          maxCount={1} // Allow only 1 image
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
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
