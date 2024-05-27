import React, { useEffect, useState } from 'react'
import ReusableTable from '../../pages/ReusableTable'
import ReusableModal from '../ReusableModal'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addBudget, deleteBudget, retrieveBudgets, updateBudget } from '../../pages/configs';
import * as Yup from 'yup';
import ConfirmationModal from '../ConfirmationModal';


const DepartmentBudget = ({ budgets, refetch}) => {
    const [showModal,setShowModal] = useState(false)
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const [selectedBudget,setSelectedBudget] = useState()
    const [formData, setFormData] = useState({
        department: '',
        amount: '',
        startDate: new Date(),
        endDate: new Date(),
      });
    const [loading,setLoading] = useState(false)
    const [data,setData] =useState([])


    const initialState = {
      pageIndex: 0,
      pageSize: 10,
    };

    const departmentBudgetColumns = [
      {Header:"Department", accessor:'department'},
      {Header:"Budget Amount", accessor:'amount'},

      {Header:'Start Date', accessor:'startDate'},
      {Header:'End Date', accessor:'endDate'}

  ]

      const departments = [
        { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Ict', label: 'ICT' },
  { value: 'Health Records', label: 'Health Records' },
  { value: 'Procurement', label: 'Procurement' },
      ];

      const handleRowClick=(budget, action) =>{

        setSelectedBudget(budget)
        
        if(action === 'update'){
          setShowModal(true)
        }else if( action === 'delete'){
          setShowConfirmDelete(true)
        }
      }


      const confirmDelete = async () =>{
        try{

          await deleteBudget(selectedBudget.id)
          handleCloseModal()
          refetch()
        }catch(error){
          console.log(error);
        }
      }


      const handleCloseModal = () =>{
        setShowModal(false)
        setShowConfirmDelete(false)
        setSelectedBudget(null)
        setFormData({
          department: '',
          amount: '',
          startDate: new Date(),
          endDate: new Date(),
        })
      }

      const handleChange = (fieldName, value) => {

        let updatedValue = value;
  if (fieldName === 'startDate' || fieldName === 'endDate') {
    updatedValue = value.toISOString(); 
  }

        setFormData({
          ...formData,
          [fieldName]: updatedValue
        });
      };


      const budgetValidationSchema = Yup.object().shape({
        department: Yup.string().required('Department is required'),
        amount: Yup.number()
          .typeError('Budget amount must be a number')
          .required('Budget amount is required')
          .positive('Budget amount must be a positive number'),
        startDate: Yup.date().required('Start Date is required'),
        endDate: Yup.date()
          .required('End Date is required')
          .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
      });

      const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        try {
          
          await budgetValidationSchema.validate(formData, {abortEarly:false})
          let message;

          if(selectedBudget){

            await updateBudget(selectedBudget.id, {...formData,department:formData.department,endDate:formData.endDate, startDate:formData.startDate})

            message = "Budget Updated"
          }else{
            await addBudget({...formData,department:formData.department,endDate:formData.endDate, startDate:formData.startDate})

            message = "Budget Created"
          }


          toast.success(message)

         
         handleCloseModal()
         refetch()
        } catch (error) {
         console.log(error);
          
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
        
      };


      useEffect(()=>{
        if(selectedBudget){
          setFormData({
            ...formData,
            department:selectedBudget.department,
            amount:selectedBudget.amount,
            startDate:new Date(selectedBudget?.startDate?.seconds * 1000),
            endDate:new Date(selectedBudget?.endDate?.seconds * 1000)

          
          })
        }
      },[selectedBudget])
      


    
  return (
    <div>

        <ReusableModal title={!selectedBudget?"Add Budget":"Update Budget" } show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
      <Row className='mb-3'>
        <Col md={6}>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Select
              options={departments}
              value={departments.find(d => d.value === formData.department)}
              onChange={(selectedOption) => handleChange('department', selectedOption.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="amount">
            <Form.Label>Budget Amount</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <Form.Group controlId="startDate">
            <Form.Label className='d-block'>Start Date</Form.Label>
            <DatePicker
              id="startDate"
              className='form-control'
              selected={formData.startDate}
              onChange={(date) => handleChange('startDate', date)}
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="endDate">
            <Form.Label className='d-block'>End Date</Form.Label>
            <DatePicker
              id="endDate"
              selected={formData.endDate}
              className='form-control'
              onChange={(date) => handleChange('endDate', date)}
              dateFormat="yyyy-MM-dd"
              minDate={formData.startDate}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" onClick={()=>setShowModal(true)} disabled={loading}>{loading ?"Submitting..." :"Create Budget"}</Button>
    </Form>



        </ReusableModal>


        {/* budget deletion confirmation modal */}

        <ConfirmationModal

        show={showConfirmDelete}

        handleConfirm={confirmDelete}

        handleClose={handleCloseModal}

        message="Are you sure you want to remove this budget"

        />

        <div className="d-flex justify-content-between py-3">
            <Button onClick={()=>setShowModal(true)} >Add Budget</Button>
        </div>
      <ReusableTable
        columns={departmentBudgetColumns}
        initialState={initialState}
        data={budgets}
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

export default DepartmentBudget
