import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './workplace_customization.css';
const localizer = momentLocalizer(moment);

const WorkSchedule = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [events, setEvents] = useState([]);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftDetails, setShiftDetails] = useState({
    title: "",
    start: null,
    end: null,
    employees: [],
    duties: [],
    ward: "",
    clockIn: "",
    clockOut: "",
  });

  // Fetch employees data from an API or database
  useEffect(() => {
    // Replace with your API call or data fetching logic
    const fetchedEmployees = [
      { id: 1, name: "Jane Smith", department: "Nursing", role: "Nurse" },
      { id: 2, name: "John Doe", department: "Cleaning", role: "Cleaner" },
      // Add more employees as needed
    ];
    setEmployees(fetchedEmployees);
  }, []);

  const handleSelectEvent = (event) => {
    setShiftDetails({
      title: event.title,
      start: event.start,
      end: event.end,
      employees: event.employees,
      duties: event.duties,
      ward: event.ward,
      clockIn: event.clockIn,
      clockOut: event.clockOut,
    });
    setShowShiftModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setShiftDetails({
      ...shiftDetails,
      start,
      end,
    });
    setShowShiftModal(true);
  };

  const handleShiftSubmit = () => {
    const newEvent = {
      title: shiftDetails.title,
      start: shiftDetails.start,
      end: shiftDetails.end,
      employees: shiftDetails.employees,
      duties: shiftDetails.duties,
      ward: shiftDetails.ward,
      clockIn: shiftDetails.clockIn,
      clockOut: shiftDetails.clockOut,
    };

    // Check for conflicting shifts or duties
    const hasConflict = events.some((event) => {
      return (
        event.employees.some((employee) =>
          shiftDetails.employees.includes(employee)
        ) &&
        ((event.start >= shiftDetails.start &&
          event.start < shiftDetails.end) ||
          (event.end > shiftDetails.start && event.end <= shiftDetails.end))
      );
    });

    if (hasConflict) {
      alert("Conflict detected! Please check the employee schedules.");
    } else {
      setEvents([...events, newEvent]);
      setShowShiftModal(false);
    }
  };

  const handleEmployeeSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSelectedEmployee(
      employees.find((employee) =>
        employee.name.toLowerCase().includes(searchTerm)
      ) || null
    );
  };

  const handleAddEmployee = () => {
    if (selectedEmployee) {
      setShiftDetails((prevState) => ({
        ...prevState,
        employees: [...prevState.employees, selectedEmployee],
      }));
      setSelectedEmployee(null);
    }
  };

  const renderEventContent = (event) => {
    return (
      <div>
        <h5>{event.title}</h5>
        <p>Ward: {event.ward}</p>
        <p>
          Employees:{" "}
          {event.employees.map((employee) => employee.name).join(", ")}
        </p>
        <p>Clock In: {event.clockIn}</p>
        <p>Clock Out: {event.clockOut}</p>
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Work Schedule</h2>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            views={["month", "week"]}
            components={{
              event: renderEventContent,
            }}
            selectable
            resizable
            style={{ height: 500 }}
          />
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search Employee</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee name"
              onChange={handleEmployeeSearch}
            />
          </Form.Group>
          {selectedEmployee && (
            <div>
              <p>
                <strong>Selected Employee:</strong> {selectedEmployee.name}
              </p>
              <Button variant="primary" onClick={handleAddEmployee}>
                Add to Shift
              </Button>
            </div>
          )}
          <hr />
          <h5>Shift Employees:</h5>
          <ul>
            {shiftDetails.employees.map((employee) => (
              <li key={employee.id}>{employee.name}</li>
            ))}
          </ul>
        </Col>
      </Row>

      <Modal show={showShiftModal} onHide={() => setShowShiftModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shift Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Shift Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shift title"
                value={shiftDetails.title}
                onChange={(e) =>
                  setShiftDetails({ ...shiftDetails, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ward</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ward name"
                value={shiftDetails.ward}
                onChange={(e) =>
                  setShiftDetails({ ...shiftDetails, ward: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duties</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duties"
                value={shiftDetails.duties.join(", ")}
                onChange={(e) =>
                  setShiftDetails({
                    ...shiftDetails,
                    duties: e.target.value
                      .split(",")
                      .map((duty) => duty.trim()),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Clock In</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter clock in time (e.g., 08:00 AM)"
                value={shiftDetails.clockIn}
                onChange={(e) =>
                  setShiftDetails({ ...shiftDetails, clockIn: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Clock Out</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter clock out time (e.g., 04:00 PM)"
                value={shiftDetails.clockOut}
                onChange={(e) =>
                  setShiftDetails({ ...shiftDetails, clockOut: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowShiftModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleShiftSubmit}>
            Save Shift
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WorkSchedule;
