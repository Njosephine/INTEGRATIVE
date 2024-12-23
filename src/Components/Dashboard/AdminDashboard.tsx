import React, { useState, useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';
import AdminSidebar from "./AdminSidebar"; // Ensure the component name is correct
import { Layout, Divider, Avatar, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import AddUser from "./AddUser";
import UserList from "./UserList";
import ViewReports from "./ViewReports";
import ConfirmOrders from "./ConfirmOrders";
import DashboardOverview from "./DashboardOverview";

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('DashboardOverview');
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined); 

     // Load image URL from localStorage when the component mounts
     useEffect(() => {
        const savedImageUrl = localStorage.getItem("profileImageUrl");
        if (savedImageUrl) {
            setImageUrl(savedImageUrl);
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
            console.log("Upload Response:", info.file.response); // Log the complete response
    
            // Accessing the imageUrl from the response structure
            const uploadedImageUrl = info.file.response?.image?.imageUrl; 
    
            if (uploadedImageUrl) {
                setImageUrl(uploadedImageUrl);
    
                // Save the image URL to localStorage so it persists across refreshes
                localStorage.setItem("profileImageUrl", uploadedImageUrl);
    
                message.success({ content: "Image uploaded successfully!", key: "upload" });
            } else {
                message.error({ content: "No URL in response!", key: "upload" });
            }
        } else if (info.file.status === "error") {
            message.error({ content: "Image upload failed!", key: "upload" });
        }
    };
    

    const renderContent = () => {
        switch (selectedMenu) {
            case 'DashboardOverview':
                return <DashboardOverview />;
            case 'add-user':
                return <AddUser />;
            case 'list-users':
                return <UserList />;
            case 'view-reports':
                return <ViewReports />;
            case 'confirm-orders':
                return <ConfirmOrders />;
            default:
                return <DashboardOverview />;
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
                        action="http://localhost:4000/apiuser/add-user" 
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
                    <AdminSidebar onMenuSelect={handleMenuSelect} />
                </div>
            </Sider>

            {/* Main Layout */}
            <Layout style={{ marginLeft: 250 }}>
                {/* Header */}
                <Header
                    style={{
                        width: 'calc(100% - 250px)',
                        color: 'white',
                        backgroundColor: '#001529',
                        textAlign: 'center',
                        lineHeight: '70px',
                        position: 'fixed',
                        zIndex: 1,
                        top: 0,
                    }}
                >
                    <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                </Header>

                {/* Content Section */}
                <Content style={{ marginTop: '80px', padding: '20px' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
