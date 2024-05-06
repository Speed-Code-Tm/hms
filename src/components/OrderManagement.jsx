import React, { useEffect, useState } from "react";
import { db } from "../pages/configs";
import { collection, doc, getDocs } from "firebase/firestore";
import ReusableTable from "../pages/ReusableTable";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ReusableModal from "./ReusableModal";
import CompleteOrder from "./CompleteOrder";
import { toast } from "react-toastify";

const OrderManagement = ({ activeTab }) => {
  const [orders, setOrders] = useState([]);
  const [orderItem,setOrderItem] = useState()
  const [showModal,setShowModal] = useState(false)
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

  const handleRowClick = async (item, status) => {
    setShowModal(true)
    setOrderItem(item)
   
  };

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");

      const ordersSnapshot = await getDocs(ordersCollection);

      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "orderManagement") {
      fetchOrders();
    }
  }, [activeTab]);

  return (
    <>
    {/* inventory management modal */}

    <ReusableModal title="Update Inventory" show={showModal}
    onHide={()=>setShowModal(false)}
    >
        <CompleteOrder orderItem={orderItem} onHide={()=>setShowModal(false)} setOrderItem={setOrderItem}/>

    </ReusableModal>
    <ReusableTable
      columns={orderManagementColumns}
      data={orders}
      initialState={initialState}
      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
          
            <Dropdown.Item href="#/action-1" onClick={()=>handleRowClick(row.original,'delivered')} >
           Mark Delivered
            </Dropdown.Item>

             <Dropdown.Item href="#/action-1" >
          Cancel Order
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
            Delete
            </Dropdown.Item>
           
          </DropdownButton>
        </div>
      )}
      
    />
    </>

  );
};

export default OrderManagement;
