import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../pages/configs'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import ReusableTable from '../pages/ReusableTable'

const DepartmentNeeds = ({activeTab}) => {
    const [data,setData] = useState([])
    const [initialState, setInitialState] = useState({
        pageIndex: 0,
        pageSize: 10,
      });
const [showModal,setShowModal] = useState(false)
    const departmentNeedsColumns = [
        { Header: "Item", accessor: "itemName" },
        { Header: "Quantity", accessor: "quantity" },
        { Header: "Department", accessor: "department" },
        { Header: "Requested By", accessor: "requestedBy" },
        { Header: "Request Date", accessor: "requestDate" },
      ];


      const handleRowClick =(item) =>{

      }
      
    
    const fetchData = async () =>{
        const departmentNeedsCollection = collection(db, 'departmentNeeds')

        const departmentNeedsSnapshot = await getDocs(departmentNeedsCollection);

        const departmentNeedsData = departmentNeedsSnapshot.docs.map(doc => {
            
            const data = doc.data();

            return { id: doc.id, ...data };
        });

        setData(departmentNeedsData);

    }

    useEffect(()=>{
        if(activeTab === 'departmentNeeds'){
        fetchData()}
    }, [activeTab])
  return (
    <ReusableTable
      columns={departmentNeedsColumns}
      data={data}
      initialState={initialState}
      ActionDropdown={({ row }) => (
        <div>
          {/* add a drop down button menu wth icons and functions */}
          <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
          
          <Dropdown.Item href="#/action-2">
          Issue Item
            </Dropdown.Item>
           
            <Dropdown.Item href="#/action-2">
           Cancel Request
            </Dropdown.Item>
           
          </DropdownButton>
        </div>
      )}
      
    />
  )
}

export default DepartmentNeeds