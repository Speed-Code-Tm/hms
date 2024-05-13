import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
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
  supervisor: "",
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
  // Human Resources Information
  benefitsEligibility: "",
  vacationAccrualRate: "",
  sickLeaveAccrualRate: "",
  benefitsStartDate: "",
  // Additional Information
  resume: null,
  otherDocuments: [],
  // Role and Permissions
  role: "",
  permissions: [],
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
  supervisor: Yup.string().required("Supervisor is required"),
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
  benefitsEligibility: Yup.string().required(
    "Benefits eligibility is required"
  ),
  vacationAccrualRate: Yup.number().required(
    "Vacation accrual rate is required"
  ),
  sickLeaveAccrualRate: Yup.number().required(
    "Sick leave accrual rate is required"
  ),
  benefitsStartDate: Yup.date().required("Benefits start date is required"),
  role: Yup.string().required("Role is required"),
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

  return (
    <>
      <Modal show={show} onHide={onHide} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>New Employee Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Form.Group controlId="formFirstName">
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

            <Form.Group controlId="formLastName">
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

            <Form.Group controlId="formDateOfBirth">
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

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your gender.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Contact Information */}
            <Form.Group controlId="formAddress">
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

            <Form.Group controlId="formEmail">
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

            <Form.Group controlId="formPhoneNumber">
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
            {/* Emergency Contact */}
            <Form.Group controlId="formEmergencyContactName">
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

            <Form.Group controlId="formEmergencyContactRelationship">
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

            <Form.Group controlId="formEmergencyContactPhone">
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

            {/* Employment Information */}
            <Form.Group controlId="formJobTitle">
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

            <Form.Group controlId="formDepartment">
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

            <Form.Group controlId="formHireDate">
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

            <Form.Group controlId="formEmploymentStatus">
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

            <Form.Group controlId="formSupervisor">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your supervisor's name.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Professional Details */}
            <Form.Group controlId="formQualifications">
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

            <Form.Group controlId="formYearsOfExperience">
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

            <Form.Group controlId="formSpecialization">
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

            {/* Account Information */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a username.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Payroll Information */}
            <Form.Group controlId="formSalary">
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

            <Form.Group controlId="formPaySchedule">
              <Form.Label>Pay Schedule</Form.Label>
              <Form.Control
                type="text"
                name="paySchedule"
                value={formData.paySchedule}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your pay schedule.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBankAccountDetails">
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

            <Form.Group controlId="formTaxInformation">
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

            {/* Human Resources Information */}
            <Form.Group controlId="formBenefitsEligibility">
              <Form.Label>Benefits Eligibility</Form.Label>
              <Form.Control
                type="text"
                name="benefitsEligibility"
                value={formData.benefitsEligibility}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your benefits eligibility.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formVacationAccrualRate">
              <Form.Label>Vacation Accrual Rate</Form.Label>
              <Form.Control
                type="number"
                name="vacationAccrualRate"
                value={formData.vacationAccrualRate}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your vacation accrual rate.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSickLeaveAccrualRate">
              <Form.Label>Sick Leave Accrual Rate</Form.Label>
              <Form.Control
                type="number"
                name="sickLeaveAccrualRate"
                value={formData.sickLeaveAccrualRate}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your sick leave accrual rate.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBenefitsStartDate">
              <Form.Label>Benefits Start Date</Form.Label>
              <Form.Control
                type="date"
                name="benefitsStartDate"
                value={formData.benefitsStartDate}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your benefits start date.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Additional Information */}
            <Form.Group controlId="formResume">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                name="resume"
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.files[0] })
                }
              />
            </Form.Group>

            <Form.Group controlId="formOtherDocuments">
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

            {/* Role and Permissions */}
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your role.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPermissions">
              <Form.Label>Permissions</Form.Label>
              <Form.Control
                type="text"
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your permissions.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeModal;
