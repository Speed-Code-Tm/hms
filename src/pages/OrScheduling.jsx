import { useState } from "react";
import { Dropdown, DropdownButton,Badge, Container, Button } from "react-bootstrap"
import ReusableTable from "./ReusableTable";
import ReusableModal from "../components/ReusableModal";
import ScheduleSurgery from "../components/surgerymanagement/ScheduleSurgery";

const OrScheduling = () =>{
    const [initialState, setInitialState] = useState({
        pageIndex: 0,
        pageSize: 10,
      });

      const [showModal,setShowModal] = useState(false)

    const surgeries = [
        {
          id: '1',
          patientName: 'John Doe',
          procedure:'Procedure2',
          surgeons: ['Dr. Smith', 'Dr. Johnson'],
          surgeryRoom: 'OR-101',
          scheduledDate: new Date('2024-06-10T09:00:00')?.toLocaleString(),
          status: 'Scheduled'
        },
        {
          id: '2',
          patientName: 'Jane Smith',
          procedure:'Procedure2',
          surgeons: ['Dr. Lee'],
          surgeryRoom: 'OR-102',
          scheduledDate: new Date('2024-06-11T11:00:00').toLocaleString(),
          status: 'Preoperative'
        },
       
      ];

    const surgeryScheduleColumns = [
        {Header:"Patient", accessor:"patientName"},
        {Header:"Procedure", accessor:"procedure"},
       {Header: "Surgeons", 
        accessor: "surgeons",
        Cell: ({ value }) => value ? value.join(', ') : '' },
        {Header:"Or-Room", accessor:"surgeryRoom"},
        {Header:"Scheduled Date", accessor:"scheduledDate"},
        {Header:"Status", accessor:"status", Cell: ({ value }) => <Badge bg={getStatusColor(value)}>{value}</Badge>
    },
    ]

    const handleRowClick = () =>{

    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Scheduled":
                return "primary";
            case "Preoperative":
                return "primary";
            case "Postoperative":
                 return "primary";
            case "Inprogress":
                 return "secondary";
            case "Rescheduled":
                  return "warning";
            case "Cancelled":
                 return "danger";
            case "complete":
                 return "success";
            default:
                return "secondary";
        }
      };

    return (

        <Container className="py-3">

<div className="d-flex justify-content-end">
    <Button onClick={()=>setShowModal(true)}>Schedule Surgery</Button>
</div>

{/* schedule surgery modal */}

<ReusableModal title="Schedule Surgery" show={showModal} onHide={closeModal}>

    <ScheduleSurgery onClose={closeModal}/>

</ReusableModal>



        <ReusableTable
 columns={surgeryScheduleColumns}
 data={surgeries}
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
         onClick={() => handleRowClick(row.original)}
       >
         Request Item
       </Dropdown.Item>

     </DropdownButton>
   </div>
 )}
/>
        
        </Container>
    )
}

export default OrScheduling