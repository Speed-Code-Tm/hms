import React, { useMemo, useState } from "react";
import {
  Container,
  Button,
} from "react-bootstrap";
import VitalSigns from '../components/AddVitals'
import ReusableTable from "./ReusableTable";
const TriageAssessment = () => {
  const [showVitalsModal,setshowVitalsModal] = useState(false)

  const [data, setData] = useState([
    {
      name: "John Doe",
      phoneNumber: "555-1234",
      address: "123 Main St",
      age: 35,
      sex: "Male",
      primaryInsurance: "ABC Insurance",
    },
  ]);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Sex",
      accessor: "sex",
    },
    {
      Header: "Primary Insurance",
      accessor: "primaryInsurance",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const ToggleVitalsModal = () => {
    setshowVitalsModal(!showVitalsModal)
  }


  return (
    <Container className="triage-assessment-container">
     <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <div>
            <Button variant="primary" onClick={ToggleVitalsModal} >
              Add Vitals
            </Button>
          </div>
        )}
      />

      <VitalSigns
        show={showVitalsModal}
        onHide={() => setshowVitalsModal(false)}
      />
    </Container>
  );
};


export default TriageAssessment;
