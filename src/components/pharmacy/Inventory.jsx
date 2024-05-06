import React, { useEffect, useState } from "react";
import ReusableTable from "../../pages/ReusableTable";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../pages/configs";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import ReusableModal from "../ReusableModal";
import * as yup from 'yup';
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const Inventory = ({ activeTab }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventory, setInventory] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading,setLoading] = useState(false)
  const user = { name: "Oliver Wanyonyi", department: "Pharmacy" };

  const [formData, setFormData] = useState({ quantity: "" });

  const handleRowClick = (item) => {
    setShowModal(true);
    setInventory(item);
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
    { Header: "Item", accessor: "itemName" },
    { Header: "Category", accessor: "category" },
    { Header: "Current Stock", accessor: "currentStock" },
  ];

  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  };

  const fetchInventoryItems = async () => {
    try {
      const inventoryCollection = collection(db, "inventory");

      const inventorySnapshot = await getDocs(inventoryCollection);

      const items = inventorySnapshot.docs.map((doc) => {
        const itemData = doc.data();
        const itemId = doc.id;
        return {
          id: itemId,
          ...itemData,
        };
      });

      setInventoryItems(items);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "inventory") {
      fetchInventoryItems();
    }
  }, [activeTab]);

  return (
    <>
    <ReusableModal title='Request Item From Procurement' show={showModal} onHide={()=>setShowModal(false)}>
    <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col md={6} className="mb-2">
                  <Form.Group controlId="itemName" className="mb-2">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={inventory?.itemName}
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>  

                <Col md={6} className="mb-2">
                  <Form.Group controlId="quantity" className="mb-2">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData,quantity:e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                
               </Row>

               <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    {" "}
                    <FaSave style={{ marginRight: "0.5rem" }} />
                    Save
                  </>
                )}
              </Button>
               </Form>
    </ReusableModal>
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
              onClick={() => handleRowClick(row.original)}
            >
              Request Item
            </Dropdown.Item>
          </DropdownButton>
        </div>
      )}
    />
    </>
  );
};

export default Inventory;
