import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const NursingNotes = ({ show, onHide, patientName, loggedInUser }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    nurseName: '',
    date: '',
    time: '',
    noteContent: '',
  });

  useEffect(() => {
    const fetchNurseInfo = async () => {
      try {
        // Simulate fetching nurse information from an API
        const nurseName = loggedInUser || 'Default Nurse';
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        setInitialFormState((prevState) => ({
          ...prevState,
          nurseName,
          date: currentDate,
          time: currentTime,
        }));
      } catch (error) {
        console.error('Error fetching nurse information:', error);
      }
    };

    fetchNurseInfo();
  }, [loggedInUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nurseName, noteContent } = initialFormState;

    // Input validation using Yup
    const validationSchema = Yup.object().shape({
      nurseName: Yup.string().required('Nurse Name is required'),
      noteContent: Yup.string().required('Note content is required'),
    });

    try {
      await validationSchema.validate({ nurseName, noteContent }, { abortEarly: false });
    } catch (error) {
      error.inner.forEach((err) => {
        toast.error(err.message, {
          key: Math.random().toString(),
        });
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call or any other submission logic
      

      // Show success toast
      toast.success('Nursing Note submitted successfully!', {
      });

      // Reset form fields and close the modal after successful submission
      setInitialFormState({
        nurseName,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        noteContent: '',
      });

      onHide();
    } catch (error) {
      toast.error('An error occurred while submitting the nursing note.', {
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { nurseName, date, time, noteContent } = initialFormState;

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
            <Row className="mb-3">
              <Col>
                <Form.Label>Nurse Name</Form.Label>
                <Form.Control type="text" value={nurseName} readOnly />
              </Col>
              <Col>
                <Form.Label>Current Date and Time</Form.Label>
                <Form.Control type="text" value={`${date} ${time}`} readOnly />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Note to be updated</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={noteContent}
                    onChange={(e) =>
                      setInitialFormState((prevState) => ({
                        ...prevState,
                        noteContent: e.target.value,
                      }))
                    }
                    placeholder="Enter nursing note"
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

export default NursingNotes;