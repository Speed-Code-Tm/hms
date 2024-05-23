import React from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import ReusableTable from '../../pages/ReusableTable';
import { useState } from 'react';
import Select from 'react-select';
import {AsyncPaginate} from 'react-select-async-paginate';
import { searchPatients } from '../../pages/configs';

// Mock data for patients 
const patients = [
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', admissionDate: '2023-04-25' },
    { id: 2, name: 'Jane Smith', age: 42, gender: 'Female', admissionDate: '2023-04-27' },
    // Add more patient data as needed
  ];
const PatientAdmission = () => {

    const [patient,setPatient] = useState()
    const [patients,setPatients] = useState([])
    const [initialState, setInitialState] = useState({
        pageIndex: 0,
        pageSize: 5,
      });
      const [inputValue, setInputValue] = useState('');


  const [formData, setFormData] = useState({
    admissionId: '',
    patientId: '',
    admissionDate: '',
    reasonForAdmission: '',
    admittingPhysician: '',
    assignedRoom: '',
    diagnosis: '',
    procedures: [],
    attendingPhysicians: [],
    medicationOrders: [],
    clinicalNotes: '',
    dischargeDate: '',
    dischargeSummary: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOptions) => {
    setFormData({ ...formData, [name]: selectedOptions });
  };
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = searchPatients(searchQuery, page);

    const options = response.patients.map((patient) => ({
      value: patient,
      label: `${patient.name} (ID: ${patient.patientId}, National ID: ${patient.nationalId})`,
    }));

    return {
      options,
      hasMore: response.hasMore,
      additional: {
        page: (page || 1) + 1,
      },
    };
  };

  const handleSearcChange = (selectedOption) => {
    setSelectedPatient(selectedOption);
    // onPatientSelect(selectedOption.value);
  };

  
  return (
    <Form>
    <Row>
    <Col>
      <Form.Group>
        <Form.Label>Patient Name</Form.Label>
        <AsyncPaginate
      value={selectedPatient}
      loadOptions={loadOptions}
      onChange={handleSearcChange}
      additional={{ page: 1 }}
      placeholder="Search by Patient ID, Name, or National ID"
    />
      </Form.Group>
      {/* Add other form fields here */}
    </Col>
    <Col>
      <Form.Group>
        <Form.Label>Patient ID</Form.Label>
        <Form.Control
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Add other form fields here */}
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Group>
        <Form.Label>Procedures/Treatments</Form.Label>
        <Select
          isMulti
          name="procedures"
          options={procedureOptions}
          value={formData.procedures}
          onChange={(selectedOptions) =>
            handleSelectChange('procedures', selectedOptions)
          }
        />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group>
        <Form.Label>Attending Physicians/Care Team</Form.Label>
        <Select
          isMulti
          name="attendingPhysicians"
          options={physicianOptions}
          value={formData.attendingPhysicians}
          onChange={(selectedOptions) =>
            handleSelectChange('attendingPhysicians', selectedOptions)
          }
        />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Group>
        <Form.Label>Medication Orders</Form.Label>
        <Select
          isMulti
          name="medicationOrders"
          options={medicationOptions}
          value={formData.medicationOrders}
          onChange={(selectedOptions) =>
            handleSelectChange('medicationOrders', selectedOptions)
          }
        />
      </Form.Group>
    </Col>
    </Row>
    </Form>
   
  )
}

export default PatientAdmission