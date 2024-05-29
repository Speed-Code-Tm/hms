import ReusableTable from '../../pages/ReusableTable'
import { DropdownButton, Dropdown } from 'react-bootstrap';
const DepartmentsProjection = () =>{

    
const projections = [
    { id: 1, department: 'Surgery', revenue: 1000000, expenses: 800000, profit: 200000 },
    { id: 2, department: 'Radiology', revenue: 600000, expenses: 400000, profit: 200000 },
    // Add more projections as needed
  ];

  // Define the columns for the projections table
  const projectionsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Revenue', accessor: 'revenue' },
    { Header: 'Expenses', accessor: 'expenses' },
    { Header: 'Profit', accessor: 'profit' },
  ];

  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  }

    return (
        <ReusableTable

        columns={projectionsColumns} data={projections} initialState={initialState}
                            
        ActionDropdown={({ row }) => (
          <div>
            {/* add a drop down button menu wth icons and functions */}
            <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
                                   
              <Dropdown.Item href="#/action-1">
              Update
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2"> 
              Delete
              </Dropdown.Item>
             
            </DropdownButton>
          </div>
        )}

        />
    )
}

export default DepartmentsProjection
