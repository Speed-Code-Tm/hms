import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaUserCircle, FaHistory, FaPills, FaFileAlt, FaClipboardCheck, FaMoneyBillAlt, FaStickyNote } from 'react-icons/fa';
import avatar from '../components/logo.svg';
import { Avatar } from '@mui/material';

const PatientEHR = () => {
  const admissionDate = '2023-05-15';
  const insuranceNumber = 'ABC123456789';
  const patientId = '12345';
  const daysInHospital = 7;
  const visits = [
    { date: '2023-04-01', reason: 'Annual Check-up', type: 'Outpatient' },
    { date: '2023-03-15', reason: 'Flu Symptoms', type: 'Inpatient' },
    { date: '2023-02-20', reason: 'Follow-up', type: 'Outpatient' },
  ];
  const primaryDiagnosis = 'Hypertension';
  const secondaryDiagnosis = 'Type 2 Diabetes';
  const testsPerformed = ['Blood test', 'X-ray', 'CT Scan'];
  const dischargeCondition = 'Stable';
  const [selectedVisit, setSelectedVisit] = useState(null);

  return (
    <Container fluid className="my-5">
      <Row>
        <Col md={12}>
          <Card className="shadow-lg rounded">
            <Card.Header className="bg-light text-dark">
              <h2 className="text-center">Patient Electronic Health Record</h2>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3 align-items-center">
                <Col md={3} className="text-center mb-3 mb-md-0">
                  <Avatar src={avatar} alt="Avatar" style={{ width: '150px', height: '150px' }} />
                  <h3 className="mt-3 text-primary">Peter Viceall</h3>
                  <div className="mt-3">
                    <span className="me-2 fw-bold text-muted">Choose Visit:</span>
                    <DropdownButton
                      id="visit-dropdown"
                      title={selectedVisit ? selectedVisit.date : 'Select Visit Date'}
                      variant="outline-secondary"
                    >
                      {visits.map((visit, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setSelectedVisit(visit)}
                        >
                          {visit.date} ({visit.type})
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </Col>
                <Col md={9}>
                  <Card.Text>
                    <Row>
                      <Col md={6} className="mb-3 mb-md-0">
                        <h6 className="text-muted mb-2">
                          <FaUserCircle className="me-2 text-primary" />
                          Personal Information
                        </h6>
                        <p>
                          <strong>Name:</strong> Peter Viceall
                          <br />
                          <strong>Gender:</strong> Male
                          <br />
                          <strong>Contact:</strong> 123-456-7890
                          <br />
                          <strong>National ID:</strong> 123456789
                          <br />
                          <strong>Emergency Contact:</strong> Jane Doe (555-555-5555)
                          <br />
                          <strong>Address:</strong> 123 Main St, Los Angeles, CA
                        </p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaHistory className="me-2 text-primary" />
                          Hospital Visit Details
                        </h6>
                        <p>
                          <strong>Patient ID:</strong> {patientId}
                          <br />
                          <strong>Admission Date:</strong> {admissionDate}
                          <br />
                          <strong>Insurance Number:</strong> {insuranceNumber}
                          <br />
                          <strong>Days in Hospital:</strong> {daysInHospital}
                          <br />
                          <strong>Visit Type:</strong> {selectedVisit?.type || 'N/A'}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaPills className="me-2 text-primary" />
                          Primary Diagnosis
                        </h6>
                        <p>{primaryDiagnosis}</p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaFileAlt className="me-2 text-primary" />
                          Secondary Diagnosis
                        </h6>
                        <p>{secondaryDiagnosis}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaFileAlt className="me-2 text-primary" />
                          Tests Performed
                        </h6>
                        <ul>
                          {testsPerformed.map((test, index) => (
                            <li key={index}>{test}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaFileAlt className="me-2 text-primary" />
                          Discharge Condition
                        </h6>
                        <p>{dischargeCondition}</p>
                      </Col>
                    </Row>
                  </Card.Text>
                </Col>
              </Row>
              <Tab.Container defaultActiveKey="prescriptions">
                <Nav variant="tabs" className="mb-3 justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="prescriptions" className="rounded-pill px-4">
                      <FaClipboardCheck className="me-2" />
                      Patient Documents
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="history" className="rounded-pill px-4">
                      <FaHistory className="me-2" />
                      Hospital visit History
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="allergies" className="rounded-pill px-4">
                      <FaMoneyBillAlt className="me-2" />
                      Services and Medication charges
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notes" className="rounded-pill px-4">
                      <FaStickyNote className="me-2" />
                      Notes
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="prescriptions">
                    <Row>
                      <Col md={6}>
                        <h5 className="text-primary">Active Drugs</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <FaPills className="me-2 text-primary" /> Drug 1 (Dosage)
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FaPills className="me-2 text-primary" /> Drug 2 (Dosage)
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={6}>
                        <h5 className="text-primary">Used Drugs</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <FaPills className="me-2 text-primary" /> Drug 3 (Dosage)
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FaPills className="me-2 text-primary" /> Drug 4 (Dosage)
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  {/* Add content for other tabs */}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientEHR;