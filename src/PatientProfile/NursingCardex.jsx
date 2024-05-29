import React, { useState } from 'react';
import { Tabs, Tab, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEdit, FaSave, FaNotesMedical, FaPills, FaProcedures, FaUtensils, FaExclamationTriangle, FaComments, FaUserMd, FaFileAlt } from 'react-icons/fa';

// Patient Header Component
const PatientHeader = ({ patient }) => (
  <Row className="mb-3">
    <Col md={6}>
      <h4>Patient's Name: {patient.name}</h4>
    </Col>
    <Col md={2}>
      <p>Age: {patient.age}</p>
    </Col>
    <Col md={2}>
      <p>Gender: {patient.gender}</p>
    </Col>
    <Col md={2}>
      <p>MR#: {patient.mrNumber}</p>
    </Col>
    <Col md={12}>
      <p>Room/Bed: {patient.roomBed}</p>
    </Col>
  </Row>
);

// Reusable Editable Text Component
const EditableText = ({ label, value, onChange, editMode }) => (
  <Form.Group controlId={label.replace(/\s+/g, '')}>
    <Form.Label>{label}</Form.Label>
    {editMode ? (
      <Form.Control type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <p>{value}</p>
    )}
  </Form.Group>
);

// Reusable Editable TextArea Component
const EditableTextArea = ({ label, value, onChange, editMode }) => (
  <Form.Group controlId={label.replace(/\s+/g, '')}>
    <Form.Label>{label}</Form.Label>
    {editMode ? (
      <Form.Control as="textarea" rows={4} value={value} onChange={(e) => onChange(e.target.value.split('\n'))} />
    ) : (
      <ul>
        {value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </Form.Group>
);

// Overview Tab Component
const OverviewTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('Chronic Obstructive Pulmonary Disease (COPD)');
  const [allergies, setAllergies] = useState('Penicillin');
  const [currentTreatments, setCurrentTreatments] = useState(['Oxygen Therapy', 'Physical Therapy']);
  const [codeStatus, setCodeStatus] = useState('DNR');

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <Form>
      <EditableText label="Primary Diagnosis" value={primaryDiagnosis} onChange={setPrimaryDiagnosis} editMode={editMode} />
      <EditableText label="Allergies" value={allergies} onChange={setAllergies} editMode={editMode} />
      <EditableTextArea label="Current Treatments" value={currentTreatments} onChange={setCurrentTreatments} editMode={editMode} />
      <EditableText label="Code Status" value={codeStatus} onChange={setCodeStatus} editMode={editMode} />
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={toggleEditMode}>
          {editMode ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
        </Button>
      </div>
    </Form>
  );
};

// Placeholder Tab Components (Replace with actual content)
const PlaceholderTab = ({ title, icon }) => (
  <div>
    <h4><>{icon}</> {title}</h4>
    <p>Content for {title} tab goes here.</p>
  </div>
);

const CardexForm = () => {
  const patient = {
    name: 'John Doe',
    age: 65,
    gender: 'Male',
    mrNumber: '123456',
    roomBed: '402/B',
  };

  return (
    <Card className="mt-3">
      <Card.Header>
        <PatientHeader patient={patient} />
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="overview" id="cardex-tabs">
          <Tab eventKey="overview" title={<><FaNotesMedical /> Overview</>}>
            <OverviewTab />
          </Tab>
          <Tab eventKey="medications" title={<><FaPills /> Medications</>}>
            <PlaceholderTab title="Medications" icon={<FaPills />} />
          </Tab>
          <Tab eventKey="carePlan" title={<><FaProcedures /> Care Plan</>}>
            <PlaceholderTab title="Care Plan" icon={<FaProcedures />} />
          </Tab>
          <Tab eventKey="adls" title={<><FaUtensils /> ADLs</>}>
            <PlaceholderTab title="ADLs" icon={<FaUtensils />} />
          </Tab>
          <Tab eventKey="dietNutrition" title={<><FaUtensils /> Diet & Nutrition</>}>
            <PlaceholderTab title="Diet & Nutrition" icon={<FaUtensils />} />
          </Tab>
          <Tab eventKey="safetyPrecautions" title={<><FaExclamationTriangle /> Safety & Precautions</>}>
            <PlaceholderTab title="Safety & Precautions" icon={<FaExclamationTriangle />} />
          </Tab>
          <Tab eventKey="communication" title={<><FaComments /> Communication</>}>
            <PlaceholderTab title="Communication" icon={<FaComments />} />
          </Tab>
          <Tab eventKey="consultations" title={<><FaUserMd /> Consultations</>}>
            <PlaceholderTab title="Consultations" icon={<FaUserMd />} />
          </Tab>
          <Tab eventKey="notes" title={<><FaFileAlt /> Notes</>}>
            <PlaceholderTab title="Notes" icon={<FaFileAlt />} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default CardexForm;
