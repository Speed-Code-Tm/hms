import React, { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../pages/configs";
import ReusableTable from "./ReusableTable";
import AddPatientModal from "../components/addPatient";
import { Add } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import BookingModal from "../components/PatientBooking";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddPatientButton = styled.button`
  background-color: #007bff;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  margin-left: auto; /* This will push the button to the right */

  &:hover {
    background-color: #0056b3;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PatientRegistration = () => {
  const [data, setData] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const patientsCollection = collection(db, "patients");
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsData = patientsSnapshot.docs.map((doc) => {
        const patientData = doc.data();
        
        const patientId = doc.id;
        const patientInfo = patientData[patientId] || {};
        const personalInfo = patientInfo.personalInfo || {};
        // const fullName = `${personalInfo.firstName || ''} ${personalInfo.middleName || ''} ${personalInfo.lastName || ''}`;

        return {
          id: patientId,
          personalInfo,
        };
      });
      setData(patientsData);
    };

    fetchData();
  }, []);

  const columns = useMemo(() => {
    const COLUMNS = [
      {
        Header: "Name",
        accessor: (row) =>
          `${row.personalInfo.firstName || ""} ${
            row.personalInfo.middleName || ""
          } ${row.personalInfo.lastName || ""}`,
      },
      {
        Header: "Phone Number",
        accessor: (row) => row.personalInfo.phoneNumber || "",
      },
      {
        Header: "Insurance Type",
        accessor: (row) => row.personalInfo.insuranceType || "",
      },
      {
        Header: "Gender",
        accessor: (row) => row.personalInfo.gender || "",
      },
      {
        Header: "Age",
        accessor: (row) => {
          const today = new Date();
          const birthDate = new Date(row.personalInfo.dateOfBirth);
          if (!isNaN(birthDate.getTime())) {
            // Check if dateOfBirth is a valid date
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            return age;
          } else {
            return ""; // Return empty string if dateOfBirth is not available
          }
        },
      },
      {
        Header: "National ID",
        accessor: (row) => row.personalInfo.nationalId || "",
      },
    ];

    return COLUMNS;
  }, []);

  const ToggleAddPatientModal = () => {
    setShowAddPatientModal(!showAddPatientModal);
  };

  const ToggleBookingModal = () => {
    setShowBookingModal(!showBookingModal);
  };

  return (
    <Container
      className="patient-registration-container"
      style={{ marginTop: "10px" }}
    >
      <HeaderContainer>
        <AddPatientButton onClick={ToggleAddPatientModal}>
          <Add />
          Add Patient
        </AddPatientButton>
      </HeaderContainer>
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <div>
            <Button variant="primary" onClick={ToggleBookingModal}>
              Book
            </Button>
          </div>
        )}
      />
      <AddPatientModal
        show={showAddPatientModal}
        onHide={() => setShowAddPatientModal(false)}
      />

      <BookingModal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
      />
      <ToastContainer />
    </Container>
  );
};

export default PatientRegistration;