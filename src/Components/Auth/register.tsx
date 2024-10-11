import React, {useState} from "react";
import { Form, Input, Button, Card, Typography, Divider } from "antd";
import "./custom.css"

interface RegisterProps{
    onRegister: (
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        email: string,
        role: string
    )=> void;
    toggleForm: () => void;

}

const { Title, Text } = Typography;

const Register: React.FC<RegisterProps> = ({onRegister, toggleForm}) => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setlastname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole]   = useState<string>("");

    
    function handleSubmit(){
      
        if(username && password && firstname && lastname && email && role) {

            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

            const userExists = existingUsers.some((user: { username: string }) => user.username === username);
            if (userExists) {
                alert("Username already exists. Please choose a different username.");
                return;
            }

         
            const userData = {
                username,
                password,
                firstname,
                lastname,
                email,
                role,
            };

            existingUsers.push(userData);
            localStorage.setItem("users", JSON.stringify(existingUsers));

          
            onRegister(username, password, firstname, lastname, email,role);
            alert("Registration successful! Please login.")
        }else{
            alert("Please fill all the fields");
        }
    };


    return(
        <div className="register-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginLeft: '15px' }}>
            <Card title={null} style={{ width: 400, fontWeight: "lighter" , textAlign: "center", borderRadius: '1px',borderWidth: '2px',borderColor: 'white', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'}}>

            <Title level={5} className="text-center" style ={{color: 'black', fontWeight: 'lighter',fontFamily: 'Arial', textTransform: 'uppercase'}}>Register</Title>

              {/* Custom Divider with custom styles */}
              <Divider style={{ borderColor: 'gray', borderStyle: 'solid', borderWidth: '1px', height: '1px' }} />
                
                <Form
                    name="register_form"
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input placeholder="Enter first name" onChange={(e) => setFirstname(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input placeholder="Enter last name" onChange={(e) => setlastname(e.target.value)} />
                    </Form.Item>
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                    >
                        <Input placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item 
                    label ="role"
                    name ="role"
                    rules ={[{required: true, message: 'Please input your role!'}]}
                    >
                    <Input placeholder="Enter role" onChange={(e) => setRole(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Text>
                            Already have an account? <Button type="link" onClick={toggleForm}>Login here</Button>
                        </Text>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
export default Register;