import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { completeItemRequest, db } from '../pages/configs'
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import ReusableTable from '../pages/ReusableTable'
import ReusableModal from './ReusableModal'
import { toast } from 'react-toastify'
import * as yup from 'yup';
import DatePicker from 'react-datepicker';

const DepartmentNeeds = ({ data, refetch }) => {

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()
  const [formData, setFormData] = useState({
    quantity:'',
    issuedTo:'',
    issuedOn:''
  })
  const [loading, setLoading] = useState(false)
  const departmentNeedsColumns = [
    { Header: "Item", accessor: "itemName" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Department", accessor: "department" },
    { Header: "Requested By", accessor: "requestedBy" },
    { Header: "Request Date", accessor: "requestDate" },
  ];


  const handleRowClick = (item) => {
    setShowModal(true)
    setSelectedItem(item)
  
  }


  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setFormData({ quantity:'',
    issuedTo:'',
    issuedOn:''})
  }

  const validationSchema = yup.object().shape({
    issuedTo: yup.string()
      .required('Issued To is required')
      .min(3, 'Issued To must be at least 3 characters long'),
    quantity: yup.number()
      .required('Quantity is required')
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer'),
    issuedOn: yup.date()
      .required('Issued On is required')
      .max(new Date(), 'Issued On cannot be in the future')
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await validationSchema.validate(formData,{abortEarly:false})

      await completeItemRequest({ itemId: selectedItem.itemId, requestId: selectedItem.id, quantity: formData.quantity, issuedTo: formData.issuedTo, issuedOn:formData.issuedOn}, 'issue')
      handleCloseModal()
      refetch()
    } catch (error) {
      if (error.inner && error.inner.length > 0) {
        const firstErrorMessage = error.inner[0].message;
        toast.error(`Please fix the following error: ${firstErrorMessage}`);
      } else {
        toast.error(
          "An unknown validation error occurred. Please check the form data."
        );
      }
    } finally {
      setLoading(false)
    }

  }


  useEffect(() => {
    if (selectedItem) {
      setFormData({ quantity: selectedItem.quantity, issuedTo:'', issuedOn:'' })
    }
  }, [selectedItem])




  return (
    <div>
      {/* modal for updating department needs request */}

      <ReusableModal show={showModal} onHide={handleCloseModal} title={`Update (${selectedItem?.itemName}) request`}>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control type='text' value={selectedItem?.itemName} disabled />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
            <Form.Label>Quantity</Form.Label>

              <Form.Control type="number" onChange={(e) => setFormData({ ...formData,quantity: e.target.value })} min={0} value={formData?.quantity} />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
            <Form.Label className='d-block'>Issued To</Form.Label>

              <Form.Control type='text' onChange={(e) => setFormData({ ...formData,issuedTo: e.target.value })} value={formData.issuedTo} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
            <Form.Label className='d-block'>Issued On</Form.Label>

            <DatePicker
              id="admissionDate"
              className='form-control d-block'
              style={{width:"100%"}}
              selected={formData.issuedOn}
              minDate={new Date()}
              onChange={(date) => setFormData({...formData,issuedOn:date})}
              showTimeSelect
             
              dateFormat="yyyy-MM-dd h:mm aa"
            /></Form.Group>  </Col>
          </Row>
          <Button type="submit">{loading ? "Issuing Item " : "Issue Item"}</Button>

        </Form>

      </ReusableModal>

      <ReusableTable
        columns={departmentNeedsColumns}
        data={data}
        initialState={initialState}
        ActionDropdown={({ row }) => (
          <div>
            {/* add a drop down button menu wth icons and functions */}
            <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">

              <Dropdown.Item href="#/action-2" onClick={() => handleRowClick(row.original, 'action')}>
                Issue Item
              </Dropdown.Item>

              <Dropdown.Item href="#/action-2">
                Cancel Request
              </Dropdown.Item>

            </DropdownButton>
          </div>
        )}

      />
    </div>

  )
}

export default DepartmentNeeds