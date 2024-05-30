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
  Nav,
  Tab,
} from "react-bootstrap";
import { Autocomplete, TextField,Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
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
  const [activeTab, setActiveTab] = useState("nhif");

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

  useEffect(() => {
    setInsuranceData(insuranceInfo);
  }, [insuranceInfo]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Insurance Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <Nav variant="pills" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="nhif">NHIF</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="private">Private Insurance</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="nhif">
              <Form>
                <Form.Group controlId="insuranceProvider">
                  <Form.Label>Insurance Provider</Form.Label>
                  <Form.Control
                    type="text"
                    name="provider"
                    value="NHIF"
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="memberNumber" className="mt-3">
                  <Form.Label>Member Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="memberNumber"
                    value={insuranceData.memberNumber}
                    onChange={handleInputChange}
                    placeholder="Enter member number"
                  />
                </Form.Group>
                <Form.Group controlId="nationalId" className="mt-3">
                  <Form.Label>National ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationalId"
                    value={insuranceData.nationalId}
                    onChange={handleInputChange}
                    placeholder="Enter national ID"
                  />
                </Form.Group>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="private">
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
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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

const BookingModal = ({ show, onHide, patientInsuranceInfo = {} }) => {
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [options, setOptions] = useState([]);
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [formData, setFormData] = useState({
    purpose: "",
    specialist: "",
    paymentMethod: "cash",
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
      paymentMethod: "cash",
    });
  };

  const handleServiceSelect = (event, newValue) => {
    const selectedService = mockServices.find(
      (service) => service.name === newValue
    );
    if (selectedService) {
      setServices((prevServices) => [
        ...prevServices,
        { ...selectedService, quantity: 1 },
      ]);
      setTotalCost((prevTotalCost) => prevTotalCost + selectedService.price);
    }
  };

  const handleServiceQuantityChange = (service, quantity) => {
    setServices((prevServices) =>
      prevServices.map((item) =>
        item === service ? { ...item, quantity: quantity } : item
      )
    );
    setTotalCost(
      (prevTotalCost) =>
        prevTotalCost -
        service.price * service.quantity +
        service.price * quantity
    );
  };

  const handleServiceRemove = (service) => {
    setServices((prevServices) =>
      prevServices.filter((item) => item !== service)
    );
    setTotalCost(
      (prevTotalCost) => prevTotalCost - service.price * service.quantity
    );
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
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-4 justify-content-center">
              <Col xs="auto">
                <Form.Group controlId="preferredDate">
                  {/* <Form.Label>Preferred Date</Form.Label> */}
                  <Form.Control
                    type="date"
                    value={preferredDate.toISOString().split("T")[0]}
                    onChange={(e) => setPreferredDate(new Date(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form onSubmit={handleBooking}>
              <Form.Group controlId="services" className="mb-3">
                <Form.Label>Services</Form.Label>
                <Autocomplete
                  options={options}
                  onInputChange={(event, value) =>
                    handleServiceSelect(null, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a service"
                      variant="outlined"
                    />
                  )}
                />
                <ListGroup className="mt-2">
                  {services.map((service) => (
                    <ListGroup.Item
                      key={service.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{service.name}</span>
                      <span className="d-flex align-items-center">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleServiceQuantityChange(
                              service,
                              service.quantity - 1
                            )
                          }
                          disabled={service.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Badge pill bg="primary" className="mx-2">
                          {service.quantity}
                        </Badge>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleServiceQuantityChange(
                              service,
                              service.quantity + 1
                            )
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleServiceRemove(service)}
                          style={{ color: "red" }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
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
                <Form.Select
                  value={formData.paymentMethod}
                  name="paymentMethod"
                  onChange={handleInputChange}
                >
                  <option value="cash">Cash</option>
                  <option value="insurance">Insurance</option>
                </Form.Select>
              </Form.Group>

              {formData.paymentMethod === "insurance" && (
                <Form.Group controlId="insuranceInfo" className="mb-3">
                  <Form.Label>Insurance Information</Form.Label>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Provider: {insuranceInfo.provider}</span>
                    <IconButton
                      size="small"
                      onClick={() => setShowInsuranceModal(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </Form.Group>
              )}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography variant="h6">
                  Total Items: {getTotalItems()}
                </Typography>
                <Typography variant="h6">
                  Total Cost: ${totalCost.toFixed(2)}
                </Typography>
              </div>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Book Appointment
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
