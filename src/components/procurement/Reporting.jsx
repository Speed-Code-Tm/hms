

import { Line,Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {Container,Row,Col} from 'react-bootstrap'


const ProcurementReporting = () =>{

    const orders = [
        {
            orderId: 'ORD001',
            item: 'Laptop',
            quantity: 1,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-05-01'),
            deliveredAt: new Date('2024-05-10'),
            unitCost: 1200 // Example unit cost for the Laptop
        },
        {
            orderId: 'ORD002',
            item: 'Printer',
            quantity: 1,
            vendor: 'OfficeSupplies Inc.',
            status: 'Delivered',
            dateOrdered: new Date('2024-05-03'),
            deliveredAt: new Date('2024-05-12'),
            unitCost: 300 // Example unit cost for the Printer
        },
        {
            orderId: 'ORD003',
            item: 'Projector',
            quantity: 1,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-05-06'),
            deliveredAt: new Date('2024-05-15'),
            unitCost: 800 // Example unit cost for the Projector
        },
        {
            orderId: 'ORD004',
            item: 'Desktop Computer',
            quantity: 1,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-05-10'),
            deliveredAt: new Date('2024-05-20'),
            unitCost: 1500 // Example unit cost for the Desktop Computer
        },
        {
            orderId: 'ORD005',
            item: 'Office Chair',
            quantity: 2,
            vendor: 'Furniture World',
            status: 'Delivered',
            dateOrdered: new Date('2024-05-12'),
            deliveredAt: new Date('2024-05-22'),
            unitCost: 150 // Example unit cost for the Office Chair
        },
        {
            orderId: 'ORD006',
            item: 'External Hard Drive',
            quantity: 2,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-06-01'),
            deliveredAt: new Date('2024-06-10'),
            unitCost: 100 // Example unit cost for the External Hard Drive
        },
        {
            orderId: 'ORD007',
            item: 'Smartphone',
            quantity: 1,
            vendor: 'MobileTech',
            status: 'Delivered',
            dateOrdered: new Date('2024-06-03'),
            deliveredAt: new Date('2024-06-15'),
            unitCost: 800 // Example unit cost for the Smartphone
        },
        {
            orderId: 'ORD008',
            item: 'Printer Paper',
            quantity: 5,
            vendor: 'OfficeSupplies Inc.',
            status: 'Delivered',
            dateOrdered: new Date('2024-06-10'),
            deliveredAt: new Date('2024-06-20'),
            unitCost: 10 // Example unit cost for the Printer Paper
        },
        {
            orderId: 'ORD009',
            item: 'Whiteboard',
            quantity: 1,
            vendor: 'OfficeSupplies Inc.',
            status: 'Delivered',
            dateOrdered: new Date('2024-06-15'),
            deliveredAt: new Date('2024-06-25'),
            unitCost: 50 // Example unit cost for the Whiteboard
        },
        {
            orderId: 'ORD010',
            item: 'Tablet',
            quantity: 2,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-07-01'),
            deliveredAt: new Date('2024-07-10'),
            unitCost: 400 // Example unit cost for the Tablet
        },
        {
            orderId: 'ORD011',
            item: 'Desk Lamp',
            quantity: 1,
            vendor: 'Furniture World',
            status: 'Delivered',
            dateOrdered: new Date('2024-07-05'),
            deliveredAt: new Date('2024-07-15'),
            unitCost: 50 // Example unit cost for the Desk Lamp
        },
        {
            orderId: 'ORD012',
            item: 'Office Desk',
            quantity: 1,
            vendor: 'Furniture World',
            status: 'Delivered',
            dateOrdered: new Date('2024-07-10'),
            deliveredAt: new Date('2024-07-20'),
            unitCost: 300 // Example unit cost for the Office Desk
        },
        {
            orderId: 'ORD013',
            item: 'Presentation Clicker',
            quantity: 1,
            vendor: 'OfficeSupplies Inc.',
            status: 'Delivered',
            dateOrdered: new Date('2024-07-15'),
            deliveredAt: new Date('2024-07-25'),
            unitCost: 30 // Example unit cost for the Presentation Clicker
        },
        {
            orderId: 'ORD014',
            item: 'Standing Desk',
            quantity: 1,
            vendor: 'Furniture World',
            status: 'Delivered',
            dateOrdered: new Date('2024-08-01'),
            deliveredAt: new Date('2024-08-10'),
            unitCost: 600 // Example unit cost for the Standing Desk
        },
        {
            orderId: 'ORD015',
            item: 'Wireless Mouse',
            quantity: 2,
            vendor: 'TechCo',
            status: 'Delivered',
            dateOrdered: new Date('2024-08-05'),
            deliveredAt: new Date('2024-08-15'),
            unitCost: 20 // Example unit cost for the Wireless Mouse
        },
        {
            orderId: 'ORD016',
            item: 'Office Chair',
            quantity: 1,
            vendor: 'Furniture World',
            status: 'Delivered',
            dateOrdered: new Date('2024-08-10'),
            deliveredAt: new Date('2024-08-20'),
            unitCost: 150 // Example unit cost for the Office Chair
        }
    ];

    const issuedItems = [
        { itemName: 'Laptop', quantity: 3, department: 'IT', status: 'issued', issuedDate: new Date('2024-05-01') },
        { itemName: 'Printer', quantity: 2, department: 'Admin', status: 'issued', issuedDate: new Date('2024-05-03') },
        { itemName: 'Projector', quantity: 1, department: 'IT', status: 'issued', issuedDate: new Date('2024-05-06') },
        { itemName: 'Desktop Computer', quantity: 5, department: 'HR', status: 'issued', issuedDate: new Date('2024-05-10') },
        { itemName: 'Office Chair', quantity: 10, department: 'Admin', status: 'issued', issuedDate: new Date('2024-05-12') },
        { itemName: 'External Hard Drive', quantity: 4, department: 'IT', status: 'issued', issuedDate: new Date('2024-05-15') },
        { itemName: 'Smartphone', quantity: 2, department: 'Sales', status: 'issued', issuedDate: new Date('2024-05-18') },
        { itemName: 'Printer Paper', quantity: 20, department: 'Admin', status: 'issued', issuedDate: new Date('2024-05-20') },
        { itemName: 'Whiteboard', quantity: 2, department: 'HR', status: 'issued', issuedDate: new Date('2024-05-25') }
    ];

    const groupedIssuedItemsData = issuedItems.reduce((acc, item) => {
        if (!acc[item.department]) acc[item.department] = 0;
        acc[item.department] += item.quantity;
        return acc;
    }, {});

    const issuedItemslabels = Object.keys(groupedIssuedItemsData);
    const issuedItemsData = Object.values(groupedIssuedItemsData);

    const issuedItemsChartData = {
        labels: issuedItemslabels,
        datasets: [
            {
                label: 'Item Demand by Department',
                data:issuedItemsData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const issuedItemsChartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };



    const calculateTotalCost = (order) => {
        const costPerUnit = order.unitCost; // Using unitCost property instead of looking up in itemPrices
        return order.quantity * costPerUnit;
    };
    
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');
    
    const groupedData = deliveredOrders.reduce((acc, order) => {
        const month = `${order.dateOrdered.getFullYear()}-${String(order.dateOrdered.getMonth() + 1).padStart(2, '0')}`;
    
        if (!acc[month]) acc[month] = 0;
    
        const totalCost = calculateTotalCost(order);
        acc[month] += totalCost;
    
        return acc;
    }, {});
    
    const labels = Object.keys(groupedData).sort();
    const data = Object.values(groupedData);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Procurement Cost',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };
    return (
        <Container className='py-3'>
            <Row>
                <Col md={6}>
        <Line data={chartData} />
        <h6 className='mt-3 text-center'>Procurement Cost Over Time</h6>

                </Col>

                <Col md={6}>
              
            <Bar data={issuedItemsChartData} options={issuedItemsChartOptions} />
            <h6 mt-3 text-center>Item Demand by Department</h6>
        
                    </Col>
                </Row>
       
    </Container>
    )
}

export default ProcurementReporting