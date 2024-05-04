import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const OrderItem = () => {
    const vendors = []

    const [loading,setLoading] = useState(false)

    const [formData, setFormData] = useState({
        vendorId: '',
        itemName: '',
        unitCost: '',
        unitType: '',
        quantity:'',
      });

      const changeHandler = (e, field) => {
        const { value } = e.target;
        setFormData({
          ...formData,
          [field]: value,
        });
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        
        
      };
    
      const StyledSubmitButton = styled(Button)`
      width: 200px;
    `;

  return (
    <Form onSubmit={handleFormSubmit}>
      {/* Vendor select field */}
      <Form.Group controlId="vendorId" className="mb-2">
        <Form.Label>Vendor</Form.Label>
        <Form.Control
          as="select"
          value={formData.vendorId}
          onChange={(e) => changeHandler(e, 'vendorId')}
        >
          <option value="">Select a vendor</option>
          {/* Render available vendors as options */}
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Item Name field */}
      <Form.Group controlId="itemName" className="mb-2"> 
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.itemName}
          onChange={(e) => changeHandler(e, 'itemName')}
          disabled
        />
      </Form.Group>


      {/* Unit Cost field */}
      <Form.Group controlId="unitCost" className="mb-2">
        <Form.Label>Unit Price</Form.Label>
        <Form.Control
          type="number"
          disabled
          value={formData.unitCost}
          onChange={(e) => changeHandler(e, 'unitCost')}
        />
      </Form.Group>

      {/* Unit Type field */}
      <Form.Group controlId="unitType" className="mb-2">
        <Form.Label>Unit Type</Form.Label>
        <Form.Control
         disabled
          type="text"
          value={formData.unitType}
          onChange={(e) => changeHandler(e, 'unitType')}
        />
      </Form.Group>

      <Form.Group controlId="quantity" className="mb-2">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
         
          value={formData.quantity}
          onChange={(e) => changeHandler(e, 'quantity')}
        />
      </Form.Group>


      <StyledSubmitButton
                variant="primary"
                type="submit"
                disabled={loading}
                className='mt-3'
              >
                {loading ? "Submitting..." : "Submit"}
              </StyledSubmitButton>

      </Form>
  )
}

export default OrderItem