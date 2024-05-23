import React, { useState, useEffect, useMemo } from "react";
import { Container, DropdownButton, Dropdown, Button } from "react-bootstrap";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../pages/configs";
import ReusableTable from "./ReusableTable";
import {
  FaNotesMedical,
  FaHeartbeat,
  FaUserNurse,
  FaCapsules,
  FaFlask,
  FaXRay,
  FaBed,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import NursingNotes from "../components/AddNursingNotes";
import DoctorsNotes from "../components/DoctorsNotes";
import OrderMedicine from "../components/OrderMedicine";
import OrderLabTest from "../components/OrderLabTest"; 
import OrderImaging from "../components/orderImaging";
import VitalSigns from "../components/AddVitals";
import PatientProfile from "./patientProfile"
import ReusableModal from "../components/ReusableModal";
import PatientAdmission from "../components/inpatient/PatientAdmission";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PatientManagement = () => {
  const [data, setData] = useState([]);
  const [showDoctorsNotes, setShowDoctorsNotes] = useState(false);
  const [showNursingNotes, setShowNursingNotes] = useState(false);
  const [showOrderMedicine, setShowOrderMedicine] = useState(false);
  const [showOrderImaging, setShowOrderImaging] = useState(false); 
  const [showOrderLabTest, setShowOrderLabTest] = useState(false); 
<<<<<<< HEAD
  const [showAdmissionModal,setShowAdmissionModal] = useState(false)
=======
  const [showVitalSigns, setShowVitalSigns] = useState(false);

>>>>>>> 55fa784cc3c1084c20396db2a09d47b1c4091cb3
  const toggleDoctorsNotes = () => setShowDoctorsNotes(!showDoctorsNotes);
  const toggleNursingNotes = () => setShowNursingNotes(!showNursingNotes);
  const toggleOrderMedicine = () => setShowOrderMedicine(!showOrderMedicine);
  const toggleOrderImaging = () => setShowOrderImaging(!showOrderImaging); 
  const toggleOrderLabTest = () => setShowOrderLabTest(!showOrderLabTest); 
  const toggleVitalSigns = () => setShowVitalSigns(!showVitalSigns);

  const handleCloseModal = () =>{
    setShowAdmissionModal(false)
  }


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
    <Container className="patient-management-container py-3">
        <h2>Inpatient Management</h2>
        <div className="py-3 d-flex justify-content-end">
            <Button onClick={()=>setShowAdmissionModal(true)}>Admit Patient</Button>
          </div>

{/* patient admision modal */}

<ReusableModal show={showAdmissionModal} onHide={handleCloseModal}  title={"Admit Patient"}>

<PatientAdmission/>
</ReusableModal>

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
            <Dropdown.Item  onClick={toggleVitalSigns}>
              <FaHeartbeat /> View Vitals
            </Dropdown.Item>
            <Dropdown.Item  onClick={toggleNursingNotes}>
              <FaUserNurse /> Add Nursing Notes
            </Dropdown.Item>
            <Dropdown.Item  onClick={toggleDoctorsNotes}>
              <FaNotesMedical /> Add Doctor's Notes
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={toggleOrderMedicine}>
              <FaCapsules /> Order Medicine
            </Dropdown.Item>
            <Dropdown.Item href="#/action-4" onClick={toggleOrderLabTest}>
              <FaFlask /> Order Lab Tests
            </Dropdown.Item>
            <Dropdown.Item href="#/action-5" onClick={toggleOrderImaging}>
              <FaXRay /> Order Imaging
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-6"
              onClick={() => console.log("Discharge Patient")}
            >
              <FaBed /> Discharge Patient
            </Dropdown.Item>
            <Dropdown.Item
              href="/PatientProfile"
            >
              <FaBed /> Patient Profile
            </Dropdown.Item>
          </DropdownButton>
        )}
      />

      <DoctorsNotes
        show={showDoctorsNotes}
        onHide={() => setShowDoctorsNotes(false)}
      />
      <NursingNotes
        show={showNursingNotes}
        onHide={() => setShowNursingNotes(false)}
      />
      <OrderMedicine
        show={showOrderMedicine}
        onHide={() => setShowOrderMedicine(false)}
      />
      <OrderImaging
        show={showOrderImaging}
        onHide={() => setShowOrderImaging(false)}
        // patientName={/* Pass the patient name here */}
      />
      <OrderLabTest
        show={showOrderLabTest}
        onHide={() => setShowOrderLabTest(false)}
        // patientName={/* Pass the patient name here */}
      />
      < VitalSigns
        show={showVitalSigns}
        onHide={() => setShowVitalSigns(false)}
        // patientName={/* Pass the patient name here */}
      />
      <ToastContainer limit={5} />
    </Container>
  );
};

export default PatientManagement;
