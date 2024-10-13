import React, { useState } from "react";
import { Layout, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';
import AdminSidebar from "./AdminSidebar";
import AddUser from "./AddUser";
import ViewReports from "./ViewReports";
import ConfirmOrders from "./ConfirmOrders";
import DashboardOverview from "./DashboardOverview";

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('DashboardOverview');

    const handleMenuSelect = (menuKey: string) => {
        setSelectedMenu(menuKey);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'Dashboard':
                return <DashboardOverview />;
            case 'add-user':
                return <AddUser/>;
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
            {/* Sidebar */}
            <Sider
                width={250}
                style={{
                    background: '#fff',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 2,
                }}
            >
                <div style={{ paddingTop: '80px', textAlign: 'center' }}>
                    <UserOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
                    <Divider style={{ backgroundColor: 'black' }} />
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
