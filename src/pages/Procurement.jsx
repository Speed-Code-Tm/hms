import React, { useState,useEffect } from "react";
import ReusableTable from "./ReusableTable";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  Modal,
  Button,
  Form,
  Card,
  ProgressBar,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  DropdownButton,
} from "react-bootstrap";


import {initializeApp} from 'firebase/app'
import firebaseConfig, { retrieveDepartmentNeeds, retrieveInventoryItems, retrieveInventoryOrders, retrieveIssuedItems } from "./configs";
import {getDocs,collection, getFirestore} from 'firebase/firestore'
import OrderManagement from "../components/OrderManagement";
import DepartmentNeeds from "../components/DepartmentNeeds";
import { Inventory } from "../components/inventory/Inventory";
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

  // Sample data
  const procurementData = [
    // Add your sample data here
  ];

const DepartmentNeedsTab = () => {
  const departmentNeedsColumns = [
    { Header: "Item", accessor: "item" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Department", accessor: "department" },
    { Header: "Requested By", accessor: "requestedBy" },
    { Header: "Request Date", accessor: "requestDate" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });



  return (
    <ReusableTable
      columns={departmentNeedsColumns}
      data={procurementData}
      initialState={initialState}
    />
  );
};

const OrderManagementTab = ({orders}) => {
  const orderManagementColumns = [
    { Header: "Order ID", accessor: "id" },
    { Header: "Items", accessor: "item" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Vendor", accessor: "vendor" },
    { Header: "Status", accessor: "status" },
    { Header: "Date Ordered", accessor: "orderDate" },
    { Header: "Delivery Date", accessor: "deliveryDate" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

 

  return (
     <ReusableTable
      columns={orderManagementColumns}
      data={orders}
      initialState={initialState}
      ActionDropdown={ActionDropdown}
    />
  

  );
};

const InventoryTab = ({data}) => {
  return (
    <Container>
      {/* <Card>
        <Card.Header>
          <h4>Gauze Pads</h4>
        </Card.Header>
        <Card.Body>
          <CircularProgressBar now={65} label={"65%"} />
        </Card.Body>
      </Card> */}
      <Inventory data={data}/>
      {/* Add more inventory items here */}
    </Container>
  );
};

const ReportingTab = () => {
  return (
    <Container>
      <h4>Procurement Costs Over Time</h4>
      {/* Add line chart component here */}
      <h4>Item Demand by Department</h4>
      {/* Add bar chart component here */}
      <h4>Vendor Performance</h4>
      {/* Add pie chart component here */}
    </Container>
  );
};

const IssuedItemsTab = ({data}) => {
  const issuedItemsColumns = [
    { Header: "Item", accessor: "itemName" },
    { Header: "Issued To", accessor: "issuedTo" },
    { Header: "Quantity", accessor: "issuedQuantity" },
    { Header: "Department", accessor: "department" },
    { Header: "Requested By", accessor: "requestedBy" },
    { Header: "Issued On", accessor: "issuedOn" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  return (
    <ReusableTable
      columns={issuedItemsColumns}
      data={data}
      initialState={initialState}
      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">

            {/* <Dropdown.Item href="#/action-2" onClick={() => handleRowClick(row.original, 'action')}>
              Issue Item
            </Dropdown.Item>

            <Dropdown.Item href="#/action-2">
              Cancel Request
            </Dropdown.Item> */}

          </DropdownButton>
        </div>
      )}
    />
  );
};

const ActionDropdown = ({ row }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    // Handle edit logic here
    console.log(`Editing item: ${row.original.item}`);
    setShowModal(true);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log(`Deleting item: ${row.original.item}`);
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Container>
        <FaEdit
          onClick={handleEdit}
          style={{ cursor: "pointer", color: "green" }}
        />
        <FaTrash
          onClick={handleDelete}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Container>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{/* Add form fields for editing item details */}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Procurement = () => {
  const [activeTab, setActiveTab] = useState("departmentNeeds");
  const [loading,setLoading] = useState([])
  const [departmentRequests,setDepartmentRequests] = useState([])
  const [issuedItems,setIssuedItems] = useState([])
  const [inventory,setInventory] = useState([])
  const [inventoryOrder,setInventoryOrder]= useState([])
 

  const fetchInventoryOrders = async () => {
    try {
     const ordersData = await retrieveInventoryOrders()
    
      setInventoryOrder(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchDeparmentRequests = async () =>{
    try{
      const departmentNeedsData = await retrieveDepartmentNeeds()
    
      setDepartmentRequests(departmentNeedsData);
    }catch(error){
      console.log(error)
    }
    
}


const fetchInventory = async () => {
  try {
     
    
      const inventoryData = await retrieveInventoryItems()
      
      setInventory(inventoryData);
  } catch (error) {
      console.error('Error fetching orders:', error);
     
  }
};


const fetchIssuedItems = async () => {
  try {
     
      
    
      const issuedItemsData =  await retrieveIssuedItems()
      setIssuedItems(issuedItemsData);
  } catch (error) {
      console.error('Error fetching orders:', error);
     
  }
};

useEffect(()=>{
  if(activeTab === "departmentNeeds"){
     fetchDeparmentRequests()
  }else if(activeTab === 'orderManagement'){
    fetchInventoryOrders()
  }else if(activeTab === 'inventory'){
    fetchInventory()
  }else if(activeTab === 'reporting'){

  }else if (activeTab === 'issuedItems'){
    fetchIssuedItems()
  }
},[activeTab])


 
  return (
    <Container className="py-3">
      <Row>
        <Col>
          <Tabs
            id="pharmacy-tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="justify-content-center"
          >
            <Tab eventKey="departmentNeeds" title="department Needs">
              <DepartmentNeeds data={departmentRequests} refetch={fetchDeparmentRequests}  />
            </Tab>
            <Tab eventKey="orderManagement" title="order Management">
              <OrderManagement fetchData={fetchInventoryOrders} data={inventoryOrder} />
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              <InventoryTab data={inventory}  />
            </Tab>
            <Tab eventKey="reporting" title="Reporting">
              <ReportingTab />
            </Tab>
            <Tab eventKey="issuedItems" title="Issued Items">
              <IssuedItemsTab  data={issuedItems}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Procurement;
