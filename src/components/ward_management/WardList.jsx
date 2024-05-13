import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import ReusableModal from '../ReusableModal';
import ReusableTable from '../../pages/ReusableTable';
import Select from 'react-select'
import AddBed from './AddBed';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { addWard, retrieveWards } from '../../pages/configs';

const WardList = ({showModal,setShowModal, activeTab}) => {
  const [showModal2,setShowModal2]  =useState(false)
  const [ward,setWard] = useState()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: null,
    beds: ''
  });
  const wardColumns = [
    { Header: "Name", accessor: "name" },
    { Header: "Category", accessor: "category" },
    { Header: "beds", accessor: "beds" },
    
  ];

  // const data = [
  //   { id: 1, name: 'Ward A', category: 'Executive ward', beds: 20 },
  //   { id: 2, name: 'Ward B', category: 'General ward', beds: 15 },
  //   { id: 3, name: 'Ward C', category: 'Maternity', beds: 25 },
  //   { id: 4, name: 'Ward D', category: 'Pediatrics', beds: 18 },
  //   { id: 5, name: 'Ward E', category: 'Executive ward', beds: 12 },
  // ];

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
   
  const wardSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    beds: yup.number().required('Number of beds is required').positive('Number of beds must be positive'),
  });
  

async function submitHandler(e){
  e.preventDefault()
  setLoading(true)
  try {
    let  submittedData =  {...formData, category: formData.category.value}
      await wardSchema.validate(submittedData, {abortEarly:false})

      await addWard(submittedData)
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


      async function fetchWards(){
        try {
         const data =  await retrieveWards()
         setData(data)
        } catch (error) {
          console.log(error)
        }

      }

      useEffect(()=>{
        
        
       if(activeTab === 'wards'){
       
        fetchWards()
       }
      },[activeTab])
      
  return (
    <div>
      {/* modal for adding a new ward */}
      <ReusableModal title={"Wards"} show={showModal} onHide={()=>setShowModal(false)}>

       <Form onSubmit={submitHandler}>
      <Row className='mb-3'>
        
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Group>
        </Col>
        
        <Col>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Select
              options={[
                { value: 'General Ward', label: 'General Ward' },
                { value: 'ICU ward', label: 'ICU ward' },
                { value: 'Pediatric Ward', label: 'Pediatric Ward' }
              ]}
              value={formData.category}
              onChange={(selectedOption) => handleInputChange('category', selectedOption)}
              placeholder="Select category"
            />
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="beds">
        <Form.Label>Beds</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter number of beds"
          value={formData.beds}
          onChange={(e) => handleInputChange('beds', e.target.value)}
        />
      </Form.Group>
        </Col>
      </Row>
      
     
      <Button disabled={loading} variant="primary" type="submit">
       { loading ? "Submitting... ":"Add Ward"}
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

        <Dropdown.Item href="#/action-2" onClick={()=>handleRowClick(row, 
        'add'
        )}>
      Add Bed
          </Dropdown.Item>
        
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

export default WardList
