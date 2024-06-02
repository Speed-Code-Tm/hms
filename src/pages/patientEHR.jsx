import React from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import avatar from '../components/logo.svg';
import { Avatar } from '@mui/material';

const PatientEHR = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={9}>
          <Row className="mb-3">
            <Col md={3}>
              <Avatar src={avatar} alt="Avatar" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
            </Col>
            <Col md={9}>
              <h3>Peter Viceall</h3>
              <p>
                Gender: Male
                <br />
                Age: 35
                <br />
                Address: 123 Main St, Los Angeles, CA
              </p>
            </Col>
          </Row>
          <Tab.Container defaultActiveKey="prescriptions">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="prescriptions">Prescriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="allergies">Allergies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="conditions">Conditions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="immunizations">Immunizations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notes">Notes</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="prescriptions">
                <Row>
                  <Col md={6}>
                    <h5>Active Drugs</h5>
                    <ul className="list-unstyled">
                      <li>
                        <i className="bi bi-capsule-pill me-2" /> Drug 1 (Dosage)
                      </li>
                      <li>
                        <i className="bi bi-capsule-pill me-2" /> Drug 2 (Dosage)
                      </li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h5>Used Drugs</h5>
                    <ul className="list-unstyled">
                      <li>
                        <i className="bi bi-capsule-pill me-2" /> Drug 3 (Dosage)
                      </li>
                      <li>
                        <i className="bi bi-capsule-pill me-2" /> Drug 4 (Dosage)
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Tab.Pane>
              {/* Add content for other tabs */}
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientEHR;