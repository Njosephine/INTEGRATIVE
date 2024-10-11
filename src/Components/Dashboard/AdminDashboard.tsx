import React, { useState } from "react";
import { Layout,Divider } from "antd";
import { UserOutlined} from '@ant-design/icons';
import AdminSidebar from "./AdminSidebar";
import ManageUsers from "./ManageUsers";
import ViewReports from "./ViewReports";
import ConfirmOrders from "./ConfirmOrders";
import DashboardOverview from "./DashboardOverview";

const { Header, Sider } = Layout;

const AdminDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('DashboardOverview');
    

    const handleMenuSelect = (menuKey: string) => {
        setSelectedMenu(menuKey);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'manage-users':
                return <ManageUsers />;
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

            <Layout style={{ marginLeft: 240 }}>
                <Header
                   style={{
                    width: 'calc(100% - 260px)', 
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

                
                { <Layout style={{ marginTop: '22px', padding: '20px' }}>
                  
                        {renderContent()}
                   
                  </Layout> } 
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
