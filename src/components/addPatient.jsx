import React, { useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../pages/configs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 800px;
  }

  .modal-header {
    background-color: #007bff;
    color: #fff;
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .modal-header .close {
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const StyledModalTitle = styled(Modal.Title)`
  font-weight: bold;
  font-size: 1.25rem;
`;

const StyledButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledSubmitButton = styled(Button)`
  width: 200px;
`;

const AddPatientModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    preferredContact: "",
    primaryAddress: "",
    phoneNumber: "",
    secondaryPhoneNumber: "",
    governmentIssuedId: "",
    insuranceType: "",
    insuranceProvider: "",
    policyNumber: "",
    memberNumber: "",
    nationalId: "",
  });
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    dateOfBirth: Yup.date().required("Please enter your date of birth"),
    gender: Yup.string().required("Please select your gender"),
    preferredContact: Yup.string().required(
      "Please select your preferred contact"
    ),
    primaryAddress: Yup.string().required("Please enter your primary address"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    governmentIssuedId: Yup.string().required(
      "Please enter your government-issued ID"
    ),
    insuranceType: Yup.string().required("Please select your insurance type"),
    insuranceProvider: Yup.string().when("insuranceType", {
      is: "private",
      then: Yup.string().required("Please enter your insurance provider"),
    }),
    policyNumber: Yup.string().when("insuranceType", {
      is: "private",
      then: Yup.string().required("Please enter your policy number"),
    }),
    memberNumber: Yup.string().when("insuranceType", {
      is: "government",
      then: Yup.string().required("Please enter your member number"),
    }),
    nationalId: Yup.string().when("insuranceType", {
      is: "government",
      then: Yup.string().required("Please enter your national ID"),
    }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const patientsCollection = collection(db, "patients");
      const docRef = await addDoc(patientsCollection, formData);
      console.log("Patient document written with ID:", docRef.id);
      toast.success("Patient added successfully!");
      resetForm();
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Error during form submission. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      preferredContact: "",
      primaryAddress: "",
      phoneNumber: "",
      secondaryPhoneNumber: "",
      governmentIssuedId: "",
      insuranceType: "",
      insuranceProvider: "",
      policyNumber: "",
      memberNumber: "",
      nationalId: "",
    });
  };

  const saveToFirestore = async (data) => {
    try {
      const patientsCollection = collection(db, "patients");
      await addDoc(patientsCollection, data);
      console.log("Patient document written successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding patient. Please try again.");
    }
  };

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <StyledModalHeader closeButton>
        <StyledModalTitle>Add Patient</StyledModalTitle>
      </StyledModalHeader>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="preferredContact">
                <Form.Label>Preferred Contact</Form.Label>
                <Form.Control
                  as="select"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                >
                  <option value="">Select Preferred Contact</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="primaryAddress">
                <Form.Label>Primary Address</Form.Label>
                <Form.Control
                  type="text"
                  name="primaryAddress"
                  value={formData.primaryAddress}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="secondaryPhoneNumber">
                <Form.Label>Secondary Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="secondaryPhoneNumber"
                  value={formData.secondaryPhoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="governmentIssuedId">
                <Form.Label>Government-issued ID</Form.Label>
                <Form.Control
                  type="number"
                  name="governmentIssuedId"
                  value={formData.governmentIssuedId}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="insuranceType">
                <Form.Label>Insurance Type</Form.Label>
                <Form.Control
                  as="select"
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Insurance Type</option>
                  <option value="private">Private Insurance</option>
                  <option value="government">
                    Government Insurance (NHIF - Kenya)
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {formData.insuranceType === "private" && (
            <>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="insuranceProvider">
                    <Form.Label>Insurance Provider</Form.Label>
                    <Form.Control
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="policyNumber">
                    <Form.Label>Policy Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {formData.insuranceType === "government" && (
            <>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="memberNumber">
                    <Form.Label>NHIF Member Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="memberNumber"
                      value={formData.memberNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="nationalId">
                    <Form.Label>National ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          <StyledButtonRow>
            <StyledSubmitButton
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </StyledSubmitButton>
          </StyledButtonRow>
        </Form>
      </Modal.Body>
    </StyledModal>
  );
};

export default AddPatientModal;
