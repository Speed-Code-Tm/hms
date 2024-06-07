import React, { useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../pages/configs";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddPatientModal = ({ show, onHide }) => {
  const initialForm = {
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
  };
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    preferredContact: Yup.string().required("Preferred Contact is required"),
    primaryAddress: Yup.string().required("Primary Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    governmentIssuedId: Yup.string().required(
      "Government-issued ID is required"
    ),
    insuranceType: Yup.string().required("Insurance Type is required"),
    insuranceProvider: Yup.string().when("insuranceType", {
      is: "private",
      then: Yup.string().required("Insurance Provider is required"),
    }),
    policyNumber: Yup.string().when("insuranceType", {
      is: "private",
      then: Yup.string().required("Policy Number is required"),
    }),
    memberNumber: Yup.string().when("insuranceType", {
      is: "government",
      then: Yup.string().required("Member Number is required"),
    }),
    nationalId: Yup.string().when("insuranceType", {
      is: "government",
      then: Yup.string().required("National ID is required"),
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
      await saveToFirestore(formData);
      toast.success("Patient added successfully!");
      resetForm();
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(
          "An error occurred during form submission. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...initialForm });
  };

  const saveToFirestore = async (data) => {
    try {
      const patientsCollection = collection(db, "patients");
      await addDoc(patientsCollection, data);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error(
        "An error occurred while saving the patient data. Please try again."
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered   >
      <Modal.Header closeButton>
        <Modal.Title>Add Patient</Modal.Title>
      </Modal.Header>
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                      required
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
                      required
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
              </Row>
            </>
          )}
          <div className="text-end mt-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatientModal;
