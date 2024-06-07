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
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderMedicine = ({ show, onHide, patientName, loggedInUser }) => {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [nurseName, setNurseName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set dummy medicine options
        const dummyOptions = [
          { id: 1, name: "Paracetamol" },
          { id: 2, name: "Ibuprofen" },
          { id: 3, name: "Aspirin" },
          { id: 4, name: "Vitamin C" },
          { id: 5, name: "Calcium Supplements" },
          { id: 6, name: "I.V. Giving Set (Adult) G21" },
          { id: 7, name: "Syringes Disposable 10ml" },
          { id: 8, name: "Needles Disposable G23" },
        ];
        setMedicineOptions(dummyOptions);

        // Set nurse name from logged-in user or default value
        setNurseName(loggedInUser || "Default Nurse");

        // Set current date and time
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        setCurrentDate(currentDate);
        setCurrentTime(currentTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedInUser]);

  const handleMedicineSelect = (event, value) => {
    if (value) {
      setOrders((prevOrders) => [
        ...prevOrders,
        { name: value.name, quantity: 1 },
      ]);
    }
  };

  const handleQuantityIncrease = (index) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].quantity += 1;
      return updatedOrders;
    });
  };

  const handleQuantityDecrease = (index) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      if (updatedOrders[index].quantity > 1) {
        updatedOrders[index].quantity -= 1;
      }
      return updatedOrders;
    });
  };

  const handleOrderRemove = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Input validation using Yup
    const validationSchema = Yup.object().shape({
      orders: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Name is required"),
            quantity: Yup.number()
              .required("Quantity is required")
              .positive("Quantity must be positive"),
          })
        )
        .min(1, "At least one order is required"),
    });

    try {
      await validationSchema.validate({ orders }, { abortEarly: false });
    } catch (error) {
      error.inner.forEach((err) => {
        toast.error(err.message, {
          key: Math.random().toString(),
        });
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate submission delay
      //await new Promise((resolve) => setTimeout(resolve, 2000));

      // Implement submission logic here
      

      // Show success toast
      toast.success("Orders submitted successfully!", {});

      // Reset form fields and close the modal after successful submission
      setOrders([]);
      onHide();
    } catch (error) {
      toast.error("An error occurred while submitting the orders.", {});
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalItems = () => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{patientName}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-3">
            <Col>
              <Form.Label>Ordering Nurse</Form.Label>
              <Form.Control type="text" value={nurseName} readOnly />
            </Col>
            <Col>
              <Form.Label>Current Date and Time</Form.Label>
              <Form.Control
                type="text"
                value={`${currentDate} ${currentTime}`}
                readOnly
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Search for Medicine/Item</Form.Label>
                <Autocomplete
                  options={medicineOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleMedicineSelect}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ListGroup>
                {orders.map((order, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="body1">{order.name}</Typography>
                      <Box display="flex" alignItems="center">
                        <RemoveIcon
                          onClick={() => handleQuantityDecrease(index)}
                          style={{ cursor: "pointer" }}
                        />
                        <Badge pill bg="primary" className="mx-2">
                          {order.quantity}
                        </Badge>
                        <AddIcon
                          onClick={() => handleQuantityIncrease(index)}
                          style={{ cursor: "pointer" }}
                        />
                        <CloseIcon
                          onClick={() => handleOrderRemove(index)}
                          style={{
                            cursor: "pointer",
                            marginLeft: "0.5rem",
                            color: "red",
                          }}
                        />
                      </Box>
                    </Box>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography variant="body1"fontWeight="bold" fontSize="1.2em">
              Total Items: {getTotalItems()}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="secondary"
              onClick={onHide}
              style={{ marginRight: "0.5rem" }}
            >
              Close
            </Button>
           
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderMedicine;