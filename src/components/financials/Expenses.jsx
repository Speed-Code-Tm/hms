import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import ReusableModal from '../ReusableModal'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { addExpense, deleteExpense, retrieveExpenses, updateExpense } from '../../pages/configs'
import ReusableTable from '../../pages/ReusableTable'
import ConfirmationModal from '../ConfirmationModal'
import { serverTimestamp } from 'firebase/firestore'

const Expenses = ({ expenses, refetch}) => {
    const [showModal,setShowModal] = useState(false)
    const [selectedExpense,setSelectedExpense] = useState()
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        category: '',
        department: '',
        amount: '',
      });

      const handleRowClick=(expense, action) =>{

        setSelectedExpense(expense)
        
        if(action === 'update'){
          setShowModal(true)
        }else if( action === 'delete'){
          setShowConfirmDelete(true)
        }
      }


      const confirmDelete = async () =>{
        try{

          await deleteExpense(selectedExpense.id)
          handleCloseModal()
          refetch()
        }catch(error){
          console.log(error);
        }
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



      const handleCloseModal = () =>{
        setShowModal(false)
        setShowConfirmDelete(false)
        setSelectedExpense(null)
        setFormData({
          category:'',
          department:'',
          amount:'',

      })
      }


      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
       try {
          
        await expenseSchema.validate(formData, {abortEarly:false})
        let message;

        if(selectedExpense){

          await updateExpense(selectedExpense.id, {...formData, department: formData.department.value
            ,category:formData.category.value})

          message = "Expense updated"

        }else{
        await addExpense({...formData, department: formData.department.value, createdAt: serverTimestamp(),category:formData.category.value})

          message = "Expense added"
        }


        toast.success(message)
        handleCloseModal()
       await refetch()
        
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

  useEffect(()=>{
    if(selectedExpense){
      setFormData({amount:selectedExpense.amount,category:{label:selectedExpense?.category, value:selectedExpense?.category
      },department:{label:selectedExpense?.department, value:selectedExpense?.department}
      })
    }
  },[selectedExpense])
  
  return (
    <div>
        <ReusableModal title={!selectedExpense ? "Add Expense": "Update Expense"} onHide={handleCloseModal} show={showModal}>  
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
      <Button variant="primary" disabled={loading} type="submit">
        {selectedExpense ? loading? "Updating ": "Update"  : loading ? 'Submitting...': 'Add Expense'}
       
      </Button>
            </Form>
        </ReusableModal>
        
      <div className="d-flex justify-content-between py-3">
      <Button onClick={()=>setShowModal(true)}>Add Expense</Button>
      </div>

{/* expense deletion confirmation modal */}

<ConfirmationModal
handleClose={handleCloseModal}
handleConfirm={confirmDelete}
show={showConfirmDelete}
message={"Are you sure you want to remove this expense?"}
/>
      <ReusableTable
      columns={expenseColumns}
      data={expenses}
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

export default Expenses
