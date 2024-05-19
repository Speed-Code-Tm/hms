import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container, Nav } from 'react-bootstrap';

const HospitalRegistrationForm = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState('');
  const [customerCareNumber, setCustomerCareNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const [activeTab, setActiveTab] = useState('basicInfo');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="box8 p-4" style={{ maxWidth: '1400px' }}>
        <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Hospital Registration</h2>
          <Nav variant="pills" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            <Nav.Item>
              <Nav.Link eventKey="basicInfo" className={`${activeTab === 'basicInfo' ? 'active' : ''} rounded-pill px-4`}>
                Basic Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="services" className={`${activeTab === 'services' ? 'active' : ''} rounded-pill px-4`}>
                Services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientInfo" className={`${activeTab === 'patientInfo' ? 'active' : ''} rounded-pill px-4`}>
                Patient Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="itAdmin" className={`${activeTab === 'itAdmin' ? 'active' : ''} rounded-pill px-4`}>
                IT Admin
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <div className={`tab-content ${activeTab === 'basicInfo' ? 'active' : ''}`}>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="hospitalName">
                    <Form.Label>Hospital Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter hospital name"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter hospital address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="hospitalPhoneNumber">
                    <Form.Label>Hospital Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter hospital phone number"
                      value={hospitalPhoneNumber}
                      onChange={(e) => setHospitalPhoneNumber(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="customerCareNumber">
                    <Form.Label>Customer Care Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter customer care number"
                      value={customerCareNumber}
                      onChange={(e) => setCustomerCareNumber(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="emailAddress">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="websiteURL">
                    <Form.Label>Website URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter website URL"
                      value={websiteURL}
                      onChange={(e) => setWebsiteURL(e.target.value)}
                      size="lg"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="hospitalLogo">
                    <Form.Label>Hospital Logo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setHospitalLogo(e.target.files[0])}
                      size="lg"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary" size="lg">
                  Next
                </Button>
              </div>
            </Form>
          </div>
          <div className={`tab-content ${activeTab === 'services' ? 'active' : ''}`}>
            {/* Add services-related form fields here */}
          </div>
          <div className={`tab-content ${activeTab === 'patientInfo' ? 'active' : ''}`}>
            {/* Add patient-facing information form fields here */}
          </div>
          <div className={`tab-content ${activeTab === 'itAdmin' ? 'active' : ''}`}>
            {/* Add IT administration form fields here */}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HospitalRegistrationForm;