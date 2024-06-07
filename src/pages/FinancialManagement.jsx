import React, { useEffect, useState } from 'react';
import ReusableTable from './ReusableTable';
import { Button, Dropdown, Tabs, Tab, Modal, Form, Badge, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Expenses from '../components/financials/Expenses';
import DepartmentBudget from '../components/financials/DepartmentBudget';
import { retrieveBudgets, retrieveExpenses } from './configs';
import EmployeeWage from '../components/financials/EmployeeWage'
import DepartmentsProjection from '../components/financials/DepartmentsProjection'
// Mock data for procurement items, department budgets, employee wages, and projections
const procurementItems = [
  { id: 1, item: 'Surgical Gloves', quantity: 1000, requestedBy: 'Surgery Dept', addedBy: 'John Doe', status: 'Pending' },
  { id: 2, item: 'Gauze Pads', quantity: 500, requestedBy: 'Emergency Dept', addedBy: 'Jane Smith', status: 'Approved' },
  // Add more procurement items as needed
];

const departmentBudgets = [
  { id: 1, department: 'Surgery', budgetAllocated: 500000 },
  { id: 2, department: 'Radiology', budgetAllocated: 300000 },
  // Add more department budgets as needed
];


const FinancialManagement = () => {
  const [activeTab,setActiveTab] = useState('expenses')
  const [expenses,setExpenses] = useState([])
  const [budgets,setBudgets] = useState([])
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedProcurementItem, setSelectedProcurementItem] = useState(null);

  // Define the columns for the procurement items table
  const procurementItemsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Item', accessor: 'item' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Requested By', accessor: 'requestedBy' },
    { Header: 'Added By', accessor: 'addedBy' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Badge variant={value === 'Approved' ? 'success' : 'warning'}>{value}</Badge>
      ),
    },
   
  ];

  // Define the columns for the department budgets table
  const departmentBudgetsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Budget Allocated', accessor: 'budgetAllocated' },
  ];

 

  

  // Define the action dropdown component for procurement item rows
  const ProcurementItemActionDropdown = ({ row, handleApprovalModalOpen }) => {
    const procurementItem = row.original;

    const handleApprove = () => {
      setSelectedProcurementItem(procurementItem);
      handleApprovalModalOpen();
    };

   

    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id={`procurement-action-${procurementItem.id}`}>
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {procurementItem.status === 'Pending' && (
            <Dropdown.Item onClick={handleApprove}>Approve</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleApprovalModalOpen = (procurementItem) => {
    setSelectedProcurementItem(procurementItem);
    setShowApprovalModal(true);
  };

  const handleApprovalModalClose = () => {
    setSelectedProcurementItem(null);
    setShowApprovalModal(false);
  };

  const handleApprove = () => {
    // Implement logic to approve the selected procurement item
    
    handleApprovalModalClose();
  };


  async function fetchExpense(){
    try{
      const expenses = await retrieveExpenses()
      
      setExpenses(expenses)
    }catch(error){
      console.log(error)
    }
  
  }

  async function fetchBudgets(){
try{
  const budgets = await retrieveBudgets()
    setBudgets(budgets)
}catch(error){
  console.log(error)
}
  

}
  useEffect(()=>{
    
      if(activeTab === 'expenses'){
          fetchExpense()
      } else if(activeTab === 'budgets'){
        fetchBudgets()
      }
  },[activeTab])

  return (
    <Container Fluid style={{marginTop:"20px"}}>
      <Tabs 
      activeKey={activeTab}
         onSelect={(key) => setActiveTab(key)}
         
      
      >
        <Tab eventKey="expenses" title="Expenses"
         activeKey={activeTab}
        
        >
          <Expenses refetch={fetchExpense} expenses={expenses} activeTab={'expenses'}/>
        </Tab>
        <Tab eventKey="budgets" title="Department Budgets">

          <DepartmentBudget refetch={fetchBudgets} budgets={budgets} activeTab='budgets'/>
         
         
        </Tab>
        <Tab eventKey="wages" title="Employee Wages">
    
    <EmployeeWage/>
        </Tab>
        <Tab eventKey="projections" title="Projections">
         
         <DepartmentsProjection/>
         
        </Tab>
      </Tabs>

      <Modal show={showApprovalModal} onHide={handleApprovalModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Procurement Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProcurementItemDetails item={selectedProcurementItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleApprovalModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ProcurementItemDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default FinancialManagement;