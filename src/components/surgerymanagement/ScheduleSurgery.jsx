import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Table,Row,Col,ListGroup, ButtonGroup } from 'react-bootstrap';
import Searchbar from '../Searchbar/Searchbar';


const ScheduleSurgery = ({closeModal}) =>{

    const [newSurgery, setNewSurgery] = useState({
        patientId: '',
        surgeons: [],
        surgeryRoom: '',
        scheduledDate: new Date(),
        status: 'Scheduled'
      });

      const [results,setResults] = useState([])
      const [searchTerm,setSearchTerm] = useState('')
      const [search,setSearch] = useState(false)
      const [patientId,setPatientId] = useState()
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

      const handleSelectPatient = (patient) => {
        setPatientId(patient.id);
        setSearchTerm(patient.name);
        setResults([]);
      }

      const handleInputChange = (e) => {
        setNewSurgery({ ...newSurgery, [e.target.name]: e.target.value });
      };
    
      const handleDateChange = (date) => {
        setNewSurgery({ ...newSurgery, scheduledDate: date });
      };
    
      const handleSurgeonsChange = (selectedOptions) => {
        setNewSurgery({ ...newSurgery, surgeons: selectedOptions.map(option => option.value) });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
       
        
      };


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
      }, [searchTerm,search ]);
    

    return (
        <div>
          
 <Form onSubmit={handleSubmit}>

         <Row className='mb-3'>
    <Col xs={6}>
    <Form.Label>Patient</Form.Label>
    <Searchbar searchTerm={searchTerm} search={search} setSearch={setSearch} setSearchTerm={setSearchTerm}/>
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
    
    <Col xs={6}>
      <Form.Group>
    <Form.Label>Procedure</Form.Label>
  
  <Form.Control name='procedure' onChange={handleInputChange} />
      </Form.Group>
    </Col>

  </Row>

  <Row className="mb-3">
    <Col>

  <Form.Group controlId="surgeons">
          <Form.Label>Surgeons</Form.Label>
          <Select
            isMulti
            name="surgeons"
            options={[
              { value: 'Dr. Smith', label: 'Dr. Smith' },
              { value: 'Dr. Johnson', label: 'Dr. Johnson' },
              { value: 'Dr. Lee', label: 'Dr. Lee' },
              { value: 'Dr. Kim', label: 'Dr. Kim' }
            ]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSurgeonsChange}
          />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="surgeryRoom">
          <Form.Label>Surgery Room</Form.Label>
          <Form.Control
            type="text"
            name="surgeryRoom"
            placeholder="Operating Room"
            value={newSurgery.surgeryRoom}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
  </Row>
       <Row className='mb-5'>
        <Col>
        <Form.Group controlId="scheduledDate">
          <Form.Label className='d-block'>Scheduled Date</Form.Label>
          <DatePicker
            selected={newSurgery.scheduledDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
          />
        </Form.Group>
        </Col>
        </Row>
        <Button variant="primary" type="submit">
          Schedule Surgery
        </Button>
      </Form>

            </div>
    )
}


export default ScheduleSurgery

