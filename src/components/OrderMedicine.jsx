import React, { useState } from 'react';
import { Modal, Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderMedicine = ({ show, onHide, patientName, loggedInUser }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    medicineName: '',
    medicineQuantity: '',
    medicineUrgency: '',
    medicineWard: '',
    orderingPhysician: '',
  });

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInitialFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle medicine selection
  const handleMedicineChange = (event, value) => {
    setInitialFormState((prevState) => ({
      ...prevState,
      medicineName: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { medicineName, medicineQuantity, medicineUrgency, medicineWard, orderingPhysician } = initialFormState;

    // Validate form fields
    if (!medicineName || !medicineQuantity || !medicineUrgency || !medicineWard || !orderingPhysician) {
      toast.error('Please fill in all fields', {
        key: Math.random().toString(),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call or any other submission logic
      console.log('Medicine Order submitted:', initialFormState);

      // Show success toast
      toast.success('Medicine Order submitted successfully!', {
      });

      // Reset form fields and close the modal after successful submission
      setInitialFormState({
        medicineName: '',
        medicineQuantity: '',
        medicineUrgency: '',
        medicineWard: '',
        orderingPhysician: '',
      });

      onHide();
    } catch (error) {
      toast.error('An error occurred while submitting the medicine order.', {
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{patientName}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Medicine Name</Form.Label>
                  <Autocomplete
                    freeSolo
                    disableClearable
                    options={[]}
                    renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                    onChange={handleMedicineChange}
                    value={initialFormState.medicineName}
                  />
                </Col>
                <Col>
                  <Form.Label>Medicine Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="medicineQuantity"
                    value={initialFormState.medicineQuantity}
                    onChange={handleInputChange}
                    placeholder="Enter Quantity"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Urgency</Form.Label>
                  <Form.Control
                    type="text"
                    name="medicineUrgency"
                    value={initialFormState.medicineUrgency}
                    onChange={handleInputChange}
                    placeholder="Enter Urgency"
                  />
                </Col>
                <Col>
                  <Form.Label>Ward</Form.Label>
                  <Form.Control
                    type="text"
                    name="medicineWard"
                    value={initialFormState.medicineWard}
                    onChange={handleInputChange}
                    placeholder="Enter Ward"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Ordering Physician</Form.Label>
                  <Form.Control
                    type="text"
                    name="orderingPhysician"
                    value={initialFormState.orderingPhysician}
                    onChange={handleInputChange}
                    placeholder="Enter Ordering Physician"
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                &nbsp;Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderMedicine;
