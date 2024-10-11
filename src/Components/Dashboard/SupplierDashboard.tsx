import React, { useState } from "react";
import { Layout,Divider } from "antd";
import { UserOutlined} from '@ant-design/icons';
import SupplierSidebar from "./SupplierSidebar";
import Orders from "./Orders";
import OrderReports from "./OrderReports";
import FullfiedOrders from "./FullfiedOrders";


const { Header, Sider } = Layout;

const SupplierDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('Orders');
    

    const handleMenuSelect = (menuKey: string) => {
        setSelectedMenu(menuKey);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'orders':
                return <Orders />;
            case 'fullfied-orders ':
                return < FullfiedOrders  />;
            case 'reports':
                return < OrderReports/>;
            default:
                return <Orders />;
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
                    <SupplierSidebar onMenuSelect={handleMenuSelect} />
                </div>
            </Sider>

            {/* Adjust marginLeft to match Sider width */}
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
                    <h1 style={{ margin: 0 }}>Supplier Dashboard</h1>
                </Header>

                {/* Add padding to content to account for the fixed header */}
                <Layout style={{ marginTop: '22px', padding: '20px' }}>
                   
                        {renderContent()}
                  
                </Layout>
            </Layout>
        </Layout>
    );
};

export default SupplierDashboard;