import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import logoImage from "./logo.svg";
import { styled } from "@mui/material/styles";
import Hotel  from "@mui/icons-material/Hotel";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "& .MuiSvgIcon-root, & .fas": {
    color: "#899bbd",
    transition: "color 0.3s",
  },
  "&:hover .MuiSvgIcon-root, &:hover .fas": {
    color: "#4154f1",
  },
  "&.active .MuiSvgIcon-root, &.active .fas": {
    color: "#4154f1",
  },
}));

const SideBar = () => {
  const [activePage, setActivePage] = useState(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);

  const handleSubMenuClick = (submenu) => {
    setExpandedSubMenu((prevSubmenu) =>
      prevSubmenu === submenu ? null : submenu
    );
  };

  const handleActive = (event) => {
    const target = event.currentTarget;
    if (activePage !== target) {
      if (activePage) {
        activePage.classList.remove("active");
      }
      target.classList.add("active");
      setActivePage(target);
    }
  };

  const menuItemStyles = {
    root: {
      fontSize: "14px",
      fontWeight: 600,
    },
    icon: {
      color: "#899bbd",
      "&:hover, &.active": {
        color: "#4154f1",
      },
    },
    SubMenuExpandIcon: {
      color: "#899bbd",
      "&:hover, &.active": {
        color: "#4154f1",
      },
    },
    subMenuContent: {
      backgroundColor: "#fff",
    },
    label: {
      fontWeight: 600,
    },
    button: {
      color: "#012970",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "color 0.3s ease, background-color 0.3s ease",
      "&:hover": {
        color: "#4154f1",
        backgroundColor: "#f6f9ff",
      },
      "&.active": {
        backgroundColor: "#f6f9ff",
        color: "#4154f1",
      },
      textDecoration: "none",
    },
  };

  return (
    <Sidebar
      className="app"
      backgroundColor="#fff"
      rootStyles={{
        color: "#012970",
      }}
      style={{
        borderRight: "none",
        boxShadow: "0px 0px 20px rgba(1, 41, 112, 0.1)",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "200px", height: "150px" }}
        />
        {/* <h3 style={{ color: "#4154f1", marginTop: "0.5rem" }}> */}
        {/* Hospital System
        </h3> */}
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        <CustomMenuItem
          component={
            <Link to="/dashboard" onClick={handleActive}>
              Dashboard
            </Link>
          }
          icon={<i className="fas fa-tachometer-alt"></i>}
        >
          Dashboard
        </CustomMenuItem>
        <SubMenu
          label="Patient Reception"
          icon={<i className="fas fa-user-nurse"></i>}
          open={expandedSubMenu === "Patient Reception"}
          onOpenChange={() => handleSubMenuClick("Patient Reception")}
        >
          <CustomMenuItem
            component={
              <Link to="/booking" onClick={handleActive}>
                  Patient Booking
              </Link>
            }
           //add a booking icon
            icon={<i className="fas fa-calendar-alt"></i>}
          >
            Patient Booking
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/TriageAssessment" onClick={handleActive}>
                Triage & Assessment
              </Link>
            }
            icon={<i className="fas fa-clipboard-list"></i>}
          >
            Triage & Assessment
          </CustomMenuItem>
        </SubMenu>
        <CustomMenuItem
          component={
            <Link to="/electronic-health-records" onClick={handleActive}>
              Electronic Health Records
            </Link>
          }
          icon={<i className="fas fa-stethoscope"></i>}
        >
          Electronic Health Records
        </CustomMenuItem>
        <CustomMenuItem
          component={
            <Link to="/TeleMedicine" onClick={handleActive}>
              Telemedicine System
            </Link>
          }
          icon={<i className="fas fa-mobile-alt"></i>}
        >
          Telemedicine System
        </CustomMenuItem>
        <SubMenu
          label="Diagnostics"
          icon={<i className="fas fa-vial"></i>}
          open={expandedSubMenu === "Diagnostics"}
          onOpenChange={() => handleSubMenuClick("Diagnostics")}
        >
          <CustomMenuItem
            component={
              <Link to="/ImagingDashboard" onClick={handleActive}>
                Imaging
              </Link>
            }
            icon={<i className="fas fa-x-ray"></i>}
          >
            Imaging
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/Laboratory" onClick={handleActive}>
                Laboratory
              </Link>
            }
            icon={<i className="fas fa-flask"></i>}
          >
            Laboratory
          </CustomMenuItem>
        </SubMenu>
        <CustomMenuItem
          component={
            <Link to="/Pharmacy" onClick={handleActive}>
              Pharmacy Management
            </Link>
          }
          icon={<i className="fas fa-pills"></i>}
        >
          Pharmacy Management
        </CustomMenuItem>
        <CustomMenuItem
          component={
            <Link to="/InpatientManagement" onClick={handleActive}>
              Inpatient Management
            </Link>
          }
          icon={<i className="fas fa-procedures"></i>}
        >
          Inpatient Management
        </CustomMenuItem>
        <SubMenu
          label="Nursing Care"
          icon={<i className="fas fa-user-nurse"></i>}
          open={expandedSubMenu === "Nursing Care"}
          onOpenChange={() => handleSubMenuClick("Nursing Care")}
        >
          <CustomMenuItem
            component={
              <Link to="/patientCare" onClick={handleActive}>
                Patient Care
              </Link>
            }
            icon={<i className="fas fa-users"></i>}
          >
            Patient Care
          </CustomMenuItem>

          <CustomMenuItem
            component={
              <Link to="/wardManagement" onClick={handleActive}>
               Ward Management
              </Link>
            }
            icon={<Hotel/>}
          >
             Ward Management
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Doctor Management"
          icon={<i className="fas fa-user-md"></i>}
          open={expandedSubMenu === "Doctor Management"}
          onOpenChange={() => handleSubMenuClick("Doctor Management")}
        >
          <CustomMenuItem
            component={
              <Link to="/patientCare" onClick={handleActive}>
                Patient schedule
              </Link>
            }
            icon={<i className="fas fa-calendar-alt"></i>}
          >
            Patient schedule
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/clinic-management" onClick={handleActive}>
                Clinic Operations
              </Link>
            }
            icon={<i className="fas fa-clinic-medical"></i>}
          >
            Clinic Operations
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/order-management" onClick={handleActive}>
                Medical Orders
              </Link>
            }
            icon={<i className="fas fa-clipboard-list"></i>}
          >
            Medical Orders
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Specialty Clinics"
          icon={<i className="fas fa-clinic-medical"></i>}
          open={expandedSubMenu === "Specialty Clinics"}
          onOpenChange={() => handleSubMenuClick("Specialty Clinics")}
        >
          <CustomMenuItem
            component={
              <Link to="/patientCare" onClick={handleActive}>
                clinic-manager
              </Link>
            }
            icon={<i className="fas fa-heartbeat"></i>}
          >
            clinic-manager
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Financial Management"
          icon={<i className="fas fa-money-bill-wave"></i>}
          open={expandedSubMenu === "Financial Management"}
          onOpenChange={() => handleSubMenuClick("Financial Management")}
        >
          <CustomMenuItem
            component={
              <Link to="/FinancialManagement" onClick={handleActive}>
                Budgeting
              </Link>
            }
            icon={<i className="fas fa-file-invoice-dollar"></i>}
          >
            Budgeting
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/collections-denials" onClick={handleActive}>
                Collections & Denials Management
              </Link>
            }
            icon={<i className="fas fa-hand-holding-usd"></i>}
          >
            Collections & Denials Management
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/reporting-analytics" onClick={handleActive}>
                Reporting & Analytics
              </Link>
            }
            icon={<i className="fas fa-chart-line"></i>}
          >
            Reporting & Analytics
          </CustomMenuItem>
        </SubMenu>
       
        <SubMenu
          label="Surgery Management"
          icon={<i className="fas fa-procedures"></i>}
          open={expandedSubMenu === "Surgery Management"}
          onOpenChange={() => handleSubMenuClick("Surgery Management")}
        >
          <CustomMenuItem
            component={
              <Link to="/or-scheduling" onClick={handleActive}>
                OR Scheduling
              </Link>
            }
            icon={<i className="fas fa-calendar-alt"></i>}
          >
            OR Scheduling
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/pre-operative-management" onClick={handleActive}>
                Pre-Operative Management
              </Link>
            }
            icon={<i className="fas fa-file-medical-alt"></i>}
          >
            Pre-Operative Management
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/post-operative-management" onClick={handleActive}>
                Post-Operative Management
              </Link>
            }
            icon={<i className="fas fa-file-medical"></i>}
          >
            Post-Operative Management
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Supply Chain Management"
          icon={<i className="fas fa-truck"></i>}
          open={expandedSubMenu === "Supply Chain Management"}
          onOpenChange={() => handleSubMenuClick("Supply Chain Management")}
        >
          <CustomMenuItem
            component={
              <Link to="/Procurement" onClick={handleActive}>
                Inventory Management
              </Link>
            }
            icon={<i className="fas fa-clipboard-list-check"></i>}
          >
            Inventory Management
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/purchasing-ordering" onClick={handleActive}>
                Purchasing & Ordering
              </Link>
            }
            icon={<i className="fas fa-shopping-cart"></i>}
          >
            Purchasing & Ordering
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/receiving-vendor-management" onClick={handleActive}>
                Receiving & Vendor Management
              </Link>
            }
            icon={<i className="fas fa-truck-loading"></i>}
          >
            Receiving & Vendor Management
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Human Resources"
          icon={<i className="fas fa-users"></i>}
          open={expandedSubMenu === "Human Resources"}
          onOpenChange={() => handleSubMenuClick("Human Resources")}
        >
          <CustomMenuItem
            component={
              <Link to="/" onClick={handleActive}>
                Employee Management
              </Link>
            }
            icon={<i className="fas fa-users-cog"></i>}
          >
            Employee Management
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/payroll" onClick={handleActive}>
                Payroll
              </Link>
            }
            icon={<i className="fas fa-money-bill-wave"></i>}
          >
            Payroll
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/benefits-administration" onClick={handleActive}>
                Benefits Administration
              </Link>
            }
            icon={<i className="fas fa-briefcase"></i>}
          >
            Benefits Administration
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/department-management" onClick={handleActive}>
                Department Management
              </Link>
            }
            icon={<i className="fas fa-building"></i>}
          >
            Department Management
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Department Management"
          icon={<i className="fas fa-chart-bar"></i>}
          open={expandedSubMenu === "Department Management"}
          onOpenChange={() => handleSubMenuClick("Department Management")}
        >
          <CustomMenuItem
            component={
              <Link to="/clinical-reports" onClick={handleActive}>
                Clinical Reports
              </Link>
            }
            icon={<i className="fas fa-file-medical-alt"></i>}
          >
            Clinical Reports
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/financial-reports" onClick={handleActive}>
                Financial Reports
              </Link>
            }
            icon={<i className="fas fa-file-invoice-dollar"></i>}
          >
            Financial Reports
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/DutyRota" onClick={handleActive}>
                Operational Reports
              </Link>
            }
            icon={<i className="fas fa-chart-pie"></i>}
          >
            Duty Rota
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Administration"
          icon={<i className="fas fa-cogs"></i>}
          open={expandedSubMenu === "Administration"}
          onOpenChange={() => handleSubMenuClick("Administration")}
        >
          <CustomMenuItem
            component={
              <Link to="/system-configuration" onClick={handleActive}>
                System Configuration
              </Link>
            }
            icon={<i className="fas fa-cogs"></i>}
          >
            System Configuration
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/UserManagement" onClick={handleActive}>
                User Management
              </Link>
            }
            icon={<i className="fas fa-users-cog"></i>}
          >
            User Management
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/Permissions" onClick={handleActive}>
                Permissions
              </Link>
            }
            icon={<i className="fas fa-shield-alt"></i>}
          >
            Permissions
          </CustomMenuItem>
        </SubMenu>
        <SubMenu
          label="Settings"
          icon={<i className="fas fa-cog"></i>}
          open={expandedSubMenu === "Settings"}
          onOpenChange={() => handleSubMenuClick("Settings")}
        >
          <CustomMenuItem
            component={
              <Link to="/CardexForm" onClick={handleActive}>
                Facility Settings
              </Link>
            }
            icon={<i className="fas fa-building"></i>}
          >
            Facility Settings
          </CustomMenuItem>
          <CustomMenuItem
            component={
              <Link to="/BloodSugarLog" onClick={handleActive}>
                User Preferences
              </Link>
            }
            icon={<i className="fas fa-user-cog"></i>}
          >
            User Preferences
          </CustomMenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
