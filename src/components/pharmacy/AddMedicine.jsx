import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { FaSave } from "react-icons/fa"
import { addPharmacyInventoryItem } from "../../pages/configs"
import * as yup from 'yup';
import { toast } from "react-toastify";

const AddInventoryItem = ({onHide, refetch}) =>{
    const [loading,setLoading] = useState(false)
   
    const [formData,setFormData] = useState({
        name:'',
        quantity:'',
        unitType:''
    })

    function changeHandler(e, field){
        setFormData({...formData, [field]:e.target.value})
    }

    

    const itemValidationSchema = yup.object().shape({
        name:yup.string().required('Item name is required'),
        unitType:yup.string().required('Unit Type is required'),
        quantity: yup
          .number()
          .required("Quantity is required.")
          .min(0, "Quantity must be non-negative."),
      });
  async  function handleSubmit (e){
        e.preventDefault()
        
        try {
            
           await itemValidationSchema.validate(formData, {abortEarly:false})

           setLoading(true)
           await addPharmacyInventoryItem(formData)

           onHide()

           toast.success("Inventory Item added")

           refetch()
            
        } catch (error) {
            if (error.inner && error.inner.length > 0) {
                const firstErrorMessage = error.inner[0].message;
                toast.error(`Please fix the following error: ${firstErrorMessage}`);
              } else {
                toast.error(
                  "An unknown validation error occurred. Please check the form data."
                );
              }
        }finally{
            setLoading(false)
        }

    }

    return(<div>
        <Form onSubmit={handleSubmit}>
        <Row>
                <Col md={6} className="mb-2">
                  <Form.Group controlId="itemName" className="mb-2">
                    <Form.Label>Medicine Name</Form.Label>
                    <Form.Control
                      type="text"
                      
                      onChange={(e) => changeHandler(e,'name')}
                      value={formData.name}
                    />
                  </Form.Group>
                </Col>  

                <Col md={6} className="mb-2">
                  <Form.Group controlId="itemName" className="mb-2">
                    <Form.Label>Unit Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.unitType}
                      onChange={(e) => changeHandler(e,'unitType')}
                    />
                  </Form.Group>
                </Col>  

                <Col md={6} className="mb-2">
                  <Form.Group controlId="quantity" className="mb-2">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => changeHandler(e,'quantity')}
                  
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
                    Submit
                  </>
                )}
              </Button>
        </Form>
       
        </div>)
}

export default AddInventoryItem