import React, { useState } from "react";
import { notification } from "antd";
import Login from "../Components/Auth/login";
import Register from "../Components/Auth/register";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (username: string, password: string) => {
        // Check for stored user data
        const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

        if (storedUserData.username === username && storedUserData.password === password) {
            // Show a notification for successful login
            notification.success({
                message: 'Login Successful',
                description: `Welcome back, ${username}!`,
            });
        } else {
            // Show an error notification for failed login
            notification.error({
                message: 'Login Failed',
                description: 'Invalid username or password.',
            });
        }
        
    };

    const handleRegister = (firstname: string, lastname: string, username: string, password: string, email: string) => {
        // Check if the username already exists
        const existingUser = JSON.parse(localStorage.getItem("userData") || "{}");

        if (existingUser.username === username) {
            // Show an error notification if the username already exists
            notification.error({
                message: 'Registration Failed',
                description: 'Username already exists. Please choose a different username.',
            });
        } else {
            // Store user data in localStorage
            localStorage.setItem("userData", JSON.stringify({ firstname, lastname, username, password, email }));

            // Show a notification for successful registration
            notification.success({
                message: 'Registration Successful',
                description: `Account created for ${username}. You can now log in!`,
            });
            toggleForm(); // Automatically switch to login form after successful registration
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div>
                {isLogin ? (
                    <Login onlogin={handleLogin} toggleForm={toggleForm} />
                ) : (
                    <Register onRegister={handleRegister} toggleForm={toggleForm} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
