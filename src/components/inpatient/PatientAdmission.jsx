import React, { useEffect } from 'react'
import { Alert, Button, Card, Col, Container, Dropdown, Form, ListGroup, Row } from 'react-bootstrap'
import { useState } from 'react';
import Select from 'react-select';

import DatePicker from 'react-datepicker';

// Mock data for patients 
const patients = [
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', admissionDate: '2023-04-25' },
    { id: 2, name: 'Jane Smith', age: 42, gender: 'Female', admissionDate: '2023-04-27' },
    // Add more patient data as needed
  ];
const PatientAdmission = () => {

    // const [patient,setPatient] = useState()
    const [patients,setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [initialState, setInitialState] = useState({
        pageIndex: 0,
        pageSize: 5,
      });
      
      const [results, setResults] = useState([]);
      const [wards, setWards] = useState([
        { name: 'Ward E', category: 'General Ward', capacity: 20, occupiedBeds: 10 },
        { name: 'Ward F', category: 'Intensive Care', capacity: 10, occupiedBeds: 7 },
      ]);
      const mockPatients = [
        {
          id: '1',
          name: 'John Doe',
          idNumber: 'ID123456',
          patientId: 'P103',
          dob: '1990-01-01',
          address: '123 Main St, Anytown, USA',
          phone: '555-1234',
          email: 'john.doe@example.com'
        },
        {
          id: '2',
          name: 'Jane Smith',
          idNumber: 'ID654321',
          patientId: 'P104',
          dob: '1985-05-15',
          address: '456 Oak St, Anytown, USA',
          phone: '555-5678',
          email: 'jane.smith@example.com'
        },
        {
          id: '3',
          name: 'Alice Johnson',
          idNumber: 'ID789012',
          patientId: 'P105',
          dob: '1978-10-20',
          address: '789 Pine St, Anytown, USA',
          phone: '555-8765',
          email: 'alice.johnson@example.com'
        },
        {
          id: '4',
          name: 'Bob Brown',
          idNumber: 'ID345678',
          patientId: 'P106',
          dob: '1967-12-30',
          address: '101 Maple St, Anytown, USA',
          phone: '555-4321',
          email: 'bob.brown@example.com'
        }
      ];


      const patient = {
        name: 'John Doe',
        patientId: 'P103',
        idNumber: 'ID123456',
        dob: '1990-01-01',
        gender: 'Male',
        phone: '555-1234',
        email: 'john.doe@example.com',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '555-5678',
          email: 'jane.doe@example.com'
        },
        bloodType: 'O+',
        allergies: ['Peanuts', 'Penicillin'],
        currentMedications: ['Aspirin', 'Metformin'],
        medicalHistory: ['Diabetes', 'Hypertension'],
        primaryCarePhysician: {
          name: 'Dr. Smith',
          contact: '555-8765'
        },
        insurance: {
          provider: 'NHIF',
          policyNumber: 'HC123456789',
          validity: '2024-12-31'
        }
      };

  const [formData, setFormData] = useState({
   
    admissionDate: '',
    assignedWard: '',
    admittingDoctor:''
  });

  // Sample options for react-select components
  const procedureOptions = [
    { value: 'procedure1', label: 'Procedure 1' },
    { value: 'procedure2', label: 'Procedure 2' },
    // Add more options as needed
  ];

  const physicianOptions = [
    { value: 'physician1', label: 'Dr. John Doe' },
    { value: 'physician2', label: 'Dr. Jane Smith' },
    // Add more options as needed
  ];

  const medicationOptions = [
    { value: 'medication1', label: 'Medication 1' },
    { value: 'medication2', label: 'Medication 2' },
    // Add more options as needed
  ];


  //wards

  const wardOptions = wards.map((ward) => ({
    value: ward.name,
    label: `${ward.name} (${ward.category} - ${ward.capacity - ward.occupiedBeds} beds available)`,
  }));


  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleChange =  (field, value) =>{
    
    setFormData({
      ...formData,
      [field]: value
    });
  }
  const [selectedPatient, setSelectedPatient] = useState(null);



  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filteredResults = mockPatients.filter((patient) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          patient?.name?.toLowerCase().includes(searchLower) ||
          patient?.idNumber?.toLowerCase().includes(searchLower) ||
          patient?.patientId?.toLowerCase().includes(searchLower)
        );
      });
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchTerm, ]);


  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.name);
    setResults([]);
  }
  
  return (
      <Row>
        <Col md={8}>

        <Row className='mb-3'>
    <Col xs={6}>
    <Form.Label>Patient</Form.Label>
    <Form.Control
        type="text"
        placeholder="Search by name, ID number, or patient ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='custom-search'
      />
      {results.length > 0 && (
        <ListGroup>
          {results.map((patient) => (
            <ListGroup.Item key={patient.id} className='cursor-pointer' onClick={() => handleSelectPatient(patient)}>
              {patient.name} 
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      
    </Col>
    
  </Row>

  <Row>
 <Col xs={12}>
  <Card>
            <Card.Header>
              <h3>Patient Information</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>Identification</h5>
                  <ListGroup>
                    <ListGroup.Item><strong>Full Name:</strong> {patient.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Patient ID:</strong> {patient.patientId}</ListGroup.Item>
                    <ListGroup.Item><strong>ID Number:</strong> {patient.idNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Date of Birth:</strong> {patient.dob}</ListGroup.Item>
                    <ListGroup.Item><strong>Gender:</strong> {patient.gender}</ListGroup.Item>
                    <ListGroup.Item><strong>Contact:</strong> {patient.phone}, {patient.email}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h5>Emergency Contact</h5>
                  <ListGroup>
                    <ListGroup.Item><strong>Name:</strong> {patient.emergencyContact.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Relationship:</strong> {patient.emergencyContact.relationship}</ListGroup.Item>
                    <ListGroup.Item><strong>Contact:</strong> {patient.emergencyContact.phone}, {patient.emergencyContact.email}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={6}>
                  <h5>Medical Information</h5>
                  {patient.allergies && patient.allergies.length > 0 && (
                    <Alert variant="danger">
                      <strong>Allergies:</strong> {patient.allergies.join(', ')}
                    </Alert>
                  )}
                  <ListGroup>
                    <ListGroup.Item><strong>Blood Type:</strong> {patient.bloodType}</ListGroup.Item>
                    <ListGroup.Item><strong>Current Medications:</strong> {patient.currentMedications.join(', ')}</ListGroup.Item>
                    <ListGroup.Item><strong>Medical History:</strong> {patient.medicalHistory.join(', ')}</ListGroup.Item>
                    {/* <ListGroup.Item><strong>Primary Care Physician:</strong> {patient.primaryCarePhysician.name} ({patient.primaryCarePhysician.contact})</ListGroup.Item> */}
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h5>Insurance Information</h5>
                  <ListGroup>
                    <ListGroup.Item><strong>Provider:</strong> {patient.insurance.provider}</ListGroup.Item>
                    <ListGroup.Item><strong>Policy Number:</strong> {patient.insurance.policyNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Validity:</strong> {patient.insurance.validity}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          </Col>

  </Row>



        </Col>
        <Col md={4}>
<Form>
        <Row>
          <Col xs={12} className='mb-3'>
          <Form.Group>
            <Form.Label className='d-block'>Admission Date
            </Form.Label>
            <DatePicker
              id="admissionDate"
              className='form-control d-block'
              style={{width:"100%"}}
              selected={formData.admissionDate}
              minDate={new Date()}
              onChange={(date) => handleChange('admissionDate', date)}
              showTimeSelect
             
              dateFormat="yyyy-MM-dd h:mm aa"
            />
          </Form.Group>
          </Col>
    
        <Col xs={12} className='mb-3'>
          <Form.Group>
            <Form.Label>Assign Ward</Form.Label>
            <Select options={wardOptions} onChange={(option)=>handleSelectChange('assignedWard', option)} />
          </Form.Group>
          </Col>
    <Col xs={12} className='mb-3'>
      <Form.Group>
        <Form.Label>Doctor</Form.Label>
        <Form.Control
         
        />
      </Form.Group>
    </Col>
<Col xs={6}>

    <Button>Submit</Button>
    </Col>
  </Row>

    </Form>

        </Col>
      </Row>
   
 
   
  )
}

export default PatientAdmission