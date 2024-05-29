import { Dropdown, DropdownButton } from "react-bootstrap";
import ReusableTable from "../../pages/ReusableTable";

const EmployeeWage = () =>{

     // Define the columns for the employee wages table
  const employeeWagesColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Position', accessor: 'position' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Wage', accessor: 'wage' },
  ];

  const initialState = {
    pageIndex: 0,
    pageSize: 10,
};

const employeeWages = [
  { id: 1, name: 'John Doe', position: 'Doctor', department: 'Surgery', wage: 8000 },
  { id: 2, name: 'Jane Smith', position: 'Nurse', department: 'Emergency', wage: 5000 },
  // Add more employee wages as needed
];
    return (
      <>

        <ReusableTable
        
        columns={employeeWagesColumns} data={employeeWages} initialState={initialState}
                            
                            ActionDropdown={({ row }) => (
                              <div>
                                {/* add a drop down button menu wth icons and functions */}
                                <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
                                                        
                                  <Dropdown.Item href="#/action-1"  >
                                  Update
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2"> 
                                  Delete
                                  </Dropdown.Item>
                                 
                                </DropdownButton>
                              </div>
                            )}
        />
</>
    )
}


export default EmployeeWage