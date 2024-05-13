import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Form,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

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

const EmployeeModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validationSchema = Yup.object().shape({
    // Add your validation rules here
  });

  const validateFormWithYup = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (errors) {
      const firstErrorMessage = errors.inner[0].message;
      toast.error(`Please fix the following error: ${firstErrorMessage}`);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const isValidForm = await validateFormWithYup();

    if (!isValidForm) {
      setLoading(false);
      return;
    }

    try {
      // Handle form submission logic here
      console.log(formData);

      // Reset the form after successful submission
      setFormData(initialFormState);
      toast.success("Employee added successfully!");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Error during form submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Emergency Contact */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Emergency Contact
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Relationship"
                name="emergencyContactRelationship"
                value={formData.emergencyContactRelationship}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Employment Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Employment Information /
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hire Date"
                name="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="employment-status-label">
                  Employment Status
                </InputLabel>
                <Select
                  labelId="employment-status-label"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Employment Status</MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Supervisor"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Professional Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Professional Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Account Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Account Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Password field can be left blank as it will be auto-generated */}

            {/* Payroll Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Payroll Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="pay-schedule-label">Pay Schedule</InputLabel>
                <Select
                  labelId="pay-schedule-label"
                  name="paySchedule"
                  value={formData.paySchedule}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Pay Schedule</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bank Account Details"
                name="bankAccountDetails"
                value={formData.bankAccountDetails}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tax Information"
                name="taxInformation"
                value={formData.taxInformation}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Human Resources Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Human Resources Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Benefits Eligibility"
                name="benefitsEligibility"
                value={formData.benefitsEligibility}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vacation Accrual Rate"
                name="vacationAccrualRate"
                value={formData.vacationAccrualRate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sick Leave Accrual Rate"
                name="sickLeaveAccrualRate"
                value={formData.sickLeaveAccrualRate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Benefits Start Date"
                name="benefitsStartDate"
                type="date"
                value={formData.benefitsStartDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Resume"
                name="resume"
                type="file"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Other Documents"
                name="otherDocuments"
                type="file"
                multiple
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Role and Permissions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Role and Permissions
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {/* Add your roles here */}
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                  <MenuItem value="receptionist">Receptionist</MenuItem>
                  {/* ... */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Form.Control component="fieldset">
                <Form.Label component="legend">Permissions</Form.Label>
                <FormGroup>
                  {/* Add your permissions here */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="permissions"
                        value="viewPatientRecords"
                        checked={formData.permissions.includes(
                          "viewPatientRecords"
                        )}
                        onChange={handleInputChange}
                      />
                    }
                    label="View Patient Records"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="permissions"
                        value="prescribeMedication"
                        checked={formData.permissions.includes(
                          "prescribeMedication"
                        )}
                        onChange={handleInputChange}
                      />
                    }
                    label="Prescribe Medication"
                  />
                  {/* ... */}
                </FormGroup>
              </Form.Control>
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EmployeeModal;
