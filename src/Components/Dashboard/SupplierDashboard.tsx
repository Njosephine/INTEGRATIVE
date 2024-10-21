import React, { useState, useEffect } from "react";
import { Layout, Divider, Avatar, message, Upload } from "antd";
import { UserOutlined } from '@ant-design/icons';
import SupplierSidebar from "./SupplierSidebar";
import Orders from "./Orders";
import FulfilledOrders from "./FulfilledOrders"; 
import type { UploadChangeParam } from "antd/es/upload";

const { Header, Sider } = Layout;

const SupplierDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('Orders');
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    // Load the image URL from localStorage when the component mounts
    useEffect(() => {
        const savedImageUrl = localStorage.getItem("profileImageUrl");
        if (savedImageUrl) {
            setImageUrl(savedImageUrl); // Set the image URL from localStorage
        }
    }, []);
    
    const handleMenuSelect = (menuKey: string) => {
        setSelectedMenu(menuKey);
    };

    // Handle image upload
    const handleUpload = (info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            message.loading({ content: "Uploading...", key: "upload" });
            return;
        }
        if (info.file.status === "done") {
            // Extract the correct image URL from the response
            const uploadedImageUrl = info.file.response.image.imageUrl;
            
            // Update state with the new image URL
            setImageUrl(uploadedImageUrl);
    
            // Save the uploaded image URL to localStorage
            localStorage.setItem("profileImageUrl", uploadedImageUrl);
    
            message.success({ content: "Image uploaded successfully!", key: "upload" });
        } else if (info.file.status === "error") {
            message.error({ content: "Image upload failed!", key: "upload" });
        }
    };
    

    const renderContent = () => {
        switch (selectedMenu) {
            case 'confirmed-orders':
                return <Orders />;
            case 'fulfilled-orders':
                return <FulfilledOrders />;
            default:
                return <Orders />;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
           <Sider
                width={250}
                style={{
                    background: "#fff",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: 2,
                }}
            >
                <div style={{ paddingTop: "30px", textAlign: "center" }}>
                    {/* Upload Button for Profile Image wrapped around Avatar */}
                    <Upload
                        name="profile-image"
                        showUploadList={false}
                        action="http://localhost:4000/api/upload/upload" // API endpoint for uploading the image
                        onChange={handleUpload}
                        accept=".jpg,.png"
                    >
                        <Avatar 
                            src={imageUrl ? imageUrl : undefined} 
                            size={80} 
                            icon={<UserOutlined />} 
                            style={{ cursor: "pointer" }} 
                        />
                    </Upload>

                    <Divider style={{ backgroundColor: "black", marginTop: '20px' }} />
                    <SupplierSidebar onMenuSelect={handleMenuSelect} />
                </div>
            </Sider>
            <Layout style={{ marginLeft: 240 }}>
                <Header
                    style={{
                        width: "calc(100% - 260px)",
                        color: "white",
                        backgroundColor: "#001529",
                        textAlign: "center",
                        lineHeight: "70px",
                        position: "fixed",
                        zIndex: 1,
                        top: 0,
                    }}
                >
                    <h1 style={{ margin: 0 }}>Supplier Dashboard</h1>
                </Header>

                <Layout style={{ marginTop: "22px", padding: "20px"}}>
                    {renderContent()}
                </Layout>
            </Layout>
        </Layout>
    );
};

export default SupplierDashboard;
