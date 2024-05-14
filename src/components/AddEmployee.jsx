import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
  // Personal Information
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  // Contact Information
  address: "",
  email: "",
  phoneNumber: "",
  // Emergency Contact
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
  // Employment Information
  employeeId: "", // This can be auto-generated
  jobTitle: "",
  department: "",
  hireDate: "",
  employmentStatus: "",
  // Professional Details
  qualifications: "",
  yearsOfExperience: "",
  specialization: "",
  // Account Information
  username: "",
  password: "", // This can be auto-generated
  // Payroll Information
  salary: "",
  paySchedule: "",
  bankAccountDetails: "",
  taxInformation: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  emergencyContactName: Yup.string().required(
    "Emergency contact name is required"
  ),
  emergencyContactRelationship: Yup.string().required(
    "Emergency contact relationship is required"
  ),
  emergencyContactPhone: Yup.string().required(
    "Emergency contact phone is required"
  ),
  jobTitle: Yup.string().required("Job title is required"),
  department: Yup.string().required("Department is required"),
  hireDate: Yup.date().required("Hire date is required"),
  employmentStatus: Yup.string().required("Employment status is required"),
  qualifications: Yup.string().required("Qualifications are required"),
  yearsOfExperience: Yup.number().required("Years of experience is required"),
  specialization: Yup.string().required("Specialization is required"),
  username: Yup.string().required("Username is required"),
  salary: Yup.number().required("Salary is required"),
  paySchedule: Yup.string().required("Pay schedule is required"),
  bankAccountDetails: Yup.string().required(
    "Bank account details are required"
  ),
  taxInformation: Yup.string().required("Tax information is required"),
});

const EmployeeModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setValidated(true);
        // Handle form submission logic here
        toast.success("New employee added successfully!");
        onHide();
      })
      .catch((errors) => {
        const errorMessages = errors.inner.map((error) => error.message);
        errorMessages.forEach((message) => {
          toast.error(message);
        });
      });
  };

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>New Employee Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                {/* Personal Information */}
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your first name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your last name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDateOfBirth" className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your date of birth.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formGender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select your gender.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                {/* Contact Information */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPhoneNumber" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                {/* Emergency Contact */}
                <Form.Group
                  controlId="formEmergencyContactName"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the emergency contact name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="formEmergencyContactRelationship"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Relationship</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the emergency contact relationship.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="formEmergencyContactPhone"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the emergency contact phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                {/* Employment Information */}
                <Form.Group controlId="formJobTitle" className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your job title.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDepartment" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your department.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formHireDate" className="mb-3">
                  <Form.Label>Hire Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your hire date.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmploymentStatus" className="mb-3">
                  <Form.Label>Employment Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your employment status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                {/* Professional Details */}
                <Form.Group controlId="formQualifications" className="mb-3">
                  <Form.Label>Qualifications</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your qualifications.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formYearsOfExperience" className="mb-3">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your years of experience.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSpecialization" className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your specialization.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                {/* Payroll Information */}
                <Form.Group controlId="formSalary" className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your salary.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBankAccountDetails" className="mb-3">
                  <Form.Label>Bank Account Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankAccountDetails"
                    value={formData.bankAccountDetails}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your bank account details.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTaxInformation" className="mb-3">
                  <Form.Label>Tax Information</Form.Label>
                  <Form.Control
                    type="text"
                    name="taxInformation"
                    value={formData.taxInformation}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your tax information.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                {/* Additional Information */}
                <Form.Group controlId="formResume" className="mb-3">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={(e) =>
                      setFormData({ ...formData, resume: e.target.files[0] })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formOtherDocuments" className="mb-3">
                  <Form.Label>Other Documents</Form.Label>
                  <Form.Control
                    type="file"
                    name="otherDocuments"
                    multiple
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        otherDocuments: Array.from(e.target.files),
                      })
                    }
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
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EmployeeModal;
