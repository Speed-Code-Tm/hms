import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderImaging = ({ show, onHide, patientName }) => {
  const [imagingTypes, setImagingTypes] = useState([]);
  const [selectedImaging, setSelectedImaging] = useState(null);
  const [orderingPhysician, setOrderingPhysician] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [reasonForImaging, setReasonForImaging] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Fetch imaging types from the database
    const fetchImagingTypes = async () => {
      try {
        // Simulating fetching from the database
        const dummyImagingTypes = ['X-Ray', 'MRI', 'CT Scan', 'Ultrasound'];
        setImagingTypes(dummyImagingTypes);

        // Set the ordering physician from the logged-in user or default value
        setOrderingPhysician('Dr. John Doe');
      } catch (error) {
        console.error('Error fetching imaging types:', error);
      }
    };

    fetchImagingTypes();
  }, []);

  const handleImagingSelect = (event, value) => {
    setSelectedImaging(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!selectedImaging) {
      toast.error('Please select an imaging type.', {});
      return;
    }

    if (!bodyPart) {
      toast.error('Please enter the body part.', {});
      return;
    }

    if (!reasonForImaging) {
      toast.error('Please enter the reason for imaging.', {});
      return;
    }

    try {
      // Implement submission logic here
      const orderData = {
        patientName,
        imagingType: selectedImaging,
        bodyPart,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        orderingPhysician,
        reasonForImaging,
        notes,
      };
      console.log('Imaging Order:', orderData);

      // Show success toast
      toast.success('Imaging order submitted successfully!', {});

      // Reset form fields and close the modal after successful submission
      setSelectedImaging(null);
      setBodyPart('');
      setReasonForImaging('');
      setNotes('');
      onHide();
    } catch (error) {
      toast.error('An error occurred while submitting the imaging order.', {});
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
                <Form.Label>Select Imaging Type</Form.Label>
                <Autocomplete
                  options={imagingTypes}
                  onChange={handleImagingSelect}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Body Part</Form.Label>
                <Form.Control
                  type="text"
                  value={bodyPart}
                  onChange={(e) => setBodyPart(e.target.value)}
                  placeholder="Enter body part"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Reason for Imaging</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reasonForImaging}
                  onChange={(e) => setReasonForImaging(e.target.value)}
                  placeholder="Enter reason for imaging"
                  style={{ resize: 'none' }}
                />
              </Form.Group>
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

export default OrderImaging;