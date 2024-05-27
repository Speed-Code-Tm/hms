import React, { useState } from 'react'
import {DropdownButton, Dropdown,Button} from 'react-bootstrap'
import ReusableTable from '../../pages/ReusableTable'
import ReusableModal from '../components/ReusableModal'
import GenerateInvoice from './GenerateInvoice'

const InvoiceManagement = () => {

const [showModal,setShowModal] = useState()


const invoiceColumns = [
  {accessor:"patientId", Header:"Patient Id"},
  {accessor:"patientName", Header:"Patient Name"},
  {accessor:"invoiceNumber", Header:"invoiceNumber"},
  {accessor:"invoiceDate", Header:"Invoice Date"},
  {accessor:"totalAmount", Header:"Total Amount"},
  {accessor:"status", Header:"Status"},
  {accessor:"amountDue", Header:"Amount Due"}

]

const handleRowClick = () =>{

}

const handleCloseModal = () =>{
  setShowModal(false)
}


const invoices = [
  {
    id: 'inv001',
    hospitalVisitId: 'hv001',
    patientId: 'p001',
    patientName:"JOhn Doe",
    invoiceNumber:"INV123",
    services: [
      {
        serviceId: 's001',
        description: 'Consultation',
        quantity: 1,
        unitPrice: 50.00,
        total: 50.00
      },
      {
        serviceId: 's002',
        description: 'Blood Test',
        quantity: 1,
        unitPrice: 20.00,
        total: 40.00,
      }],
      totalAmount:90,
      status:"paid",
      amountDue:0
    }]


  
  return (
    <>
    <div className="d-flex justify-content-end py-3">
      <Button onClick={()=>setShowModal(true)}>Generate Invoice</Button>
    </div>

    {/* invoice generation modal */}

    <ReusableModal onHide={handleCloseModal} show={showModal} title="Generate Invoice">
      <GenerateInvoice/>
    </ReusableModal>
   
    <ReusableTable

    columns={invoiceColumns}

    data={invoices}

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
            onClick={() => handleRowClick(row.original, 'view')}
          >
           View Invoice
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => handleRowClick(row.original, 'delete')}
          >
           Delete Invoice
          </Dropdown.Item>
        </DropdownButton>
      </div>
    )}

    />
    </>
  )
}

export default InvoiceManagement