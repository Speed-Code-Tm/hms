import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
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
import Loader from './components/Loader';
import WorkSchedule from './components/Workschedule';
import WardManagement from './pages/WardManagement';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <SideBar />
          <div className="content-container">
            <NavBar />
            {/* <Loader /> Render the Loader component here */}
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Dashboard />} />
              {/* Dashboard Route */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* registration route */}
              <Route path="/registration" element={<Registration />} />
              {/* Triage Assessment Route */}
              <Route path="/TriageAssessment" element={<TriageAssessment />} />
              {/* Patient Profile Route */}
              <Route path="/PatientProfile" element={<PatientProfile />} />
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
              {/* Inpatient management Route */}
              <Route path='/InpatientManagement' element={<InpatientManagement />} />
              {/* FinancialManagement */}
              <Route path='/FinancialManagement' element={<FinancialManagement />} />
              {/* Patiet management Route */}
              <Route path='/patientCare' element={<PatientManagement />} />
              {/**Route for ward management */}
              <Route path='/wardManagement' element={<WardManagement />} />
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
  );
}

export default App;