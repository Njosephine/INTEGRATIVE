import { Menu } from "antd";
import { DashboardOutlined, FileTextOutlined,CheckCircleOutlined} from '@ant-design/icons'

interface SupplierSidebarProps {
    onMenuSelect: (menuKey: string) => void; // Function type that takes a string
}

// Use the props interface in the Sidebar component
const Sidebar: React.FC<SupplierSidebarProps> = (props) => {
    // Function to handle menu item clicks
    const handleMenuClick = (menuKey: string) => { // Explicitly defining menuKey as a string
        props.onMenuSelect(menuKey); // Call the passed function to set the selected menu
    };


    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['orders']}
                style={{ fontSize: '15px', textTransform: 'uppercase'}}
            >
                 <Menu.Item key="orders"  icon={<DashboardOutlined />}   style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('orders')}>
                   Orders
                </Menu.Item>
               
                <Menu.Item key="fullfilled-orders" icon={<FileTextOutlined />} style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('fullfied-orders')}>
                   Fullfied Orders
                </Menu.Item>
                <Menu.Item key="reports"  icon={< CheckCircleOutlined />} style={{ marginBottom: '40px' }} onClick={() => handleMenuClick('reports')}>
                   Reports
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default Sidebar;

