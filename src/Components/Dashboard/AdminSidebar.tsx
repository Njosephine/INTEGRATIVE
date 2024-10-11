
import { Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

interface SidebarProps {
    onMenuSelect: (menuKey: string) => void; // Function type that takes a string
}

// Use the props interface in the Sidebar component
const Sidebar: React.FC<SidebarProps> = (props) => {
    // Function to handle menu item clicks
    const handleMenuClick = (menuKey: string) => { // Explicitly defining menuKey as a string
        props.onMenuSelect(menuKey); // Call the passed function to set the selected menu
    };


    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{ fontSize: '15px', textTransform: 'uppercase',}}
            >
                 <Menu.Item key="Dashboard"  icon={<DashboardOutlined />}   style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('dashboard')}>
                   Dashboard
                </Menu.Item>
                <Menu.Item key="manage-users" icon={<UserOutlined />} style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('manage-users')}>
                    Manage Users
                </Menu.Item>
                <Menu.Item key="view-reports" icon={<FileTextOutlined />} style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('view-reports')}>
                    View Reports
                </Menu.Item>
                <Menu.Item key="confirm-orders"  icon={< CheckCircleOutlined />} style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('confirm-orders')}>
                    Confirm Orders
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default Sidebar;
