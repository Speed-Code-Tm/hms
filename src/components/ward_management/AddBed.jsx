import React, { useState } from 'react'
import { Button, Col,Form, Row } from 'react-bootstrap';
import { addBed } from '../../pages/configs';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const AddBed = ({ward,onHide}) => {
    const [formData, setFormData] = useState({
        bedNo: '',
        occupied: ''
      });
      const [loading,setLoading] = useState(false)

    const handleInputChange = (field, value) => {     

        setFormData({
          ...formData,
          [field]: value
        });
      };
      const bedSchema = yup.object().shape({
        bedNo: yup.string().required('Bed number is required'),
      });

    const submitHandler = async (e) => {
        e.preventDefault();
         setLoading(true)
         
        try {

            await bedSchema.validate(formData,{abortEarly:false})
            
            await addBed({...formData, wardId: ward.id, wardName:ward.name})

            onHide()
        } catch (error) {
            
            if (error.inner && error.inner.length > 0) {
                const firstErrorMessage = error.inner[0].message;
                toast.error(`Please fix the following error: ${firstErrorMessage}`);
              } else {
                toast.error(
                  "An unknown validation error occurred. Please check the form data."
                );
              } 
        }
        finally{
        setFormData({
          bedNo: '',
          occupied: false
        });
    }
      };
  return (
    
       <Form onSubmit={submitHandler}>
      <Row>
       <Col>
        <Form.Group  controlId="bedNo">
          <Form.Label>Bed Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bed no"
            value={formData.bedNo}
            onChange={(e) => handleInputChange('bedNo', e.target.value)}
          />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group>
        <Form.Label  sm={2}>
          Occupied
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={formData.occupied ?"occupied": 'empty'}
            checked={formData.occupied}
            onChange={(e) => handleInputChange('occupied', e.target.checked)}
          />
        </Col>
      </Form.Group>
        </Col>
      </Row>
     
     
      

      <Button variant="primary" className='mt-3' type="submit">
        Add Bed
      </Button>
    </Form>
  )
}

export default AddBed
