import React, { useState, useEffect, useMemo } from "react";
import { Container, DropdownButton, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../pages/configs";
import ReusableTable from "./ReusableTable";
import { FaNotesMedical, FaUserNurse, FaCapsules, FaFlask, FaXRay, FaBed } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import NursingNotes from "../components/AddNursingNotes"; // Import the NursingNotes component
import DoctorsNotes from "../components/DoctorsNotes";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PatientManagement = () => {
  const [data, setData] = useState([]);
  const [showDoctorsNotes, setShowDoctorsNotes] = useState(false);
  const [showNursingNotes, setShowNursingNotes] = useState(false); // State to control the visibility of NursingNotes modal
  
  const toggleDoctorsNotes = () => setShowDoctorsNotes(!showDoctorsNotes);
  const toggleNursingNotes = () => setShowNursingNotes(!showNursingNotes); // Function to toggle the visibility of NursingNotes modal

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
        `${row.personalInfo.firstName || ""} ${row.personalInfo.middleName || ""} ${row.personalInfo.lastName || ""}`,
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
      Header: "Gender",
      accessor: (row) => row.personalInfo.gender || "",
    },
    {
      Header: "Emergency Phone Number",
      accessor: (row) => row.personalInfo.emergencyPhoneNumber || "",
    },
    {
      Header: "Diagnosis",
      accessor: (row) => row.diagnosis || "",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <Container className="patient-management-container">
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <DropdownButton dropup={true} id={`actions-dropdown-${row.id}`} title="Actions">
            <Dropdown.Item href="#/action-1" onClick={toggleNursingNotes}> {/* Add event handler to open NursingNotes modal */}
              <FaUserNurse /> Add Nursing Notes
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={toggleDoctorsNotes}>
              <FaNotesMedical /> Add Doctor's Notes
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={() => console.log("Order Medicine")}>
              <FaCapsules /> Order Medicine
            </Dropdown.Item>
            <Dropdown.Item href="#/action-4" onClick={() => console.log("Order Lab Tests")}>
              <FaFlask /> Order Lab Tests
            </Dropdown.Item>
            <Dropdown.Item href="#/action-5" onClick={() => console.log("Order Imaging")}>
              <FaXRay /> Order Imaging
            </Dropdown.Item>
            <Dropdown.Item href="#/action-6" onClick={() => console.log("Discharge Patient")}>
              <FaBed /> Discharge Patient
            </Dropdown.Item>
          </DropdownButton>
        )}
      />

      <DoctorsNotes show={showDoctorsNotes} onHide={() => setShowDoctorsNotes(false)} />
      <NursingNotes show={showNursingNotes} onHide={() => setShowNursingNotes(false)} /> {/* Render NursingNotes modal with the show prop */}
      <ToastContainer limit={1}/>
    </Container>
  );
};

export default PatientManagement;
