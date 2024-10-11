import React, { useState } from "react";
// import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onlogin: (username: string, password: string) => void;
    toggleForm: () => void;
}

const { Title, Text } = Typography;

const Login: React.FC<LoginProps> = ({ onlogin, toggleForm }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    // Event handler
    const handleSubmit = () => {
        // Retrieve user data from localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if the username and password match the registered user
        const loggedInUser = existingUsers.find((user:{ username: string }) => user.username === username);
        if (loggedInUser) {
         
            localStorage.setItem('role', loggedInUser.role); 

            // Navigate based on the user role
            navigate("/dashboard");

            onlogin(username, password);
            alert("Login successful!");
        } else {
            alert("Invalid username or password. Please register first.");
        }
    };

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: '15px' }}>
            <Card title={null} style={{ width: 400, fontWeight: "lighter", textAlign: "center", borderRadius: '1px', borderWidth: '2px', borderColor: 'white', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', color: 'blue' }}>
                <Title level={5} className="text-center" style={{ color: 'black', fontWeight: 'lighter', fontFamily: 'Arial', textTransform: "uppercase" }}>Login</Title>
                
                {/* Custom Divider with custom styles */}
                <Divider style={{ borderColor: 'gray', borderStyle: 'solid', borderWidth: '1px' }} />
                
                <Form
                    name="login_form"
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Text>
                            Don't have an account? <Button type="link" onClick={toggleForm}>Register here</Button>
                        </Text>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
