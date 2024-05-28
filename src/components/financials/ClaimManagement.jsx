import {useState} from 'react'
import ReusableTable from '../../pages/ReusableTable';
import { Badge, Dropdown, DropdownButton,Button } from 'react-bootstrap';
import ReusableModal from '../ReusableModal'
import Claim from './Claim'
const ClaimManagement = () => {
  const [showModal,setShowModal] = useState(false)
  

  const claimsColumns = [
    {accessor:"patientName", Header:'Patient Name'},
    {accessor:"patientId", Header:'Patient Id' },
    {accessor:"policyNumber", Header:'Policy Number' },
    {accessor:"hospitalVisitId", Header:'Hospital Visit' },
    {accessor:"invoiceNumber", Header:'Invoice Number' },
    {accessor:"claimAmount", Header:'Claim Amount' },
    {accessor:"submissionDate", Header:'Submission Date' },
    {accessor:"claimStatus", Header:'Status',  Cell: ({ value }) => <Badge bg={getStatusColor(value)}>{value}</Badge> }

  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "declined":
        return "danger";
      case "approved":
        return "success";
      default:
        return "secondary";
    }
  };
  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  };

  const handleRowClick = () =>{

  }

  const handleCloseModal = () =>{
    setShowModal(false)
  }

  const claims = [
    {
      claimId: 'cl001',
      patientName: 'John Doe',
      patientId: 'p001',
     policyNumber: 'NHIF123456',
      hospitalVisitId: 'hv001',
      invoiceNumber: 'inv001',
      claimAmount: 70.00,
      claimStatus: 'submitted',
      submissionDate: '2024-05-20T10:00:00Z'
    },
    {
      claimId: 'cl002',
      patientName: 'Jane Smith',
      patientId: 'p002',
      policyNumber: 'NHIF987654',
      hospitalVisitId: 'hv003',
      invoiceNumber: 'inv003',
      claimAmount: 190.00,
      claimStatus: 'approved',
      submissionDate: '2024-05-21T09:00:00Z'
    }

  ];



  return (
    <div>
      <div className="d-flex py-3 justify-content-end">
        <Button onClick={()=>setShowModal(true)}>
        Submit Claim
          </Button>

        </div>

        {/* submit claim management modal */}
        <ReusableModal title="Submit Claim" onHide={handleCloseModal} show={showModal}>
          <Claim/>
          </ReusableModal>

      <ReusableTable

      data={claims}

      initialState={initialState}
    columns={claimsColumns}
    

      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton
            dropup="true"
            id="dropdown-basic-button"
            title="Actions"
          >
            <Dropdown.Item
              href="#/action-1"
              onClick={() => handleRowClick(row.original, 'update')}
            >
              Update
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => handleRowClick(row.original, 'delete')}
            >
             Delete
            </Dropdown.Item>
          </DropdownButton>
        </div>
      )}
      />
    </div>
  )
}

export default ClaimManagement