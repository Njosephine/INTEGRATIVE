import { Menu } from "antd";
import { DashboardOutlined,  CheckCircleOutlined, FileDoneOutlined} from '@ant-design/icons'


const { SubMenu } = Menu;

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
                style={{ fontSize: '13px', textTransform: 'uppercase'}}
            
            >
                 <SubMenu key="orders" icon={< DashboardOutlined/>} title="Orders" style={{ marginBottom: '40px' }}>
                    <Menu.Item key="confirmed-orders" icon={<CheckCircleOutlined/>} onClick={() => handleMenuClick('confirmed-orders')}>
                        Confirmed Orders
                    </Menu.Item>
                    <Menu.Item key="fulfilled-orders" icon={<FileDoneOutlined  />} onClick={() => handleMenuClick('fulfilled-orders')}>
                    Fulfilled Orders
                    </Menu.Item>
                </SubMenu>
               
            </Menu>
        </div>
    );
}

export default Sidebar;

