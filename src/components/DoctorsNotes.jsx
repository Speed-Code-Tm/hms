import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  presentingSymptoms: "",
  allergies: "",
  currentMedications: "",
  primaryDiagnosis: "",
  secondaryDiagnosis: "",
  treatmentPlan: "",
  notes: "",
  followUpObservations: "",
};

const DoctorsNotes = ({ show, onHide }) => {
  const [formData, setFormData] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const {
      presentingSymptoms,
      allergies,
      currentMedications,
      primaryDiagnosis,
      treatmentPlan,
    } = formData;

    if (!presentingSymptoms.trim()) {
      toast.error("Please enter presenting symptoms.");
      return false;
    }

    if (!allergies.trim()) {
      toast.error("Please enter allergies.");
      return false;
    }

    if (!currentMedications.trim()) {
      toast.error("Please enter current medications.");
      return false;
    }

    if (!primaryDiagnosis.trim()) {
      toast.error("Please enter primary diagnosis.");
      return false;
    }

    if (!treatmentPlan.trim()) {
      toast.error("Please enter treatment plan.");
      return false;
    }

    return true;
  };

  const submit = () => {
    if (validate()) {
      setIsSubmitting(true);
      // Simulate an API call with a timeout
      setTimeout(() => {
        
        toast.success("Form submitted successfully!");
        setIsSubmitting(false);
        setFormData(initialValues);
        onHide();
      }, 1000);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Doctor's Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="presentingSymptoms">
                  <Form.Label>Presenting Symptoms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="presentingSymptoms"
                    value={formData.presentingSymptoms}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="allergies">
                  <Form.Label>Allergies</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="currentMedications">
                  <Form.Label>Current Medications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="primaryDiagnosis">
                  <Form.Label>Primary Diagnosis</Form.Label>
                  <Form.Control
                    type="text"
                    name="primaryDiagnosis"
                    value={formData.primaryDiagnosis}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="secondaryDiagnosis">
                  <Form.Label>Secondary Diagnosis</Form.Label>
                  <Form.Control
                    type="text"
                    name="secondaryDiagnosis"
                    value={formData.secondaryDiagnosis}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="treatmentPlan">
                  <Form.Label>Treatment Plan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="treatmentPlan"
                    value={formData.treatmentPlan}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="followUpObservations">
                  <Form.Label>Follow Up Observations</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="followUpObservations"
                    value={formData.followUpObservations}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorsNotes;