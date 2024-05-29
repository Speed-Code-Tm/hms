import React, { useState, useEffect, useMemo } from "react";
import { Container, Modal } from "react-bootstrap";
import styled from "styled-components";

import { serverTimestamp } from 'firebase/firestore';




import { addPrescription, retrievePrescriptions } from "../pages/configs";
import ReusableTable from "./ReusableTable";
import { Add, Remove } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DropdownButton, Dropdown, Button,Form, Col, Row } from "react-bootstrap";
import * as yup from 'yup';
import ReusableModal from "../components/ReusableModal";
import Select from 'react-select';








const AddPatientButton = styled.button`
background-color: #007bff;
border: none;
color: #fff;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease;
display: flex;
align-items: center;
margin-left: auto; /* This will push the button to the right */

&:hover {
  background-color: #0056b3;
}
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;


const Prescriptions = ({activeTab}) => {
  const [data, setData] = useState([]);
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] = useState(false);
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({
    patient: { id: '', name: '' },
    doctor: { id: '', name: '' },
    diagnosis:'',
    medications:[{ name: '', dosage: '', instructions: '' }],
    notes:''
  })


  const patients = [{ name: 'John Doe', id: 'iywuccigeyi' }];
  const doctors = [{ name: 'Jane Doe', id: 'beegcgyew' }];

  const prescriptionValidationSchema = yup.object().shape({
    patient: yup.object().shape({
      id: yup.string().required('Patient ID is required'),
      name: yup.string().required('Patient name is required')
    }),
    doctor: yup.object().shape({
      id: yup.string().required('Doctor ID is required'),
      name: yup.string().required('Doctor name is required')
    }),
    diagnosis: yup.string().required('Diagnosis is required'),
    medications: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Medication name is required'),
        dosage: yup.string().required('Dosage is required'),
        instructions: yup.string().required('Instructions are required')
      })
    ),
    notes: yup.string()
  });


  const handleChange = (selectedOption, field) => {
    
    setFormData({
      ...formData,
      [field]: { id: selectedOption.value, name: selectedOption.label }
    });
  };


  const handleMedicationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedications = [...formData.medications];
    updatedMedications[index][name] = value;
    setFormData({ ...formData, medications: updatedMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { name: '', dosage: '', instructions: '' }]
    });
  };

  const removeMedication = (index) => {
    const updatedMedications = [...formData.medications];
    updatedMedications.splice(index, 1);
    setFormData({ ...formData, medications: updatedMedications });
  };


  const prescriptionData = [
  
    {
      patientName: 'patient3',
      doctorName: 'doctor3',
      date: new Date('2023-05-05'),
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg three times daily',
          instructions: 'Take with water',
        },
        {
          name: 'Mucinex',
          dosage: '600mg twice daily',
          instructions: 'Take with water',
        },
      ],
      notes: 'Persistent cough and congestion',
      diagnosis: 'Bacterial Respiratory Infection',
      prescriptionDate: new Date('2023-05-05T11:15:00').toDateString(),
    },
    {
      patientName: 'patient4',
      doctorName: 'doctor4',
      date: new Date('2023-05-03'),
      medications: [
        {
          name: 'Atorvastatin',
          dosage: '20mg once daily',
          instructions: 'Take at night',
        },
        {
          name: 'Lisinopril',
          dosage: '10mg once daily',
          instructions: 'Take in the morning',
        },
      ],
      notes: 'High cholesterol and blood pressure',
      diagnosis: 'Hyperlipidemia and Hypertension',
      prescriptionDate: new Date('2023-05-03T09:00:00').toDateString(),
    },
  ];

  

  const COLUMNS = [
   
    {
      Header: " Patient",
      accessor:"patientName"
    },
    {
      Header: " Doctor",
      accessor:"doctorName"
    },
    {
      Header: " Medication",
      accessor: 'medications',
      Cell: ({ value }) => (
        <div>
          {value.map((medication, index) => (
            <div key={index}>
              <strong>{medication.name}</strong>
              <p>Dosage: {medication.dosage}</p>
              <p>Instructions: {medication.instructions}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: "Notes",
      accessor: 'notes',
    },
    {
      Header: "Diagnosis",
      accessor: 'diagnosis',
    },
    {
      Header: "Date",
      accessor: 'prescriptionDate',
    },
  
  ];
  

  const columns = useMemo(() => COLUMNS, []);



  const ToggleAddPrescriptionModal = () => {
    setShowAddPrescriptionModal(!showAddPrescriptionModal);
  };



  const submitHandler = async(e) =>{
    e.preventDefault()

    setLoading(true)
    try{

      await prescriptionValidationSchema.validate(formData, {abortEarly:false})
     const prescriptionDate = serverTimestamp()
     
      let newFormData = {medications:formData.medications, prescriptionDate,diagnosis:formData.diagnosis,notes:formData.notes, patientName:formData.patient.name, patientId:formData.patient.id, 
        doctorName:formData.doctor.name,doctorId:formData.doctor.id}

       await addPrescription(newFormData)
       toast.success("Prescription added")
       setShowAddPrescriptionModal(false)

       fetchPrescriptions()
    }catch(error)
    {
      console.log(error);
      if(error.inner && error.inner.length > 0){
        const firstErrorMessage = error.inner[0].message
        toast.error(`Please fix the following error: ${firstErrorMessage}`);

      }else{
        toast.error(
          "An unknown validation error occurred. Please check the form data."
        );
      }
    }finally{
      setLoading(false)
    }
  }

  async function fetchPrescriptions(){
       try {
       const prescriptions =  await retrievePrescriptions()
       
       setData(prescriptions)
       } catch (error) {
        console.log(error);
       }
  }

  useEffect(()=>{
      if(activeTab === 'prescriptions'){
           fetchPrescriptions()
      }
  },[activeTab])
  return (
    <Container className="patient-registration-container" style={{marginTop:'5px'}}>
    
      <HeaderContainer>
        <AddPatientButton  onClick={ToggleAddPrescriptionModal}>
          <Add />
          Add Prescription
        </AddPatientButton>
      </HeaderContainer>
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <div>
            {/* add a drop down button menu wth icons and functions */}
            <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
            
             
              <Dropdown.Item href="#/action-2">
                Reschedule Session
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Rebook Session</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Cancel Session</Dropdown.Item>
            </DropdownButton>
          </div>
        )}
      />
      <ReusableModal title={'Add prescription'}  show={showAddPrescriptionModal}  onHide={()=>setShowAddPrescriptionModal(false)}>

      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6} className="mb-3">
          <Form.Group controlId="patientName">
          <Form.Label>Patient Name</Form.Label>
        <Select
          options={patients.map(patient => ({ value: patient?.id, label: patient.name }))}
          onChange={(selectedOption) => handleChange(selectedOption, 'patient')}
          value={patients.map(patient => ({ value: patient?.id, label: patient.name })).find(patient => patient?.id === formData.patient.id)}
          placeholder="Select patient..."
        />
        </Form.Group>
          </Col>

          <Col md={6} className="mb-3" >
          <Form.Group controlId="doctorName">
          <Form.Label>Doctor Name</Form.Label>
        <Select
          options={doctors.map(doctor => ({ value: doctor?.id, label: doctor.name }))}
          onChange={(selectedOption) => handleChange(selectedOption, 'doctor')}
          value={doctors.map(doctor => ({ value: doctor?.id, label: doctor.name })).find(doctor => doctor?.id === formData.doctor.id)}
          placeholder="Select doctor..."
        />
      </Form.Group>
          </Col>
          <Col className="mb-3" >
          {formData.medications.map((medication, index) => (
        <div key={index}  className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Medication Name"
                name="name"
                value={medication.name}
                onChange={(e) => handleMedicationChange(e, index)}
             
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Dosage"
                name="dosage"
                value={medication.dosage}
                onChange={(e) => handleMedicationChange(e, index)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Instructions"
                name="instructions"
                value={medication.instructions}
                onChange={(e) => handleMedicationChange(e, index)}
              />
            </Col>
            <Col>
              <Button variant="danger" className="btn btn-sm" type="button" onClick={() => removeMedication(index)}>
               <Remove/>
              </Button>
            </Col>
          </Row>
        </div>
      ))}

<Button variant="primary" type="button" onClick={addMedication}>
        <Add/>
      </Button>
          </Col>
        </Row>
      
     
     
   <Col className="mb-3">
   
   <Form.Group controlId="diagnosis">
        <Form.Label>Diagnosis</Form.Label>
        <Form.Control
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
        
        />
      </Form.Group>
   </Col>
      

      

     

      <Form.Group controlId="notes" className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        
        />
      </Form.Group>

      <Button variant="primary" disabled={loading} type="submit">
       {loading? "Submitting...":"Submit Prescription"}
      </Button>
    </Form>


      </ReusableModal>
      <ToastContainer />
    </Container>
  );
};


export default Prescriptions;

