import React, { useMemo, useState } from "react";
import { Container, Button } from "react-bootstrap";
import PatientEHR from "./patientEHR";
import ReusableTable from "./ReusableTable";
const EHR = () => {
  const [data, setData] = useState([
    {
      patientId: "P001",
      firstName: "John",
      lastName: "Doe",
      dob: "1985-01-15",
      gender: "Male",
      address: "123 Main St",
      phoneNumber: "555-1234",
      email: "john.doe@example.com",
      emergencyContact: "Jane Doe - 555-5678",
    },
    {
      patientId: "P002",
      firstName: "Jane",
      lastName: "Smith",
      dob: "1990-05-22",
      gender: "Female",
      address: "456 Elm St",
      phoneNumber: "555-5678",
      email: "jane.smith@example.com",
      emergencyContact: "John Smith - 555-8765",
    },
    {
      patientId: "P003",
      firstName: "Alice",
      lastName: "Johnson",
      dob: "1978-11-30",
      gender: "Female",
      address: "789 Maple St",
      phoneNumber: "555-8765",
      email: "alice.johnson@example.com",
      emergencyContact: "Bob Johnson - 555-4321",
    },
  ]);

  const COLUMNS = [
    {
      Header: "Patient ID",
      accessor: "patientId",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Date of Birth",
      accessor: "dob",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Emergency Contact",
      accessor: "emergencyContact",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <Container className="triage-assessment-container">
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <div>
            <Button variant="primary" href={`/PatientEHR/${row.original.patientId}`}>
              view
            </Button>
          </div>
        )}
      />
    </Container>
  );
};

export default EHR;
