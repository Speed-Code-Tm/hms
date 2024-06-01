import React from 'react';
import { Container, Row, Col, Nav, Tab, Table } from 'react-bootstrap';

const PatientEHR = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          {/* Patient Profile Section */}
          <div>
            <img src="profile.jpg" alt="Profile" className="rounded-circle mb-3" />
            <h4>John Doe</h4>
            <p>Date of Birth: 01/01/1990</p>
            <p>Gender: Male</p>
            <p>Address: 123 Main St, Anytown USA</p>
          </div>
        </Col>
        <Col md={8}>
          {/* Tabs Section */}
          <Tab.Container defaultActiveKey="general">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="general">General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="family">Family</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="consults">Consults</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages">Messages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tests">Tests</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                {/* General Information */}
                <p>Allergies: Peanuts, Shellfish</p>
                <p>Medical Conditions: Asthma, High Blood Pressure</p>
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                {/* Orders/Prescriptions */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Refill Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lisinopril</td>
                      <td>10 mg</td>
                      <td>Once Daily</td>
                      <td>Refill Due</td>
                    </tr>
                    {/* Add more rows for other medications */}
                  </tbody>
                </Table>
              </Tab.Pane>
              {/* Add more Tab.Pane components for other tabs */}
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientEHR;