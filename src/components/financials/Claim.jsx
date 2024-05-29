import {useState,useEffect} from 'react'
import Searchbar from '../Searchbar/Searchbar';
import {ListGroup,ListGroupItem, Form, Row, Col, Button,Table} from 'react-bootstrap'
import Select from 'react-select'
const initialState = {
  selectedPatient: null,
  selectedVisit: null,
  selectedInvoice: null,
  claimDetails: {
    claimId: '',
    invoiceId: '',
    hospitalVisitId: '',
    patientId: '',
    patientDetails: {},
    hospitalDetails: {
      hospitalId: 'hospital_001',
      hospitalName: 'Shalom Hospital',
      hospitalAddress: '456 Hospital Road, Machakos, Kenya',
      hospitalPhoneNumber: '+254700654321',
    },
    visitDetails: {},
    services: [],
    totalAmount: 0.00,
    invoiceDate: '',
    status: 'Submitted',
    submissionDate: new Date().toISOString(),
    paymentStatus: 'Pending',
    remarks: '',
}
}

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

const invoices = [
  {
    invoiceId: 'inv001',
    hospitalVisitId: 'hv001',
    services: [
      { serviceId: 's001', description: 'Consultation', quantity: 1, unitPrice: 50.00, total: 50.00 },
      { serviceId: 's002', description: 'Blood Test', quantity: 1, unitPrice: 20.00, total: 20.00 },
    ],
    totalAmount: 70.00,
    invoiceDate: '2024-05-20T10:00:00Z',
    paymentStatus: 'Pending',
  }
];
const Claim = () => {

  const [state,setState] = useState(initialState);
  const [search,setSearch] = useState(true)
  const [searchTerm,setSearchTerm] = useState('')
  const [searchResults,setSearchResults] = useState([])


  const handleSelectPatient = (patient) => {

    setSearch(false)

    setState({
      ...state,
      selectedPatient:patient,
      claimDetails: {
        ...state.claimDetails,
        patientId: patient.patientId,
        patientDetails: {
          name: patient.name,
          idNumber: patient.idNumber,
        },
      },
    });

    setSearchTerm(patient.name)
    setSearchResults([])
  };

  const handleVisitSelect = (visit) => {
    const selectedVisit = state.selectedPatient.hospitalVisits.find(v => v.id === visit.value);
    setState({
      ...state,
      selectedVisit,
      claimDetails: {
        ...state.claimDetails,
        hospitalVisitId: selectedVisit.id,
        visitDetails: selectedVisit,
      },
    });
  };

  const handleInvoiceSelect = (option) => {
    const selectedInvoice = invoices.find(i => i.invoiceId === option.value);
    setState({
      ...state,
      selectedInvoice,
      claimDetails: {
        ...state.claimDetails,
        invoiceId: selectedInvoice.invoiceId,
        services: selectedInvoice.services,
        totalAmount: selectedInvoice.totalAmount,
        invoiceDate: selectedInvoice.invoiceDate,
      },
    });
  };

  const handleServiceRemove = (serviceId) => {
    const updatedServices = state.claimDetails.services.filter(service => service.serviceId !== serviceId);
    const updatedTotalAmount = updatedServices.reduce((total, service) => total + service.total, 0);
    setState({
      ...state,
      claimDetails: {
        ...state.claimDetails,
        services: updatedServices,
        totalAmount: updatedTotalAmount,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    
  };



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
      <Form onSubmit={handleSubmit}>
      
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

        {state.selectedPatient && (
          <>
            {/* Step 2: Select Hospital Visit */}
            <Form.Group controlId="visitSelect" className='mb-3'>
              <Form.Label>Hospital Visit</Form.Label>

              <Select onChange={(visit)=>handleVisitSelect(visit)} options={ state?.selectedPatient?.hospitalVisits?.map(visit =>({label:` ${visit.date} -${visit.type}`,value:visit.id}))}/>
            
            </Form.Group>

            {state.selectedVisit && (
              <>
                {/* Step 3: Select Invoice */}
                <Form.Group controlId="invoiceSelect" className='mb-3'>
                  <Form.Label>Invoice</Form.Label>
                  <Select onChange={(option)=>handleInvoiceSelect(option)} options={invoices.filter(invoice=>invoice.hospitalVisitId === state.selectedVisit.id && invoice.paymentStatus === 'Pending').map(invoice=>({label:`Invoice ID: ${invoice.invoiceId} - Total: ${invoice.totalAmount.toFixed(2)} KES`, value:invoice.invoiceId}))} />
                 
                </Form.Group>

                {state.selectedInvoice && (
                  <>
                    {/* Step 4: Display Services */}
                    <Table striped bordered hover className='mb-3'>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Unit Price (KES)</th>
                          <th>Total (KES)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.claimDetails.services.map(service => (
                          <tr key={service.serviceId}>
                            <td>{service.description}</td>
                            <td>{service.quantity}</td>
                            <td>{service.unitPrice.toFixed(2)}</td>
                            <td>{service.total.toFixed(2)}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleServiceRemove(service.serviceId)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <h6 className='mb-3'>Total Amount: {state.claimDetails.totalAmount.toFixed(2)} KES</h6>

                    {/* Step 5: Submit Claim */}
                    <Button type="submit" variant="primary">
                      Submit Claim
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Form>   
    </div>
  )
}

export default Claim