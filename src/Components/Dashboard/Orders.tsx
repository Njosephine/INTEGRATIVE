import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';

interface Order {
    _id: number;
    quantityOrdered: number;
    productName: number;
    orderDate: string;
    status: string; 
}

const ConfirmedOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchConfirmedOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/supplier-orders'); // API endpoint for all supplier's orders
                const data = await response.json();

                // Filter the orders to get only those with status 'Confirmed'
                const confirmedOrders = data.filter((order: Order) => order.status === 'Confirmed');
                setOrders(confirmedOrders);
            } catch {
                message.error('Failed to fetch confirmed orders');
            } finally {
                setLoading(false);
            }
        };

        fetchConfirmedOrders();
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Product',
            dataIndex: 'productName', 
            key: 'productName',
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
            <h2>Confirmed Orders</h2>
            <Table 
                dataSource={orders} 
                columns={columns} 
                loading={loading} 
                rowKey="orderID"
            />
        </div>
    );
};

export default ConfirmedOrders;
