import React, {useState,useEffect} from 'react'
import Searchbar from '../Searchbar/Searchbar';
import {ListGroup,ListGroupItem, Form, Row, Col, Button} from 'react-bootstrap'
import Select from 'react-select'

const GenerateInvoice = () => {
  const [searchTerm,setSearchTerm] = useState('')
  const [selectedPatient,setSelectedPatient] = useState([])
  const [selectedVisit,setSelectedVisit] = useState()
  const [searchResults,setSearchResults] = useState([])
  const [hospitalVisits,setHospitalVisits] = useState([])
  const [search,setSearch] = useState(true)
  const [visitServices,setVisitServices] = useState([])
  const [total,setTotal] = useState(0)

  //patients 
    const patients = [
        {

          name: 'John Doe',
          patientId: 'p001',
          idNumber: '123456789',
          hospitalVisits: [
            {
              id: 'hv001',
              date: '2024-05-20',
              type: 'outpatient',
            },
            {
              id: 'hv002',
              date: '2024-05-22',
              type: 'inpatient',
            },
          ],
        },
        {
          name: 'Jane Smith',
          patientId: 'p002',
          idNumber: '987654321',
          hospitalVisits: [
            {
              id: 'hv003',
              date: '2024-05-21',
              type: 'outpatient',
            },
          ],
        },
      ];
      
    //services rendered to a patient fromtime time during hospital visit
      const services = [
        {
          hospitalVisitId: 'hv001',
          serviceId: 's001',
          description: 'Consultation',
          quantity: 1,
          unitPrice: 50,
        },
        {
          hospitalVisitId: 'hv001',
          serviceId: 's002',
          description: 'Blood Test',
          quantity: 1,
          unitPrice: 20,
        },
        {
          hospitalVisitId: 'hv002',
          serviceId: 's003',
          description: 'Surgery',
          quantity: 1,
          unitPrice: 500,
        },
        {
          hospitalVisitId: 'hv003',
          serviceId: 's004',
          description: 'X-Ray',
          quantity: 1,
          unitPrice: 100,
        },
      ];

      //selected patient after search

      const handleSelectPatient = (patient)=>{
        setSearch(false)
        setSelectedPatient(patient)
        setSearchTerm(patient.name)
        setHospitalVisits(patient.hospitalVisits);
        setSearchResults([])
        setSelectedVisit(null);
        setVisitServices([]);
        setTotal(0);
      }


      //

      const handleSelectChange = (field, option) =>{
        setVisitServices([])
        setSelectedVisit(option.value)

         const filteredServices = services.filter(service => service.hospitalVisitId === option.value);
         setVisitServices(filteredServices);
         calculateTotal(filteredServices);
      }


      //remove a service

      const handleServiceRemove = (serviceId) => {
        const updatedServices = visitServices.filter(service => service.serviceId !== serviceId);
        setVisitServices(updatedServices);
        calculateTotal(updatedServices);
      };


      //calculate invoice total amount
    

      const calculateTotal = (services) => {
        const totalAmount = services.reduce((acc, service) => acc + (service.quantity * service.unitPrice), 0);
        setTotal(totalAmount);
      };



      //generate invoice

      const handleSubmit = async () =>{
//generate invoice
      }


//search a patient to generate invoice for
      useEffect(()=>{
        if(search){
        if (searchTerm.length >= 3) {
          const filteredResults = patients.filter((patient) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              patient?.name?.toLowerCase().includes(searchLower) ||
              patient?.idNumber?.toLowerCase().includes(searchLower) ||
              patient?.patientId?.toLowerCase().includes(searchLower)
            );
          });
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]);
        }
      }
      },[searchTerm, search])
      
  return (
    <div>
      <div className="patient-search">
      <Searchbar searchTerm={searchTerm} search={search} setSearch={setSearch} setSearchTerm={setSearchTerm}/>
      <ListGroup className="mt-3">
        {searchResults.map((patient, index) => (
          <ListGroupItem type="button" key={index} onClick={()=>handleSelectPatient(patient)}>
            {patient?.name}
          </ListGroupItem>
        ))}
      </ListGroup>
      </div>

    <div>

<Row className='mb-3'>
  <Col md={6}>
    <Form.Group>
        <Form.Label> Hospital Visit </Form.Label>

        <Select
  options={hospitalVisits?.map(visit => ({
    label: `${visit.date} (${visit.type})`,
    value: visit.id
  }))}
  onChange={option => handleSelectChange('visit', option)}
/>   </Form.Group>
  
   </Col>
  
  </Row>

 {visitServices?.length ? <Row className='mb-3'>

    <Form.Group md={12}>

      <Form.Label> Services Rendered </Form.Label>

      <ListGroup>
      {visitServices.map(service => (
        <ListGroup.Item className='d-flex justify-content-between align-items-center'>

        {service.description} - {service.quantity} x {service.unitPrice.toFixed(2)} = {(service.quantity * service.unitPrice).toFixed(2)}
                    <Button type="button" className="btn btn-danger btn-sm" onClick={() => handleServiceRemove(service.serviceId)}>Remove</Button>
                  

          </ListGroup.Item>

  ))}
        </ListGroup>

      </Form.Group>

    </Row> : <></>}

    <Row className="form-row">
          <Form.Group className="form-group col-md-12">
            <h5>Total: {total.toFixed(2)}</h5>
          </Form.Group>
        </Row>

        <Button type="button" className="btn btn-primary" onClick={handleSubmit}>Generate Invoice</Button>
   


      </div>

    </div>
  )
}

export default GenerateInvoice