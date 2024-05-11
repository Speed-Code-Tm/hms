import React, { useEffect, useState } from "react";
import ReusableTable from "../../pages/ReusableTable";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db, retrievePharmacyInventory } from "../../pages/configs";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import ReusableModal from "../ReusableModal";
import * as yup from 'yup';
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import AddMedicine from "./AddMedicine";

const MedicineInventory = ({ activeTab }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventory, setInventory] = useState();
  const [inventoryModal,setInventoryModal] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [loading,setLoading] = useState(false)
  const user = { name: "Oliver Wanyonyi", department: "Pharmacy" };
  const [editing,setEditing]  = useState(false)
  const [formData, setFormData] = useState({ quantity: "" });

  const handleRowClick = (item, action) => 
  {
    setInventory(item);
    if(action  === 'edit'){
        setShowModal(true);
        setEditing(true)
    }
  };



  const handleFormSubmit = async(e) =>{

    setLoading(true)
    e.preventDefault()

    const timestamp = Timestamp.now()
    const date = timestamp.toDate()
    const formattedDate = date.toLocaleString();
    try {

        await itemRequestValidationSchema.validate(formData, { abortEarly: false });

        const departmentNeedsCollection = collection(db, 'departmentNeeds')
       await addDoc(departmentNeedsCollection, {
        itemName:inventory.itemName,
        quantity:formData.quantity,
        requestDate:formattedDate,
        status:"pending",
        requestedBy:user.name
       })

       setFormData({quantity:''})

       setShowModal(false)
        
    } catch (errors) {
        if (errors.inner && errors.inner.length > 0) {
            const firstErrorMessage = errors.inner[0].message;
            toast.error(`Please fix the following error: ${firstErrorMessage}`);
          } else {
            toast.error(
              "An unknown validation error occurred. Please check the form data."
            );
          }
    }
    finally{
        setLoading(false)
    }

  }

  const itemRequestValidationSchema = yup.object().shape({
   
    quantity: yup
      .number()
      .required("Quantity is required.")
      .min(0, "Quantity must be non-negative."),
  });


  const inventoryColumns = [
    // { Header: "", accessor: "id" },
    { Header: "Item", accessor: "name" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Unit", accessor: "unitType" },
  ];

  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  };

  const fetchInventoryItems = async () => {
    try {
      const inventoryData = await retrievePharmacyInventory()
      console.log(inventoryData);
      setInventoryItems(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "medicine") {
      fetchInventoryItems();
    }
  }, [activeTab]);

  return (
    <>
  

    <ReusableModal title={"Add Item"} show={inventoryModal} onHide={()=>setInventoryModal(false)}>
       <AddMedicine onHide={()=>setInventoryModal(false)}  refetch={fetchInventoryItems}/>
    </ReusableModal>
    <div className="d-flex justify-content-end p-2">
    <Button onClick={()=>setInventoryModal(true)} className="btn-sm">Add Medicine</Button>

    </div>

    <ReusableTable
      columns={inventoryColumns}
      data={inventoryItems}
      initialState={initialState}
      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton
            dropup="true"
            id="dropdown-basic-button"
            title="Actions"
          >
            <Dropdown.Item
              href="#/action-1"
              onClick={() => handleRowClick(row.original, 'edit')}
            >
              Update
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => handleRowClick(row.original, 'delete')}
            >
             Delete
            </Dropdown.Item>
          </DropdownButton>
        </div>
      )}
    />
    </>
  );
};

export default MedicineInventory;
