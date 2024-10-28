import React, { useState, useEffect } from "react";
import { Layout, Divider, Avatar, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import SalesSideBar from "./SalesSideBar";
import ManageSales from "./ManageSales";
import ManageProducts from "./ManageProducts";
import AddOrder from "./AddOrder";
import AddSales from "./AddSales";
import SaleList from "./SaleList";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import OrderList from "./OrderList";

const { Header, Sider } = Layout;

const SalesDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState("ManageSales");
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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
            console.log("Upload Response:", info.file.response); 
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
            case "add-sale":
                return <AddSales />;
            case "list-sales":
                return <SaleList />;
            case "add-product":
                return <AddProduct />;
            case "list-products":
                return <ProductList />;
            case "create-orders":
                return <AddOrder />;
            case "view-orders":
                return <OrderList />;
            case "manage-sales":
                return <ManageSales />;
            case "manage-products":
                return <ManageProducts />;
            default:
                return <ManageSales />;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
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
                        action="http://localhost:4000/api/upload/upload" 
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
                    <SalesSideBar onMenuSelect={handleMenuSelect} />
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
                    <h1 style={{ margin: 0 }}>SalesPerson Dashboard</h1>
                </Header>

                <Layout style={{ marginTop: "22px", padding: "20px" }}>
                    {renderContent()}
                </Layout>
            </Layout>
        </Layout>
    );
};

export default SalesDashboard;
