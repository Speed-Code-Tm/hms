import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Dropdown,
} from "react-bootstrap";
import { MoreVert, Edit, ArrowBack, ArrowForward } from "@mui/icons-material";
import styled from "styled-components";
import EmployeeModal from "../components/AddEmployee";

const UserCard = styled(Card)`
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const UserManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Dummy data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      department: "IT",
      role: "Software Engineer",
      avatar: "https://source.unsplash.com/C8Ta0gwPbQg",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Marketing",
      role: "Marketing Manager",
      avatar: "https://source.unsplash.com/n4iBylRcxIc",
    },
    {
      id: 3,
      name: "Michael Johnson",
      department: "Finance",
      role: "Financial Analyst",
      avatar: "https://source.unsplash.com/JLWnuaTYVhc",
    },
    {
      id: 4,
      name: "Emily Brown",
      department: "Human Resources",
      role: "HR Specialist",
      avatar: "https://source.unsplash.com/UqvEwuOOXfo",
    },
    {
      id: 5,
      name: "David Wilson",
      department: "Sales",
      role: "Sales Representative",
      avatar: "https://source.unsplash.com/tLmtcArNVtk",
    },
  ];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.department} ${user.role}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <Container fluid style={{ marginTop: "10px" }}>
      <div className="page-header">
        <Row className="align-items-center">
          <Col className="col-auto float-end ms-auto">
            <Button
              variant="secondary"
              onClick={toggleAddModal}
              style={{ backgroundColor: "#5bc0de", borderColor: "#5bc0de" }}
            >
              <i className="fa fa-plus"></i> Add New User
            </Button>
            <EmployeeModal show={showAddModal} onHide={setShowAddModal} />
          </Col>
        </Row>
      </div>

      <div className="my-4">
        <Row>
          <Col sm={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Search Users..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ borderRadius: "20px", padding: "10px" }}
            />
          </Col>
          <Col
            sm={12}
            md={6}
            className="d-flex justify-content-end align-items-center"
          >
            <Button
              variant="outline-secondary"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              style={{ color: "#000" }}
            >
              <ArrowBack /> Previous
            </Button>
            <span
              className="mx-3"
              style={{ color: "#000" }}
            >
              Showing {indexOfFirstRecord + 1} -{" "}
              {indexOfLastRecord > filteredUsers.length
                ? filteredUsers.length
                : indexOfLastRecord}{" "}
              of {filteredUsers.length} users
            </span>

            <Button
              variant="outline-secondary"
              disabled={indexOfLastRecord >= filteredUsers.length}
              onClick={handleNextPage}
              style={{ color: "#000" }}
            >
              Next <ArrowForward />
            </Button>
          </Col>
        </Row>
      </div>

      <Row xs={1} md={2} lg={3} xl={4}>
        {currentRecords.map((user) => (
          <Col key={user.id} className="mb-4">
            <UserCard>
              <Dropdown className="card-dropdown" align="end">
                <Dropdown.Toggle
                  as={MoreVert}
                  id="dropdown-basic"
                  className="position-absolute top-0 end-0 m-2"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href={`/editUserAccess/${user.id}`}>
                    <Edit className="me-2" /> Edit User Access
                  </Dropdown.Item>
                  <Dropdown.Item href={`/viewUserProfile/${user.id}`}>
                    <i className="fa fa-eye me-2"></i> View User Profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Card.Body className="text-center">
                <Card.Img
                  variant="top"
                  src={user.avatar}
                  className="mx-auto mt-3"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <em>{user.department}</em>
                </Card.Text>
                <Card.Text>
                  <strong>Role:</strong> {user.role}
                </Card.Text>
              </Card.Body>
            </UserCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserManagement;
