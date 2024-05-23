import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import * as Yup from "yup"; // Import Yup for validation
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify"; // Import for toasts
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import logo from "../components/logo.svg";
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
  
      setTimeout(() => {
        toast.success("Login successful!");
        setIsLoading(false);
        onLogin();
        navigate('/dashboard'); // Navigate to the dashboard route
      }, 2000);
    } catch (error) {
      // ...
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#F6F9FF" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}
      >
        <Card.Header
          className="text-center rounded-top"
          style={{ backgroundColor: "transparent" }}
        >
          <Image
            src={logo}
            alt="Logo"
            fluid
            rounded
            style={{ width: "500px", height: "200px" }}
          />
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="email">
                  <Form.Label>
                    <FaEnvelope
                      className="mr-2 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    />
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="password">
                  <Form.Label>
                    <FaLock
                      className="mr-2 text-danger"
                      style={{ fontSize: "1.5rem" }}
                    />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? ( // Show loading spinner when loading
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
