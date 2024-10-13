import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';

interface Order {
    orderID: number;
    quantityOrdered: number;
    supplierID: number;
    userID: number;
    productID: number;
    orderDate: string;
    status: string; 
}

const FulfilledOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFulfilledOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/supplier-orders'); // API endpoint for all supplier's orders
                const data = await response.json();

                // Filter the orders to get only those with status 'Fulfilled'
                const fulfilledOrders = data.filter((order: Order) => order.status === 'Fulfilled');
                setOrders(fulfilledOrders);
            } catch {
                message.error('Failed to fetch fulfilled orders');
            } finally {
                setLoading(false);
            }
        };

        fetchFulfilledOrders();
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Product',
            dataIndex: 'productID', 
            key: 'productID',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantityOrdered',
            key: 'quantityOrdered',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
    ];

    return (
        <div>
            <h2>Fulfilled Orders</h2>
            <Table 
                dataSource={orders} 
                columns={columns} 
                loading={loading} 
                rowKey="orderID"
            />
        </div>
    );
};

export default FulfilledOrders;
