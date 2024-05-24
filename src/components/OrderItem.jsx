import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import {
 
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfig, { orderVendorItem } from "../pages/configs";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
const app = initializeApp(firebaseConfig); // Initialize Firebase app

const db = getFirestore(app); // Get Firestore instance

const StyledSubmitButton = styled(Button)`
  width: 200px;
`;

const OrderItem = ({ selectedItem, setSelectedItem, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vendor: "",
    item: "",
    unitCost: "",
    quantity: "",
    unitType:'',
    deliveryDate: "",
    orderDate: "",
    status: "ordered",
  });

  const changeHandler = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const orderValidationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    setLoading(true);
    try {
      await orderValidationSchema.validate(formData, { abortEarly: false });
     
      
      const formattedDate =  serverTimestamp();
    
      let newFormData = {...formData, orderDate:formattedDate}
      
      await orderVendorItem(newFormData)
      
      setFormData({
        vendor: "",
        item: "",
        unitCost: "",
        quantity: "",
        unitType:'',
        deliveredAt: "",
        orderDate: "",
        status: "ordered",
      });

      onClose();
      setSelectedItem();
      setLoading(false);
      toast.success("Order Submitted")
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
  };

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ...formData,
        vendor: selectedItem.vendor,
        item: selectedItem.itemName,
        unitCost: selectedItem.unitCost,
        unitType:selectedItem.unitType
      });
    }
  }, [selectedItem]);

  return (
    <Form onSubmit={handleFormSubmit}>
      {/* Vendor select field */}
      <Form.Group controlId="vendorId" className="mb-2">
        <Form.Label>Vendor</Form.Label>
        <Form.Control
          value={selectedItem?.vendor}
          disabled
          onChange={(e) => changeHandler(e, "vendorId")}
        />
      </Form.Group>

      {/* Item Name field */}
      <Form.Group controlId="itemName" className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={selectedItem?.itemName}
          onChange={(e) => changeHandler(e, "itemName")}
          disabled
        />
      </Form.Group>

      {/* Unit Cost field */}
      <Form.Group controlId="unitCost" className="mb-2">
        <Form.Label>Unit Price</Form.Label>
        <Form.Control
          type="number"
          disabled
          value={selectedItem?.unitCost}
          onChange={(e) => changeHandler(e, "unitCost")}
        />
      </Form.Group>

      {/* Unit Type field */}
      <Form.Group controlId="unitType" className="mb-2">
        <Form.Label>Unit Type</Form.Label>
        <Form.Control
          disabled
          type="text"
          value={selectedItem?.unitType}
          onChange={(e) => changeHandler(e, "unitType")}
        />
      </Form.Group>

      <Form.Group controlId="quantity" className="mb-2">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={formData.quantity}
          onChange={(e) => changeHandler(e, "quantity")}
        />
      </Form.Group>

      <StyledSubmitButton
        variant="primary"
        type="submit"
        disabled={loading}
        className="mt-3"
      >
        {loading ? "Submitting..." : "Submit"}
      </StyledSubmitButton>
    </Form>
  );
};

export default OrderItem;
