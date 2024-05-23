import React, { useState, useEffect, useMemo } from "react";
import { Container, DropdownButton, Dropdown } from "react-bootstrap";
import { FaCalendarAlt, FaBed } from "react-icons/fa";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../pages/configs";
import ReusableTable from "./ReusableTable";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PatientSchedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientsCollection = collection(db, "patients");
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsData = patientsSnapshot.docs.map((doc) => {
        const patientData = doc.data();
        const patientId = doc.id;
        const patientInfo = patientData[patientId] || {};
        return {
          id: patientId,
          personalInfo: patientInfo.personalInfo || {},
        };
      });
      setData(patientsData);
    };

    fetchData();
  }, []);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: (row) =>
        `${row.personalInfo.firstName || ""} ${
          row.personalInfo.middleName || ""
        } ${row.personalInfo.lastName || ""}`,
    },
    {
      Header: "Gender",
      accessor: (row) => row.personalInfo.gender || "",
    },
    {
      Header: "Date of Birth",
      accessor: (row) => row.personalInfo.dateOfBirth || "",
    },
    {
      Header: "Phone Number",
      accessor: (row) => row.personalInfo.phoneNumber || "",
    },
    {
      Header: "Emergency Phone Number",
      accessor: (row) => row.personalInfo.emergencyPhoneNumber || "",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <Container className="" fluid>
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <DropdownButton
            dropup={true}
            id={`actions-dropdown-${row.id}`}
            title="Actions"
          >
            <Dropdown.Item href="#/action-1">
              <FaCalendarAlt /> View Vitals
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <FaBed /> Add doctor's notes
            </Dropdown.Item>
          </DropdownButton>
        )}
      />
    </Container>
  );
};

export default PatientSchedule;