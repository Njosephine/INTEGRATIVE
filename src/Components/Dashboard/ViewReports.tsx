import React, { useEffect, useState } from 'react';
import { Table, message, Button, Row, Col, Card } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx'; 

// Define interfaces for Sales, Products, and Orders
interface Sale {
  saleID: number;
  prodID: number;
  quantitySold: number;
  unitPrice: number;
  totalPrice: number;
  saleDate: string;
  statusOfPayment: string;
}

interface Product {
  productID: number;
  productName: string;
  supplierID: number;
  userID: number;
  categoryID: number;
  quantityAvailable: number;
  purchasePrice: number;
  sellingPrice: number;
  description: string;
}

interface Order {
  orderID: number;
  quantityOrdered: number;
  supplierID: number;
  userID: number;
  productID: number;
  orderDate: string;
}

const CombinedReport: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch sales, products, and orders from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [salesResponse, productsResponse, ordersResponse] = await Promise.all([
          axios.get<Sale[]>('http://localhost:5000/api/sales'),
          axios.get<Product[]>('http://localhost:5000/api/products'),
          axios.get<Order[]>('http://localhost:5000/api/orders'),
        ]);

        setSales(salesResponse.data);
        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
      } catch {
        message.error('Failed to fetch reports');
      }
    };

    fetchReports();
  }, []);

  // Function to export Sales report to Excel
  const exportSalesToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
    XLSX.writeFile(workbook, 'sales_report.xlsx');
  };

  // Function to export Products report to Excel
  const exportProductsToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products_report.xlsx');
  };

  // Function to export Orders report to Excel
  const exportOrdersToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'orders_report.xlsx');
  };

  // Function to export all reports to PDF
  const exportToPDF = () => {
    const pdf = new jsPDF();
    
    // Adding Sales Report
    pdf.text('Sales Report', 14, 20);
    sales.forEach((sale, index) => {
      pdf.text(`Sale ID: ${sale.saleID}, Product ID: ${sale.prodID}, Quantity Sold: ${sale.quantitySold}, Total Price: ${sale.totalPrice}, Sale Date: ${sale.saleDate}, Payment Status: ${sale.statusOfPayment}`, 14, 30 + index * 10);
    });

    pdf.addPage();
    
    // Adding Products Report
    pdf.text('Products Report', 14, 20);
    products.forEach((product, index) => {
      pdf.text(`Product ID: ${product.productID}, Product Name: ${product.productName}, Quantity Available: ${product.quantityAvailable}, Selling Price: ${product.sellingPrice}`, 14, 30 + index * 10);
    });

    pdf.addPage();

    // Adding Orders Report
    pdf.text('Orders Report', 14, 20);
    orders.forEach((order, index) => {
      pdf.text(`Order ID: ${order.orderID}, Quantity Ordered: ${order.quantityOrdered}, Product ID: ${order.productID}, Order Date: ${order.orderDate}`, 14, 30 + index * 10);
    });

    pdf.save('combined_report.pdf');
  };

  // Columns for Sales
  const salesColumns = [
    { title: 'Sale ID', dataIndex: 'saleID', key: 'saleID' },
    { title: 'Product ID', dataIndex: 'prodID', key: 'prodID' },
    { title: 'Quantity Sold', dataIndex: 'quantitySold', key: 'quantitySold' },
    { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
    { title: 'Sale Date', dataIndex: 'saleDate', key: 'saleDate' },
    { title: 'Payment Status', dataIndex: 'statusOfPayment', key: 'statusOfPayment' },
  ];

  // Columns for Products
  const productColumns = [
    { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Supplier ID', dataIndex: 'supplierID', key: 'supplierID' },
    { title: 'User ID', dataIndex: 'userID', key: 'userID' },
    { title: 'Category ID', dataIndex: 'categoryID', key: 'categoryID' },
    { title: 'Quantity Available', dataIndex: 'quantityAvailable', key: 'quantityAvailable' },
    { title: 'Purchase Price', dataIndex: 'purchasePrice', key: 'purchasePrice' },
    { title: 'Selling Price', dataIndex: 'sellingPrice', key: 'sellingPrice' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  // Columns for Orders
  const orderColumns = [
    { title: 'Order ID', dataIndex: 'orderID', key: 'orderID' },
    { title: 'Quantity Ordered', dataIndex: 'quantityOrdered', key: 'quantityOrdered' },
    { title: 'Supplier ID', dataIndex: 'supplierID', key: 'supplierID' },
    { title: 'User ID', dataIndex: 'userID', key: 'userID' },
    { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
    { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>GENERAL REPORT</h1>
      <Row gutter={16} justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Button onClick={exportToPDF} type="primary" style={{ marginBottom: 16 }}>Export All to PDF</Button>
        </Col>
        <Col>
          <Button onClick={exportSalesToExcel} type="primary" style={{ marginBottom: 16 }}>Export Sales to Excel</Button>
        </Col>
        <Col>
          <Button onClick={exportProductsToExcel} type="primary" style={{ marginBottom: 16 }}>Export Products to Excel</Button>
        </Col>
        <Col>
          <Button onClick={exportOrdersToExcel} type="primary" style={{ marginBottom: 16 }}>Export Orders to Excel</Button>
        </Col>
      </Row>

      <Card title="Sales Report" style={{ marginBottom: '20px' }}>
        <Table dataSource={sales} columns={salesColumns} rowKey="saleID" />
      </Card>

      <Card title="Product Report" style={{ marginBottom: '20px' }}>
        <Table dataSource={products} columns={productColumns} rowKey="productID" />
      </Card>

      <Card title="Order Report">
        <Table dataSource={orders} columns={orderColumns} rowKey="orderID" />
      </Card>
    </div>
  );
};

export default CombinedReport;
