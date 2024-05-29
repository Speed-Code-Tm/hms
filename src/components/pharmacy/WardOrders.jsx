import {useState} from 'react'
import { Badge, Container, Dropdown, DropdownButton } from "react-bootstrap"
import ReusableTable from "../../pages/ReusableTable"

const WardOrders = () =>{
    const [data,setData] = useState(
        [
            {
              id: "ORD001",
              wardName: "Ward A",
              medicineName: "Paracetamol",
              quantity: 100,
              status: "pending",
              dateOrdered: "2024-05-16"
            },
            {
              id: "ORD002",
              wardName: "Ward F",
              medicineName: "Ibuprofen",
              quantity: 50,
              status: "ordered",
              dateOrdered: "2024-05-15"
            },
            {
              id: "ORD003",
              wardName: "Ward E",
              medicineName: "Amoxicillin",
              quantity: 80,
              status: "pending",
              dateOrdered: "2024-05-14"
            },
            {
              id: "ORD004",
              wardName: "Emergency Ward",
              medicineName: "Aspirin",
              quantity: 120,
              status: "ordered",
              dateOrdered: "2024-05-13"
            }
          ]
    )

    const wardOrdersColumns  = [
        {Header:"Ward", accessor:"wardName"},
        {Header:'Medicine', accessor:"medicineName"},
        {Header:"Quantity", accessor:'quantity'},
        {Header:"Status", accessor:'status',
        Cell: ({ value }) => <Badge bg={getStatusColor(value)}>{value}</Badge>},
        {Header:'dateOrdered', accessor:'dateOrdered'}
    ]

    const initialState =  {
        pageIndex:0,
        pageSize:10
    }

    const handleRowClick = ()=>{

    }

    const getStatusColor = (status) => {
        switch (status) {
          case "pending":
            return "warning";
          case "complete":
            return "success";
          default:
            return "secondary";
        }
      };


    return (
        <Container className='py-3'>
            <ReusableTable
            data={data}
            columns={wardOrdersColumns}
            initialState={initialState}

            ActionDropdown={({row})=>(
                <div>
                    <DropdownButton 
                    dropup="true"
                    id="dropdown-basic-button"
                    title="Actions"
                    >

<Dropdown.Item
              href="#/action-1"
              onClick={() => handleRowClick(row.original, 'edit')}
            >
             Issue Medicine
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
        </Container>
    )
}

export default WardOrders