import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form, Button, Row, Col } from "react-bootstrap";
import * as yup from 'yup';

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import { toast } from "react-toastify";
import { completOrder, db } from "../pages/configs";
import { FaSave } from "react-icons/fa";

const CompleteOrder = ({ orderItem, onHide, refetch }) => {
  const [activeTab, setActiveTab] = useState("addNewItem");
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    unitCost: "",
    unitType: "",
    quantity: "",
    description: "",
  });
  const [newItem,setNewItem] = useState(false)
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    "Pharmaceuticals",
    "Medical Supplies",
    "Medical Equipment",
    "Office Supplies",
    "Laboratory Supplies",
    "Personal Protective Equipment",
    "IT Supplies",
  ];

  useEffect(() => {
    if (orderItem) {
      console.log(orderItem);
      setFormData({
        itemName: orderItem.item || "",
        category: orderItem.category || "",
        unitCost: orderItem.unitCost || "",
        unitType: orderItem.unitType || "",
        quantity: orderItem.quantity || "",
        description: orderItem.description || "",
      });
    }
  }, [orderItem]);

  const changeHandler = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inventoryValidationSchema = yup.object().shape({
    itemName: yup.string().required("Item name is required."),
    category: yup.string().required("Category is required."),
    unitCost: yup
      .number()
      .required("Unit cost is required.")
      .min(1, "Unit cost must be be greater than 0"),
    unitType: yup.string().required("Unit type is required."),
    quantity: yup
      .number()
      .required("Quantity is required.")
      .min(0, "Quantity must be non-negative."),
    description: yup.string(),
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    setLoading(true);     

    try {
        await inventoryValidationSchema.validate(formData, { abortEarly: false });

        let {quantity, ...inventoryItem} = formData
        inventoryItem = newItem ? {...inventoryItem, startStock:quantity, newStock:0, currentStock:quantity}: {...inventoryItem, newStock:quantity}
  
      await completOrder(newItem,
       inventoryItem,orderItem.id
      )

      onHide();
      refetch()
    } catch (errors) {
      
        if (errors.inner && errors.inner.length > 0) {
            const firstErrorMessage = errors.inner[0].message;
            toast.error(`Please fix the following error: ${firstErrorMessage}`);
          } else {
            toast.error(
              "An unknown validation error occurred. Please check the form data."
            );
          }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(orderItem){
      const {id,item, ...rest} = orderItem
      setFormData({...rest, itemName:item})
    }
  }, [orderItem])
  return (
    <Row>
      <Col>
       <Form onSubmit={handleFormSubmit}>
              <Row>
              <Col md={12} className="mb-2">
             
              <Form.Check
        type="checkbox"
        id="new-item"
        label={newItem ? "New Product":"Existing Product"}
        checked={newItem}
        onChange={()=>setNewItem(prevState => !prevState)}
      />
                </Col>
                <Col md={6} className="mb-2">
                  <Form.Group controlId="itemName" className="mb-2">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.itemName}
                      onChange={(e) => changeHandler(e, "itemName")}
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-2">
                  <Form.Group controlId="category" className="mb-2">
                    <Form.Label>Select Item Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.category}
                      onChange={(e) => changeHandler(e, "category")}
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-2">
                  <Form.Group controlId="unitCost" className="mb-2">
                    <Form.Label>Unit Cost</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.unitCost}
                      onChange={(e) => changeHandler(e, "unitCost")}
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-2">
                  <Form.Group controlId="unitType" className="mb-2">
                    <Form.Label>Unit Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.unitType}
                      onChange={(e) => changeHandler(e, "unitType")}
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
                      onChange={(e) => changeHandler(e, newItem?"startStock":"newStock")}
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>

                {newItem &&<Col md={6} className="mb-2">
                  <Form.Group controlId="description" className="mb-2">
                    <Form.Label>Reorder Level</Form.Label>
                    <Form.Control
                    type="number"
                    min={1}
                      value={formData.reorderLevel}
                      onChange={(e) => changeHandler(e, "reorderLevel")}
                    
                    />
                  </Form.Group>
                </Col>}

                <Col xs={12} className="mb-2">
                  <Form.Group controlId="description" className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => changeHandler(e, "description")}
                    
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
      </Col>
    </Row>
  );
};

export default CompleteOrder;
