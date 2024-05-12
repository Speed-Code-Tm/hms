import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderLabTest = ({ show, onHide, patientName }) => {
 const [labTests, setLabTests] = useState([]);
 const [selectedTests, setSelectedTests] = useState([]);
 const [orderingPhysician, setOrderingPhysician] = useState('');
 const [notes, setNotes] = useState('');

 useEffect(() => {
   // Fetch lab tests from the database
   const fetchLabTests = async () => {
     try {
       // Simulating fetching from the database
       const dummyLabTests = [
         'Complete Blood Count (CBC)',
         'Comprehensive Metabolic Panel (CMP)',
         'Lipid Panel',
         'Thyroid Panel',
         'HbA1c',
         'Urinalysis',
       ];
       setLabTests(dummyLabTests);

       // Set the ordering physician from the logged-in user or default value
       setOrderingPhysician('Dr. John Doe');
     } catch (error) {
       console.error('Error fetching lab tests:', error);
     }
   };

   fetchLabTests();
 }, []);

 const handleTestSelect = (event, value) => {
   if (value) {
     setSelectedTests((prevTests) => [...prevTests, { name: value, quantity: 1, orderedAt: new Date() }]);
   }
 };

 const handleTestRemove = (index) => {
   setSelectedTests((prevTests) => prevTests.filter((_, i) => i !== index));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Input validation
   if (selectedTests.length === 0) {
     toast.error('Please select at least one lab test.', {});
     return;
   }

   try {
     // Implement submission logic here
     const orderData = {
       patientName,
       tests: selectedTests,
       orderingPhysician,
       notes,
     };
     console.log('Lab Test Order:', orderData);

     // Show success toast
     toast.success('Lab test order submitted successfully!', {});

     // Reset form fields and close the modal after successful submission
     setSelectedTests([]);
     setNotes('');
     onHide();
   } catch (error) {
     toast.error('An error occurred while submitting the lab test order.', {});
     console.error(error);
   }
 };

 return (
   <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>
         <strong>{patientName}</strong>
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Container>
         <Row className="mb-3">
           <Col>
             <Form.Label>Ordering Physician</Form.Label>
             <Form.Control type="text" value={orderingPhysician} readOnly />
           </Col>
         </Row>
         <Row>
           <Col>
             <Form.Group>
               <Form.Label>Select Lab Test</Form.Label>
               <Autocomplete
                 options={labTests}
                 onChange={handleTestSelect}
                 renderInput={(params) => <TextField {...params} />}
               />
             </Form.Group>
           </Col>
         </Row>
         <Row className="mt-3">
           <Col>
             <ListGroup>
               {selectedTests.map((test, index) => (
                 <ListGroup.Item
                   key={index}
                   style={{
                     backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                   }}
                 >
                   <Box display="flex" alignItems="center" justifyContent="space-between">
                     <Typography variant="body1">{test.name}</Typography>
                     <Box display="flex" alignItems="center">
                       <Typography variant="body2" className="mx-2">
                         {test.orderedAt.toLocaleString()}
                       </Typography>
                       <CloseIcon
                         onClick={() => handleTestRemove(index)}
                         style={{
                           cursor: 'pointer',
                           marginLeft: '0.5rem',
                           color: 'red',
                         }}
                       />
                     </Box>
                   </Box>
                 </ListGroup.Item>
               ))}
             </ListGroup>
           </Col>
         </Row>
         <Row className="mt-3">
           <Col>
             <Form.Group>
               <Form.Label>Notes</Form.Label>
               <Form.Control
                 as="textarea"
                 rows={3}
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 placeholder="Enter any additional notes"
                 style={{ resize: 'none' }}
               />
             </Form.Group>
           </Col>
         </Row>
       </Container>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={onHide}>
         Close
       </Button>
       <Button variant="primary" onClick={handleSubmit}>
         Submit
       </Button>
     </Modal.Footer>
   </Modal>
 );
};

export default OrderLabTest;