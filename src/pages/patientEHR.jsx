import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Card,
  ListGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import {
  FaUserCircle,
  FaHistory,
  FaPills,
  FaFileAlt,
  FaClipboardCheck,
  FaMoneyBillAlt,
  FaStickyNote,
  FaSyncAlt,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import avatar from "../components/logo.svg";
import { Avatar } from "@mui/material";
import { Table, Button, Input, Space, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const PatientEHR = () => {
  const [admissionDate, setAdmissionDate] = useState("2023-05-15");
  const insuranceNumber = "ABC123456789";
  const patientId = "12345";
  const [daysInHospital, setDaysInHospital] = useState(7);
  const visits = [
    {
      key: "1",
      date: "2023-04-01",
      reason: "Annual Check-up",
      type: "Outpatient",
      admissionDate: "",
      admittingStaff: "",
      wardRoom: "",
      dischargeDate: "",
      dischargeCondition: "",
      causeOfDemise: "",
      healthCover: "Insurance",
    },
    {
      key: "2",
      date: "2023-03-15",
      reason: "Flu Symptoms",
      type: "Inpatient",
      admissionDate: "2023-03-15",
      admittingStaff: "Dr. John Smith",
      wardRoom: "Ward A, Room 1",
      dischargeDate: "2023-03-20",
      dischargeCondition: "Recovered",
      causeOfDemise: "",
      healthCover: "Personal Funds",
    },
    {
      key: "3",
      date: "2023-02-20",
      reason: "Follow-up",
      type: "Outpatient",
      admissionDate: "",
      admittingStaff: "",
      wardRoom: "",
      dischargeDate: "",
      dischargeCondition: "",
      causeOfDemise: "",
      healthCover: "Insurance",
    },
  ];
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("Hypertension");
  const [secondaryDiagnosis, setSecondaryDiagnosis] =
    useState("Type 2 Diabetes");
  const [testsPerformed, setTestsPerformed] = useState([
    "Blood test",
    "X-ray",
    "CT Scan",
  ]);
  const [dischargeCondition, setDischargeCondition] = useState("Stable");
  const [selectedVisit, setSelectedVisit] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(visits);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleVisitSelect = (visit) => {
    setSelectedVisit(visit);
    setAdmissionDate(visit.date);
    setDaysInHospital(visit.type === "Inpatient" ? 7 : 0);
  };

  const handleReload = () => {
    // Reload data logic here
    console.log("Data reloaded");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = visits.filter((visit) =>
      Object.values(visit)
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      const filtered = visits.filter((visit) => {
        const visitDate = moment(visit.date);
        return visitDate.isBetween(dates[0], dates[1], undefined, "[]");
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(visits);
    }
  };

  const documents = [
    {
      key: "1",
      name: "Document 1",
      dateGenerated: "2023-01-01",
      dateUpdated: "2023-01-15",
      actions: "View",
    },
    {
      key: "2",
      name: "Document 2",
      dateGenerated: "2023-02-01",
      dateUpdated: "2023-02-15",
      actions: "View",
    },
    {
      key: "3",
      name: "Document 3",
      dateGenerated: "2023-03-01",
      dateUpdated: "2023-03-15",
      actions: "View",
    },
  ];

  const visitHistoryColumns = [
    { title: "Visit Date", dataIndex: "date", key: "date" },
    // { title: "Primary Diagnosis", dataIndex: "reason", key: "reason" },
    { title: "Visit Type", dataIndex: "type", key: "type" },
    { title: "Admission Date", dataIndex: "admissionDate", key: "admissionDate" },
    { title: "Admitting Staff", dataIndex: "admittingStaff", key: "admittingStaff" },
    { title: "Ward/Room", dataIndex: "wardRoom", key: "wardRoom" },
    { title: "Discharge Date", dataIndex: "dischargeDate", key: "dischargeDate" },
    { title: "Discharge Condition", dataIndex: "dischargeCondition", key: "dischargeCondition" },
    { title: "Cause of Demise", dataIndex: "causeOfDemise", key: "causeOfDemise" },
    { title: "Health Cover", dataIndex: "healthCover", key: "healthCover" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => console.log("View", record.key)}>
          View
        </Button>
      ),
    },
  ];

  const columns = [
    { title: "Document Name", dataIndex: "name", key: "name" },
    {
      title: "Date Generated",
      dataIndex: "dateGenerated",
      key: "dateGenerated",
    },
    {
      title: "Date Last Updated",
      dataIndex: "dateUpdated",
      key: "dateUpdated",
    },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12}>
          <Card className="shadow-lg rounded">
            <Card.Header className="bg-light text-dark">
              <h2 className="text-center">Patient Electronic Health Record</h2>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3 align-items-center">
                <Col md={3} className="text-center mb-3 mb-md-0">
                  <div className="d-flex flex-column align-items-center"><Avatar
                    src={avatar}
                    alt="Avatar"
                    style={{ width: "150px", height: "150px" }}
                  />
                    <h3 className="mt-3 text-primary">Peter Viceall</h3>
                  </div>
                  <div className="mt-3">
                    <span className="me-2 fw-bold text-muted">
                      Choose Visit:
                    </span>
                    <DropdownButton
                      id="visit-dropdown"
                      title={
                        selectedVisit ? selectedVisit.date : "Select Visit Date"
                      }
                      variant="outline-secondary"
                    >
                      {visits.map(function (visit, index) {
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleVisitSelect(visit)}
                          >
                            {visit.date} ({visit.type})
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </Col>
                <Col md={9}>
                  <Card.Text>
                    <Row>
                      <Col md={6} className="mb-3 mb-md-0">
                        <h6 className="text-muted mb-2">
                          <FaUserCircle className="me-2 text-primary" />
                          Personal Information
                        </h6>
                        <p>
                          <strong>Name:</strong> Peter Viceall
                          <br />
                          <strong>Gender:</strong> Male
                          <br />
                          <strong>Contact:</strong> 123-456-7890
                          <br />
                          <strong>National ID:</strong> 123456789
                          <br />
                          <strong>Emergency Contact:</strong> Jane Doe
                          (555-555-5555)
                          <br />
                          <strong>Address:</strong> 123 Main St, Los Angeles, CA
                        </p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-muted mb-2">
                          <FaPills className="me-2 text-primary" />
                          Medical Details
                        </h6>
                        <p>
                          <strong>Patient ID:</strong> {patientId}
                          <br />
                          <strong>Admission Date:</strong> {admissionDate}
                          <br />
                          <strong>Insurance Number:</strong> {insuranceNumber}
                          <br />
                          <strong>Days in Hospital:</strong> {daysInHospital}
                          <br />
                          <strong>Visit Type:</strong>{" "}
                          {selectedVisit?.type || "N/A"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h6 className="text-muted mb-2">
                          <FaFileAlt className="me-2 text-primary" />
                          Medical Information
                        </h6>
                        <Row>
                          <Col md={6}>
                            <strong>Primary Diagnosis:</strong>{" "}
                            {primaryDiagnosis}
                          </Col>
                          <Col md={6}>
                            <strong>Secondary Diagnosis:</strong>{" "}
                            {secondaryDiagnosis}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <strong>Tests Performed:</strong>
                            <ul>
                              {testsPerformed.map((test, index) => (
                                <li key={index}>{test}</li>
                              ))}
                            </ul>
                          </Col>
                          <Col md={6}>
                            <strong>Discharge Condition:</strong>{" "}
                            {dischargeCondition}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Text>
                </Col>
              </Row>
              <Tab.Container defaultActiveKey="prescriptions">
                <Nav variant="tabs" className="mb-3 justify-content-center">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="prescriptions"
                      className="rounded-pill px-4"
                    >
                      <FaClipboardCheck className="me-2" />
                      Patient Documents
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="history" className="rounded-pill px-4">
                      <FaHistory className="me-2" />
                      Hospital Visit History
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="allergies"
                      className="rounded-pill px-4"
                    >
                      <FaMoneyBillAlt className="me-2" />
                      Services and Medication charges
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notes" className="rounded-pill px-4">
                      <FaStickyNote className="me-2" />
                      Notes
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="prescriptions">
                    <Row>
                      <Col md={12}>
                        <Space
                          style={{
                            marginBottom: 16,
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <Button icon={<FaSyncAlt />} onClick={handleReload}>
                            Reload
                          </Button>
                          <Input
                            placeholder="Search documents"
                            value={searchText}
                            onChange={handleSearch}
                            style={{ width: 200 }}
                          />
                          <Button
                            type="primary"
                            disabled={!selectedRowKeys.length}
                          >
                            Selected {selectedRowKeys.length} items
                          </Button>
                        </Space>
                        <Table
                          rowSelection={rowSelection}
                          columns={columns}
                          dataSource={filteredDocs}
                        />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="history">
                    <Row>
                      <Col md={12}>
                        <Space
                          style={{
                            marginBottom: 16,
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <Input
                            placeholder="Search visit history"
                            value={searchText}
                            onChange={handleSearch}
                            style={{ width: 200 }}
                          />
                          <RangePicker
                            value={dateRange}
                            onChange={handleDateRangeChange}
                          />
                        </Space>
                        <Table
                          columns={visitHistoryColumns}
                          dataSource={filteredData}
                          rowKey="key"
                        />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  {/* Add content for other tabs */}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientEHR;