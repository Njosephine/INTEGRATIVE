
import { Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    PlusOutlined,
    UnorderedListOutlined 
} from '@ant-design/icons';

const { SubMenu } = Menu;

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
               {/* Sub-menu for managing Users */}
               <SubMenu key="manage-users" icon={< UserOutlined />} title="Manage Users" style={{ marginBottom: '40px' }}>
                    <Menu.Item key="add-user" icon={<PlusOutlined />} onClick={() => handleMenuClick('add-user')}>
                        Add Users
                    </Menu.Item>
                    <Menu.Item key="list-users" icon={<UnorderedListOutlined />} onClick={() => handleMenuClick('list-users')}>
                        User List
                    </Menu.Item>
                </SubMenu>
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
