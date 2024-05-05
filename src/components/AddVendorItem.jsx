import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addDoc, collection, getDocs,deleteDoc, doc, getFirestore } from 'firebase/firestore';
import * as Yup from 'yup';
import firebaseConfig from '../pages/configs';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig); // Initialize Firebase app

const db = getFirestore(app); // Get Firestore instance
const StyledSubmitButton = styled(Button)`
width: 200px;
`;


const AddVendorItem = ({onClose}) => {

    const [loading,setLoading] = useState(false)
    const [vendors,setVendors] = useState([])
    const [formData, setFormData] = useState({
        vendorId: '',
        itemName: '',
        description: '',
        unitCost: '',
        unitType: '',
      });


      const vendorItemValidationSchema = Yup.object().shape({
        vendorId: Yup.string()
            .required("Vendor ID is required"), 
        itemName: Yup.string()
            .required("Item name is required") 
            .min(3, "Item name must be at least 3 characters long"), 
        description: Yup.string()
            .required("Description is required")
            .min(5, "Description must be at least 5 characters long"), 
        unitCost: Yup.number()
            .required("Unit cost is required") 
            .min(0, "Unit cost cannot be negative"), 
        unitType: Yup.string()
            .required("Unit type is required") 
    });


      useEffect(() => {
        
        const fetchVendors = async () => {
          try {
            const vendorsCollection = collection(db, 'vendors');
            const vendorsSnapshot = await getDocs(vendorsCollection);
            const vendorsList = vendorsSnapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
            }));
            setVendors(vendorsList);
          } catch (error) {
            console.error('Error fetching vendors:', error);
          }
        };
        fetchVendors();
      }, []);


      const changeHandler = (e, field) => {
        const { value } = e.target;
        setFormData({
          ...formData,
          [field]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            
          await vendorItemValidationSchema.validate(formData, { abortEarly: false });
    
          
          const vendorItemsCollection = collection(db, 'vendorItems');
          await addDoc(vendorItemsCollection, formData);
    
          
          setFormData({
            vendorId: '',
            itemName: '',
            description: '',
            unitCost: '',
            unitType: '',
          });
    
          
         onClose()
         
          setLoading(false);
        } catch (errors) {
            console.log(errors)
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
    
    


  return (
    <Form onSubmit={handleSubmit}>
      {/* Vendor select field */}
      <Form.Group controlId="vendorId" className="mb-2">
        <Form.Label>Vendor</Form.Label>
        <Form.Control
          as="select"
          value={formData.vendorId}
          onChange={(e) => changeHandler(e, 'vendorId')}
        >
          <option value="">Select a vendor</option>
          
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>


      <Form.Group controlId="itemName" className="mb-2"> 
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.itemName}
          onChange={(e) => changeHandler(e, 'itemName')}
        />
      </Form.Group>


      <Form.Group controlId="description" className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.description}
          onChange={(e) => changeHandler(e, 'description')}
        />
      </Form.Group>


      <Form.Group controlId="unitCost" className="mb-2">
        <Form.Label>Unit Price</Form.Label>
        <Form.Control
          type="number"
          value={formData.unitCost}
          onChange={(e) => changeHandler(e, 'unitCost')}
        />
      </Form.Group>


      <Form.Group controlId="unitType" className="mb-2">
        <Form.Label>Unit Type</Form.Label>
        <Form.Control
          type="text"
          value={formData.unitType}
          onChange={(e) => changeHandler(e, 'unitType')}
        />
      </Form.Group>

      <StyledSubmitButton
                variant="primary"
                type="submit"
                disabled={loading}
                className='mt-3'
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </StyledSubmitButton>

      </Form>
  )
}

export default AddVendorItem