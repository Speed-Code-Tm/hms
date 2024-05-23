import React, { useState, useEffect } from 'react';
import './App.css';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
<<<<<<< HEAD
    <>
      <Router>
        <div className="app-container">
          <SideBar />
          <div className="content-container">
            <NavBar />
            {/* <Loader /> Render the Loader component here */}
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<RegistrationForm />} />
              {/* Dashboard Route */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* registration route */}
              <Route path="/registration" element={<Registration />} />
              {/* Triage Assessment Route */}
              <Route path="/TriageAssessment" element={<TriageAssessment />} />
              {/* Patient Profile Route */}
              <Route path="/PatientProfile" element={<PatientProfile />} />
              {/* User Profile Route */}
              <Route path="/UserProfile/:id" element={<EmployeeProfile />} />
              {/* imaging dashboard */}
              <Route path='/ImagingDashboard' element={<ImagingDashboard />} />
              {/* Laboratory route */}
              <Route path='/Laboratory' element={<LaboratoryManagement />} />
              {/* Telemedicine Route */}
              <Route path="/TeleMedicine" element={<TeleMedicine />} />
              {/* User Management Route */}
              <Route path="/UserManagement" element={<UserManagement />} />
              {/* Pharmacy Route */}
              <Route path="/Pharmacy" element={<Pharmacy />} />
              {/* Procurement Route */}
              <Route path="/Procurement" element={<Procurement />} />
              {/* Procurement Route */}
              <Route path="/receiving-vendor-management" element={<VendorManagement />} />
              {/*Ward management &  Inpatient management Route */}
              <Route path='/wardManagement' element={<InpatientManagement />} />
              {/* FinancialManagement */}
              <Route path='/FinancialManagement' element={<FinancialManagement />} />
              {/* Patiet management Route */}
              <Route path='/patientCare' element={<PatientManagement />} />
              {/**Route for work schedule */}
              <Route path='/DutyRota' element={<WorkSchedule />} />
              {/**Route for user role mapping */}
              <Route path='/Permissions' element={<UserRoleMapping />} />
              {/* Other routes */}
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </Router>
      <ToastContainer/>
    </>
=======
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <ToastContainer />
    </Router>
>>>>>>> 55fa784cc3c1084c20396db2a09d47b1c4091cb3
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
          <Route path="/registration" element={<Registration />} />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
