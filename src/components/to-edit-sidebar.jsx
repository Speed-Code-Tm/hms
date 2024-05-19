import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  const [activePage, setActivePage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const dashboardLink = document.querySelector(
      '.nav-link[href="/dashboard"]'
    );
    setActivePage(dashboardLink);
    handleActive({ currentTarget: dashboardLink });
  }, []);

  function handleActive(event) {
    const target = event.currentTarget;
    if (activePage !== target) {
      if (activePage) {
        activePage.classList.remove("active");
      }
      target.classList.add("active");
      setActivePage(target);
    }
  }

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            to="/dashboard"
            onClick={handleActive}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#patient-reception-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-user-nurse"></i>
            <span>Patient Reception</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="patient-reception-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/registration"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/registration" ? "active" : ""
                }`}
              >
                <i className="fas fa-user-plus"></i>
                <span>Patient Registration</span>
              </Link>
            </li>
            <li>
              <Link
                to="/triage-assessment"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/triage-assessment" ? "active" : ""
                }`}
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Triage & Assessment</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Electronic Health Records */}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/electronic-health-records" ? "active" : ""
            }`}
            to="/electronic-health-records"
            onClick={handleActive}
          >
            <i className="fas fa-stethoscope"></i>
            <span>Electronic Health Records</span>
          </Link>
        </li>

        {/* Telemedicine System */}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/telemedicine" ? "active" : ""
            }`}
            to="/telemedicine"
            onClick={handleActive}
          >
            <i className="fas fa-mobile-alt"></i>
            <span>Telemedicine System</span>
          </Link>
        </li>

        {/* Diagnostics */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#diagnostics-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-vial"></i>
            <span>Diagnostics</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="diagnostics-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/imaging-dashboard"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/imaging-dashboard" ? "active" : ""
                }`}
              >
                <i className="fas fa-x-ray"></i>
                <span>Imaging</span>
              </Link>
            </li>
            <li>
              <Link
                to="/laboratory"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/laboratory" ? "active" : ""
                }`}
              >
                <i className="fas fa-flask"></i>
                <span>Laboratory</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Pharmacy Management */}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/pharmacy" ? "active" : ""
            }`}
            to="/pharmacy"
            onClick={handleActive}
          >
            <i className="fas fa-pills"></i>
            <span>Pharmacy Management</span>
          </Link>
        </li>

        {/* Inpatient Management */}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/inpatient-management" ? "active" : ""
            }`}
            to="/inpatient-management"
            onClick={handleActive}
          >
            <i className="fas fa-procedures"></i>
            <span>Inpatient Management</span>
          </Link>
        </li>

        {/* Inpatient Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#inpatient-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-user-nurse"></i>
            <span>Inpatient Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="inpatient-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/patient-care"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/patient-care" ? "active" : ""
                }`}
              >
                <i className="fas fa-users"></i>
                <span>Patient Care</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Doctor Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#doctor-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-user-md"></i>
            <span>Doctor Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="doctor-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/physician-scheduling"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/physician-scheduling" ? "active" : ""
                }`}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Patient schedule</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clinic-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/clinic-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-clinic-medical"></i>
                <span>Clinic Operations</span>
              </Link>
            </li>
            <li>
              <Link
                to="/order-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/order-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Medical Orders</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Financial Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#financial-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-money-bill-wave"></i>
            <span>Financial Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="financial-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/financial-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/financial-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Budgeting</span>
              </Link>
            </li>
            <li>
              <Link
                to="/collections-denials"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/collections-denials" ? "active" : ""
                }`}
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span>Collections & Denials Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reporting-analytics"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/reporting-analytics" ? "active" : ""
                }`}
              >
                <i className="fas fa-chart-line"></i>
                <span>Reporting & Analytics</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Specialty Clinics Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#specialty-clinics-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-clinic-medical"></i>
            <span>Specialty Clinics</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="specialty-clinics-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/clinic-manager"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/clinic-manager" ? "active" : ""
                }`}
              >
                <i className="fas fa-heartbeat"></i>
                <span>clinic-manager</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Surgery Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#surgery-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-procedures"></i>
            <span>Surgery Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="surgery-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/or-scheduling"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/or-scheduling" ? "active" : ""
                }`}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>OR Scheduling</span>
              </Link>
            </li>
            <li>
              <Link
                to="/pre-operative-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/pre-operative-management"
                    ? "active"
                    : ""
                }`}
              >
                <i className="fas fa-file-medical-alt"></i>
                <span>Pre-Operative Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/post-operative-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/post-operative-management"
                    ? "active"
                    : ""
                }`}
              >
                <i className="fas fa-file-medical"></i>
                <span>Post-Operative Management</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Supply Chain Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#supply-chain-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-truck"></i>
            <span>Supply Chain Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="supply-chain-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/procurement"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/procurement" ? "active" : ""
                }`}
              >
                <i className="fas fa-clipboard-list-check"></i>
                <span>Inventory Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/purchasing-ordering"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/purchasing-ordering" ? "active" : ""
                }`}
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Purchasing & Ordering</span>
              </Link>
            </li>
            <li>
              <Link
                to="/receiving-vendor-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/receiving-vendor-management"
                    ? "active"
                    : ""
                }`}
              >
                <i className="fas fa-truck-loading"></i>
                <span>Receiving & Vendor Management</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Human Resources Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#human-resources-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-users"></i>
            <span>Human Resources</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="human-resources-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/employee-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/employee-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-users-cog"></i>
                <span>Employee Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/payroll" ? "active" : ""
                }`}
              >
                <i className="fas fa-money-bill-wave"></i>
                <span>Payroll</span>
              </Link>
            </li>
            <li>
              <Link
                to="/benefits-administration"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/benefits-administration"
                    ? "active"
                    : ""
                }`}
              >
                <i className="fas fa-briefcase"></i>
                <span>Benefits Administration</span>
              </Link>
            </li>
            <li>
              <Link
                to="/department-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/department-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-building"></i>
                <span>Department Management</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Department Management Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#department-management-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-chart-bar"></i>
            <span>Department Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="department-management-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <Link
              to="/clinical-reports"
              onClick={handleActive}
              className={`nav-link ${
                location.pathname === "/clinical-reports" ? "active" : ""
              }`}
            >
              <i className="fas fa-file-medical-alt"></i>
              <span>Clinical Reports</span>
            </Link>
            <li>
              <Link
                to="/financial-reports"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/financial-reports" ? "active" : ""
                }`}
              >
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Financial Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/duty-rota"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/duty-rota" ? "active" : ""
                }`}
              >
                <i className="fas fa-chart-pie"></i>
                <span>Duty Rota</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Administration Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#administration-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-cogs"></i>
            <span>Administration</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="administration-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/system-configuration"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/system-configuration" ? "active" : ""
                }`}
              >
                <i className="fas fa-cogs"></i>
                <span>System Configuration</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-management"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/user-management" ? "active" : ""
                }`}
              >
                <i className="fas fa-users-cog"></i>
                <span>User Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/permissions"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/permissions" ? "active" : ""
                }`}
              >
                <i className="fas fa-shield-alt"></i>
                <span>Permissions</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Settings Submenu */}
        <li className="nav-item">
          <div
            className="nav-link collapsed"
            data-bs-target="#settings-nav"
            data-bs-toggle="collapse"
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          <ul
            id="settings-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/facility-settings"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/facility-settings" ? "active" : ""
                }`}
              >
                <i className="fas fa-building"></i>
                <span>Facility Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-preferences"
                onClick={handleActive}
                className={`nav-link ${
                  location.pathname === "/user-preferences" ? "active" : ""
                }`}
              >
                <i className="fas fa-user-cog"></i>
                <span>User Preferences</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Logout */}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/logout" ? "active" : ""
            }`}
            to="/logout"
            onClick={handleActive}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
