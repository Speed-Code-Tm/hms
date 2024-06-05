import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Registration from './pages/registration';
import TriageAssessment from './pages/triage';
import PatientProfile from './pages/patientProfile';
import TeleMedicine from './pages/Telemedicine';
import ImagingDashboard from './pages/imaging';
import LaboratoryManagement from './pages/laboratory';
import UserManagement from './pages/UserManagement';
import Pharmacy from './pages/pharmacy';
import Procurement from './pages/Procurement';
import InpatientManagement from './pages/inpatientManagement';
import FinancialManagement from './pages/FinancialManagement';
import PatientManagement from './pages/patientManagement';
import SideBar from './components/Sidebar';
import VendorManagement from './pages/VendorManagement';
import WorkSchedule from './components/Workschedule';
import { ToastContainer } from 'react-toastify';
import UserRoleMapping from './pages/UserRolesTable';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeProfile from './components/userProfile';
import RegistrationForm from './pages/HospitalRegistration';
import LoginPage from './auth/Login';
import PatientSchedule from './pages/patientSchedule'
import WardManagement from './pages/WardManagement';
import BloodSugarLog from './PatientProfile/BloodSugarLog'
import CardexForm from './PatientProfile/NursingCardex';
import Collection_Denials from './pages/Collection_Denials'
import EHR from './pages/EHR';
import PatientEHR from './pages/patientEHR';
import OrScheduling from './pages/OrScheduling';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <ToastContainer />
    </Router>
  );
}


function AppRoutes({ isLoggedIn, handleLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <AppLayout />
          ) : null
        }
      />
    </Routes>
  );
}

function AppLayout() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content-container">
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Registration />} />
          <Route path="/TriageAssessment" element={<TriageAssessment />} />
          <Route path="/PatientProfile" element={<PatientProfile />} />
          <Route path="/UserProfile/:id" element={<EmployeeProfile />} />
          <Route path='/ImagingDashboard' element={<ImagingDashboard />} />
          <Route path='/Laboratory' element={<LaboratoryManagement />} />
          <Route path="/TeleMedicine" element={<TeleMedicine />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/Pharmacy" element={<Pharmacy />} />
          <Route path="/Procurement" element={<Procurement />} />
          <Route path="/receiving-vendor-management" element={<VendorManagement />} />
          <Route path='/InpatientManagement' element={<InpatientManagement />} />
          <Route path='/FinancialManagement' element={<FinancialManagement />} />
          <Route path='/patientCare' element={<PatientManagement />} />
          <Route path='/wardManagement' element={<WardManagement />} />
          <Route path='/DutyRota' element={<WorkSchedule />} />
          <Route path='/Permissions' element={<UserRoleMapping />} />
          <Route path='/PatientSchedule' element={<PatientSchedule/>}/>
          <Route path='/BloodSugarLog'element={<BloodSugarLog/>}/>
          <Route path='/CardexForm'element={<CardexForm/>}/>
          <Route path='/collections-denials' element={<Collection_Denials/>} />
          <Route path='/electronic-health-records' element={<EHR/>} />
          <Route path='/PatientEHR/:patientId' element={<PatientEHR/>} />
          <Route path="/PatientEHR" element={<PatientEHR />} />
          <Route path='/or-scheduling' element={<OrScheduling/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
