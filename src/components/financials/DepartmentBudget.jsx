import React, { useEffect, useState } from 'react'
import ReusableTable from '../../pages/ReusableTable'
import ReusableModal from '../ReusableModal'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addBudget, retrieveBudgets } from '../../pages/configs';
import * as Yup from 'yup';


const DepartmentBudget = ({activeTab}) => {
    const [showModal,setShowModal] = useState(false)
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

      const handleRowClick = (item)=>{

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

          console.log(typeof formData.endDate);

          await addBudget({...formData,department:formData.department,endDate:formData.endDate, startDate:formData.startDate})

          toast.success('Budget Created')

          setFormData({
            department: '',
            amount: '',
            startDate: new Date(),
            endDate: new Date(),
          })
          setShowModal(false)
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

      async function fetchBudgets(){

        const budgets = await retrieveBudgets()
        console.log(budgets);
        setData(budgets)

    }


    useEffect(()=>{
      console.log(activeTab)
      if(activeTab === 'budgets'){
        fetchBudgets()
      }
    },[activeTab])
  return (
    <div>

        <ReusableModal title="Add Budget" show={showModal} onHide={()=>setShowModal(false)}>
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

        <div className="d-flex justify-content-between py-3">
            <Button onClick={()=>setShowModal(true)} >Add Budget</Button>
        </div>
      <ReusableTable
        columns={departmentBudgetColumns}
        initialState={initialState}
        data={data}
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
                onClick={() => handleRowClick(row.original, 'edit')}
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
        )}v
/>
    </div>
  )
}

export default DepartmentBudget
