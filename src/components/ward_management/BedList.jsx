
import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import ReusableModal from '../ReusableModal';
import ReusableTable from '../../pages/ReusableTable';
import Select from 'react-select'
import AddBed from './AddBed';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { addWard, retrieveBeds, retrieveWards } from '../../pages/configs';

const BedList = ({showModal,setShowModal, activeTab}) => {
  const [showModal2,setShowModal2]  =useState(false)
  const [ward,setWard] = useState()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bedNo: '',
    occupied: ''
  });
  const wardColumns = [
    { Header: "No/Name", accessor: "bedNo" },
    { Header: "Ward", accessor: "wardName" },
    { Header: "Status", accessor: "occupied",

    Cell: ({ value }) => (
        <Badge variant={value ===true ? 'danger' : 'success'}>
          {value ===true? 'occupied':'empty'}
        </Badge>
      ),

     },
    
  ];



  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });



  function handleRowClick(ward,action){
   
    setWard(ward.original)
    if(action === 'add' || action === 'update'){
      setShowModal2(true)
    }
  }
   
  const bedSchema = yup.object().shape({
    bedNo: yup.string().required('Bed number is required'),
  });
  

async function submitHandler(e){
  e.preventDefault()
  setLoading(true)
  try {
    let  submittedData =  {...formData, category: formData.category.value}
    await bedSchema.validate(formData,{abortEarly:false})
            
   
    //update bed

      setShowModal(false)
  } catch (error) {
   
    if (error.inner && error.inner.length > 0) {
      const firstErrorMessage = error.inner[0].message;
      toast.error(`Please fix the following error: ${firstErrorMessage}`);
    } else {
      toast.error(
        "An unknown validation error occurred. Please check the form data."
      );
    }
  }finally{
    setLoading(false)
  }
}

    
      const handleInputChange = (field, value) => {
        setFormData({
          ...formData,
          [field]: value
        });
      };


      async function fetchBeds(){
        try {
         const data =  await retrieveBeds()
         setData(data)
        } catch (error) {
          console.log(error)
        }

      }

      useEffect(()=>{
       if(activeTab === 'beds'){
        fetchBeds()
       }
      },[activeTab])
      
  return (
    <div>
      {/* modal for adding a new ward */}
      <ReusableModal title={"Update Bed"} show={showModal} onHide={()=>setShowModal(false)}>

      <Form onSubmit={submitHandler}>
      <Row>
       <Col>
        <Form.Group  controlId="bedNo">
          <Form.Label>Bed Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bed no"
            value={formData.bedNo}
            onChange={(e) => handleInputChange('bedNo', e.target.value)}
          />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group>
        <Form.Label  sm={2}>
          Occupied
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={formData.occupied ?"occupied": 'empty'}
            checked={formData.occupied}
            onChange={(e) => handleInputChange('occupied', e.target.checked)}
          />
        </Col>
      </Form.Group>
        </Col>
      </Row>
     
     
      

      <Button variant="primary" className='mt-3' type="submit">
        Add Bed
      </Button>
    </Form>

    </ReusableModal>

    {/* modal for adding a new bed */}
    <ReusableModal show={showModal2}  onHide={()=>setShowModal2(false)} title={`${ward?.name} | Add Bed`}>

<AddBed onHide={()=>setShowModal2(false)} ward={ward}/>
    </ReusableModal>

    <ReusableTable
    
    columns={wardColumns}
    data={data}
    initialState={initialState}
    ActionDropdown={({ row }) => (
      <div>
        {/* add a drop down button menu wth icons and functions */}
        <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
        
        <Dropdown.Item href="#/action-2">
       Update
          </Dropdown.Item>
         
          <Dropdown.Item href="#/action-2">
       Delete
          </Dropdown.Item>
         
        </DropdownButton>
      </div>
    )}


    />

    </div>
  )
}

export default BedList
