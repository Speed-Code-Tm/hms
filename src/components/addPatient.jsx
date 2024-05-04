import React, { useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../pages/configs"; // Import your Firebase configuration

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const db = getFirestore(app); // Get Firestore instance

const StyledModal = styled(Modal)`

  .modal-dialog{
    max-width:800px;
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

const StyledBackButton = styled(Button)`
  width: 100px;
`;

const AddPatientModal = ({ show, onHide }) => {
  const [formStep, setFormStep] = useState(1);
  const initialFormData = {
    personalInfo: {
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
    },
    insuranceType: "",
    insuranceProvider: "",
    policyNumber: "",
    memberNumber: "",
    nationalId: "",
    hospitalVisits: {},
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const validationSchemaStep1 = Yup.object().shape({
    personalInfo: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      dateOfBirth: Yup.date().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
      preferredContact: Yup.string().required("Preferred contact is required"),
      primaryAddress: Yup.string().required("Primary address is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      governmentIssuedId: Yup.string().required(
        "Government-issued ID is required"
      ),
    }),
  });

  const validationSchemaStep2 = Yup.object().shape({
    insuranceType: Yup.string().required("Insurance type is required"),
    insuranceProvider: Yup.string().when("insuranceType", {
      is: (type) => type === "private",
      then: Yup.string().required("Insurance provider is required"),
    }),
    policyNumber: Yup.string().when("insuranceType", {
      is: (type) => type === "private",
      then: Yup.string().required("Policy number is required"),
    }),
    memberNumber: Yup.string().when("insuranceType", {
      is: (type) => type === "government",
      then: Yup.string().required("Member number is required"),
    }),
    nationalId: Yup.string().when("insuranceType", {
      is: (type) => type === "government",
      then: Yup.string().required("National ID is required"),
    }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "insuranceType" ||
      name === "insuranceProvider" ||
      name === "policyNumber" ||
      name === "memberNumber" ||
      name === "nationalId"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        personalInfo: {
          ...prevData.personalInfo,
          [name]: value,
        },
      }));
    }
  };

  const validateFormStep = async () => {
    try {
      if (formStep === 1) {
        await validationSchemaStep1.validate(formData, { abortEarly: false });
      } else {
        await validationSchemaStep2.validate(formData, { abortEarly: false });
      }
      return true;
    } catch (errors) {
      console.log(errors);
      if (errors.inner && errors.inner.length > 0) {
        const firstErrorMessage = errors.inner[0].message;
        toast.error(`Please fix the following error: ${firstErrorMessage}`);
      } else {
        console.error("Validation error:", errors);
        toast.error(
          "An unknown validation error occurred. Please check the form data."
        );
      }
      return false;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validateFormStep();
    if (isValid) {
      setFormStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValidForm = await validateFormStep();
    if (!isValidForm) {
      setLoading(false);
      return;
    }

    try {
      await saveToFirestore(formData);
      toast.success("Patient added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Error during form submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormStep(1);
  };

  const saveToFirestore = async (data) => {
    try {
      const patientsCollection = collection(db, "patients");
      const newPatientRef = doc(patientsCollection);
      const newPatientId = newPatientRef.id;

      const patientData = {
        [newPatientId]: {
          personalInfo: {
            ...data.personalInfo,
            insuranceType: data.insuranceType,
            insuranceProvider: data.insuranceProvider,
            policyNumber: data.policyNumber,
            memberNumber: data.memberNumber,
            nationalId: data.nationalId,
          },
          hospitalVisits: {},
        },
      };

      await setDoc(newPatientRef, patientData);
      console.log("Patient document written with ID: ", newPatientId);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const renderFormStep = () => {
    if (formStep === 1) {
      return (
        <>
          <Row >
            <Col md={6} className="mb-3">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}className="mb-3" >
              <Form.Group controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.personalInfo.middleName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}className="mb-3" >
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3" >
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.personalInfo.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="preferredContact">
                <Form.Label>Preferred Contact</Form.Label>
                <Form.Control
                  as="select"
                  name="preferredContact"
                  value={formData.personalInfo.preferredContact}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Preferred Contact</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3" >
              <Form.Group controlId="primaryAddress">
                <Form.Label>Primary Address</Form.Label>
                <Form.Control
                  type="text"
                  name="primaryAddress"
                  value={formData.personalInfo.primaryAddress}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.personalInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="secondaryPhoneNumber">
                <Form.Label>Secondary Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="secondaryPhoneNumber"
                  value={formData.personalInfo.secondaryPhoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="governmentIssuedId">
                <Form.Label>Government-issued ID</Form.Label>
                <Form.Control
                  type="number"
                  name="governmentIssuedId"
                  value={formData.personalInfo.governmentIssuedId}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="insuranceType">
                <Form.Label>Insurance Type</Form.Label>
                <Form.Control
                  as="select"
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Insurance Type</option>
                  <option value="private">Private Insurance</option>
                  <option value="government">
                    Government Insurance (NHIF - Kenya)
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>

            {formData.insuranceType === "private" ? <>


<Col md={6} className="mb-3" >
             
             <Form.Group controlId="insuranceProvider">
               <Form.Label>Insurance Provider</Form.Label>
               <Form.Control
                 type="text"
                 name="insuranceProvider"
                 value={formData.insuranceProvider}
                 onChange={handleInputChange}
                 required
               />
             </Form.Group>
         
         </Col>

         <Col md={6} className="mb-3" >
             
             <Form.Group controlId="policyNumber">
               <Form.Label>Policy Number</Form.Label>
               <Form.Control
                 type="text"
                 name="policyNumber"
                 value={formData.policyNumber}
                 onChange={handleInputChange}
                 required
               />
             </Form.Group>
          
         </Col>
            </>:formData.insuranceType === "government" ?
            <>
              <Col md={6} className="mb-3">
            
                <Form.Group controlId="memberNumber">
                  <Form.Label>NHIF Member Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="memberNumber"
                    value={formData.memberNumber}
                    onChange={handleInputChange}
                    required
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
                    required
                  />
                </Form.Group>
             
            </Col>
            </>:<></>}
           
          </Row>
        </>
      );
    }
  };

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <StyledModalHeader closeButton>
        <StyledModalTitle>
          {formStep === 1 ? "Add Patient (Step 1)" : "Add Patient (Step 2)"}
        </StyledModalTitle>
      </StyledModalHeader>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {renderFormStep()}

          <StyledButtonRow>
            {formStep === 2 && (
              <StyledBackButton
                variant="outline-primary"
                onClick={() => setFormStep(1)}
                disabled={loading}
              >
                Back
              </StyledBackButton>
            )}
            {formStep === 1 && (
              <Button
                variant="primary"
                onClick={handleNextStep}
                disabled={loading}
              >
                Next
              </Button>
            )}
            {formStep === 2 && (
              <StyledSubmitButton
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </StyledSubmitButton>
            )}
          </StyledButtonRow>
        </Form>
      </Modal.Body>
    </StyledModal>
  );
};

export default AddPatientModal;
