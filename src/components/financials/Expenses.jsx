import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import ReusableModal from '../ReusableModal'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { addExpense, retrieveExpenses } from '../../pages/configs'
import ReusableTable from '../../pages/ReusableTable'

const Expenses = ({activeTab}) => {
    const [showModal,setShowModal] = useState(false)
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        category: '',
        department: '',
        amount: '',
      });

      const handleRowClick=() =>{

      }



    const expenseCategories = [
        { value: 'salaries', label: 'Salaries' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'maintenance', label: 'Maintenance' },
      ];
    
      const departments = [
        { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Ict', label: 'ICT' },
  { value: 'Health Records', label: 'Health Records' },
  { value: 'Procurement', label: 'Procurement' },
      ];

    const handleInputChange = (field, value) => {
        setFormData({
          ...formData,
          [field]: value,
        });
      };
      const expenseSchema = Yup.object().shape({
        category: Yup.object().shape({
          value: Yup.string().required('Expense category is required'),
        }),
        department: Yup.object().shape({
          value: Yup.string().required('Department is required'),
        }),
       
        amount: Yup.number()
          .required('Amount is required')
          .positive('Amount must be a positive number')
          .test('valid-amount', 'Amount must be a valid number', (value) => !isNaN(value)),
      });


      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
       try {
          
        await expenseSchema.validate(formData, {abortEarly:false})

        await addExpense({...formData, department: formData.department.value, category:formData.category.value})

        toast.success('Expense added')
        setShowModal(false)
       await fetchExpense()
        setData({
            category:'',
            department:'',
            amount:''
        })
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
      };
    const expenseColumns = [
        {Header:"Expense", accessor:'category'},
        {Header:"Department", accessor:'department'},
        {Header:'Amount', accessor:'amount'},
        {Header:'CreatedAt', accessor:'createdAt'}

    ]

    
  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  };

    async function fetchExpense(){
      const expenses = await retrieveExpenses()

      setData(expenses)
    }
    useEffect(()=>{
        if(activeTab === 'expenses'){
            fetchExpense()
        }
    },[activeTab])
  return (
    <div>
        <ReusableModal title="Add Expense" onHide={()=>setShowModal(false)} show={showModal}>  
            <Form onSubmit={handleSubmit}>
            <Row className='mb-3'>
        <Col md={6}>
          <Form.Group controlId="category">
            <Form.Label>Expense Category</Form.Label>
            <Select
              options={expenseCategories}
              value={formData.category}
              onChange={(selectedOption) => handleInputChange('category', selectedOption)}
              placeholder="Select expense category"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Select
              options={departments}
              value={formData.department}
              onChange={(selectedOption) => handleInputChange('department', selectedOption)}
              placeholder="Select department"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
       
        <Col md={6}>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
            </Form>
        </ReusableModal>
        
      <div className="d-flex justify-content-between py-3">
      <Button onClick={()=>setShowModal(true)}>Add Expense</Button>
      </div>

      <ReusableTable
      columns={expenseColumns}
      data={data}
      initialState={initialState}
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
      )}
    />
    </div>
  )
}

export default Expenses
