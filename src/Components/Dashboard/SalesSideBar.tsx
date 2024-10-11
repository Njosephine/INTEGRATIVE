import { Menu } from "antd";
import {
    AppstoreOutlined,
    DollarOutlined,
    FileAddOutlined,
    PlusOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

interface SalesSidebarProps {
    onMenuSelect: (menuKey: string) => void; // Function type that takes a string
}

// Use the props interface in the Sidebar component
const SalesSidebar: React.FC<SalesSidebarProps> = (props) => {
    // Function to handle menu item clicks
    const handleMenuClick = (menuKey: string) => {
        props.onMenuSelect(menuKey); // Call the passed function to set the selected menu
    };

    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{ fontSize: '14px', textTransform: 'uppercase' }}
            >
                {/* Sub-menu for managing sales */}
                <SubMenu key="manage-sales" icon={<DollarOutlined />} title="Manage Sales" style={{ marginBottom: '40px' }}>
                    <Menu.Item key="add-sale" icon={<PlusOutlined />} onClick={() => handleMenuClick('add-sale')}>
                        Add Sales
                    </Menu.Item>
                    <Menu.Item key="list-sales" icon={<UnorderedListOutlined />} onClick={() => handleMenuClick('list-sales')}>
                        Sales List
                    </Menu.Item>
                </SubMenu>

                {/* Sub-menu for managing products */}
                <SubMenu key="manage-products" icon={<AppstoreOutlined />} title="Manage Products" style={{ marginBottom: '40px' }}>
                    <Menu.Item key="add-product" icon={<PlusOutlined />} onClick={() => handleMenuClick('add-product')}>
                        Add Products
                    </Menu.Item>
                    <Menu.Item key="list-products" icon={<UnorderedListOutlined />} onClick={() => handleMenuClick('list-products')}>
                        Products List
                    </Menu.Item>
                </SubMenu>

                {/* Sub-menu for managing orders */}
                <SubMenu key="manage-orders" icon={<FileAddOutlined />} title="Manage Orders" style={{ marginBottom: '40px' }}>
                    <Menu.Item key="create-orders" icon={<PlusOutlined />} onClick={() => handleMenuClick('create-orders')}>
                        Create Orders
                    </Menu.Item>
                    <Menu.Item key="view-orders" icon={<UnorderedListOutlined />} onClick={() => handleMenuClick('view-orders')}>
                        View Orders
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default SalesSidebar;
