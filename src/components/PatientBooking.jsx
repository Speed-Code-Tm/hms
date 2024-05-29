import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import { Autocomplete, TextField, Box, Typography, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";

const mockServices = [
  { id: 1, name: "Cardiology Consultation", price: 100 },
  { id: 2, name: "X-Ray", price: 80 },
  { id: 3, name: "Blood Test", price: 50 },
  { id: 4, name: "Physical Therapy", price: 120 },
  { id: 5, name: "Orthopedic Surgery", price: 5000 },
];

const InsuranceModal = ({ show, onHide, onSave, insuranceInfo }) => {
  const [insuranceData, setInsuranceData] = useState(insuranceInfo);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInsuranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(insuranceData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Insurance Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="insuranceProvider">
            <Form.Label>Insurance Provider</Form.Label>
            <Form.Control
              type="text"
              name="provider"
              value={insuranceData.provider}
              onChange={handleInputChange}
              placeholder="Enter insurance provider"
            />
          </Form.Group>
          <Form.Group controlId="policyNumber" className="mt-3">
            <Form.Label>Policy Number</Form.Label>
            <Form.Control
              type="text"
              name="policyNumber"
              value={insuranceData.policyNumber}
              onChange={handleInputChange}
              placeholder="Enter policy number"
            />
          </Form.Group>
          <Form.Group controlId="nhif" className="mt-3">
            <Form.Check
              type="radio"
              label="NHIF (Government)"
              name="insuranceType"
              value="nhif"
              checked={insuranceData.insuranceType === "nhif"}
              onChange={handleInputChange}
            />
            {insuranceData.insuranceType === "nhif" && (
              <div className="mt-2">
                <Form.Group controlId="memberNumber">
                  <Form.Label>Member Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="memberNumber"
                    value={insuranceData.memberNumber}
                    onChange={handleInputChange}
                    placeholder="Enter member number"
                  />
                </Form.Group>
                <Form.Group controlId="nationalId" className="mt-2">
                  <Form.Label>National ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationalId"
                    value={insuranceData.nationalId}
                    onChange={handleInputChange}
                    placeholder="Enter national ID"
                  />
                </Form.Group>
              </div>
            )}
            <Form.Check
              type="radio"
              label="Private Health Insurance"
              name="insuranceType"
              value="private"
              checked={insuranceData.insuranceType === "private"}
              onChange={handleInputChange}
              className="mt-2"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BookingModal = ({ show, onHide, patientInsuranceInfo }) => {
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [options, setOptions] = useState([]);
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [formData, setFormData] = useState({
    purpose: "",
    specialist: "",
    paymentMethod: "",
  });
  const [insuranceInfo, setInsuranceInfo] = useState(patientInsuranceInfo);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  useEffect(() => {
    setOptions(
      mockServices.map((service) => ({
        value: service.name,
        label: service.name,
      }))
    );
  }, []);

  const handleBooking = (event) => {
    event.preventDefault();
    onHide(formData);
    setServices([]);
    setTotalCost(0);
    setFormData({
      purpose: "",
      specialist: "",
      paymentMethod: "",
    });
  };

  const handleServiceSelect = (event, newValue) => {
    const selectedService = mockServices.find((service) => service.name === newValue);
    if (selectedService) {
      setServices((prevServices) => [...prevServices, { ...selectedService, quantity: 1 }]);
      setTotalCost((prevTotalCost) => prevTotalCost + selectedService.price);
    }
  };

  const handleServiceQuantityChange = (service, quantity) => {
    setServices((prevServices) =>
      prevServices.map((item) =>
        item === service ? { ...item, quantity: quantity } : item
      )
    );
    setTotalCost((prevTotalCost) =>
      prevTotalCost - service.price * service.quantity + service.price * quantity
    );
  };

  const handleServiceRemove = (service) => {
    setServices((prevServices) => prevServices.filter((item) => item !== service));
    setTotalCost((prevTotalCost) => prevTotalCost - service.price * service.quantity);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInsuranceSave = (updatedInfo) => {
    setInsuranceInfo(updatedInfo);
  };

  const getTotalItems = () => {
    return services.reduce((total, service) => total + service.quantity, 0);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-4 justify-content-center">
              <Col xs="auto">
                <CalendarTodayIcon fontSize="large" />
                <DatePicker
                  selected={preferredDate}
                  onChange={(date) => setPreferredDate(date)}
                  className="form-control text-center"
                  dateFormat="yyyy/MM/dd"
                />
              </Col>
            </Row>
            <Form onSubmit={handleBooking}>
              <Form.Group controlId="services" className="mb-3">
                <Form.Label>Services</Form.Label>
                <Autocomplete
                  options={options}
                  onInputChange={(event, value) => handleServiceSelect(null, value)}
                  renderInput={(params) => <TextField {...params} label="Search for a service" variant="outlined" />}
                />
                <ListGroup className="mt-2">
                  {services.map((service) => (
                    <ListGroup.Item key={service.id} className="d-flex justify-content-between align-items-center">
                      <span>{service.name}</span>
                      <span className="d-flex align-items-center">
                        <IconButton size="small" onClick={() => handleServiceQuantityChange(service, service.quantity - 1)} disabled={service.quantity <= 1}>
                          <RemoveIcon />
                        </IconButton>
                        <Badge pill bg="primary" className="mx-2">
                          {service.quantity}
                        </Badge>
                        <IconButton size="small" onClick={() => handleServiceQuantityChange(service, service.quantity + 1)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleServiceRemove(service)} style={{ color: "red" }}>
                          <CloseIcon />
                        </IconButton>
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Form.Group>

              <Form.Group controlId="insuranceInfo" className="mb-3">
                <Form.Label>Insurance Information</Form.Label>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{insuranceInfo.provider}</span>
                  <IconButton size="small" onClick={() => setShowInsuranceModal(true)}>
                    <EditIcon />
                  </IconButton>
                </div>
              </Form.Group>

              <Form.Group controlId="purpose" className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.purpose}
                  name="purpose"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="specialist" className="mb-3">
                <Form.Label>Preferred Specialist</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.specialist}
                  name="specialist"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="paymentMethod" className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.paymentMethod}
                  name="paymentMethod"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography variant="h6">Total Items: {getTotalItems()}</Typography>
                <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
              </div>
              <Button variant="primary" type="submit" className="w-100">
                Book Appointment
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} style={{ float: "right" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <InsuranceModal
        show={showInsuranceModal}
        onHide={() => setShowInsuranceModal(false)}
        onSave={handleInsuranceSave}
        insuranceInfo={insuranceInfo}
      />
    </>
  );
};

export default BookingModal;
