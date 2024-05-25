import React, { useEffect, useState } from "react";
import { db, retrieveInventoryOrders } from "../pages/configs";
import { collection, doc, getDocs } from "firebase/firestore";
import ReusableTable from "../pages/ReusableTable";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ReusableModal from "./ReusableModal";
import CompleteOrder from "./CompleteOrder";
import { toast } from "react-toastify";

const OrderManagement = ({ data, fetchData }) => {
  
  const [orderItem,setOrderItem] = useState()
  const [showModal,setShowModal] = useState(false)
  const orderManagementColumns = [
    { Header: "Order ID", accessor: "id" },
    { Header: "Items", accessor: "item" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Vendor", accessor: "vendor" },
    { Header: "Status", accessor: "status" },
    { Header: "Date Ordered", accessor: "orderDate" },
    { Header: "Delivery Date", accessor: "deliveredAt" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleRowClick = async (item, status) => {
    setShowModal(true)
    setOrderItem(item)
   
  };

 

 

  return (
    <>
    {/* inventory management modal */}

    <ReusableModal title="Update Inventory" show={showModal}
    onHide={()=>setShowModal(false)}
    >
        <CompleteOrder orderItem={orderItem} refetch={fetchData} onHide={()=>setShowModal(false)} setOrderItem={setOrderItem}/>

    </ReusableModal>
    <ReusableTable
      columns={orderManagementColumns}
      data={data}
      initialState={initialState}
      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
          
           {row?.original?.status !== 'delivered' && <Dropdown.Item href="#/action-1" onClick={()=>handleRowClick(row.original,'delivered')} >
           Mark Delivered
            </Dropdown.Item>}

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
