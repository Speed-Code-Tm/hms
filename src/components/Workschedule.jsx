import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./workplace_customization.css";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

const WorkSchedule = () => {
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftDetails, setShiftDetails] = useState({
    start: null,
    end: null,
    employees: [],
    duties: [],
    wards: [],
    clockIn: null,
    clockOut: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dutyInput, setDutyInput] = useState("");
  const [wardInput, setWardInput] = useState("");
  const [newDuty, setNewDuty] = useState([]);
  const [newWard, setNewWard] = useState([]);

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
      start: event.start,
      end: event.end,
      employees: event.employees,
      duties: event.duties,
      wards: event.wards,
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
      start: shiftDetails.start,
      end: shiftDetails.end,
      employees: shiftDetails.employees,
      duties: shiftDetails.duties,
      wards: shiftDetails.wards,
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
      toast.error("Conflict detected! Please check the employee schedules.");
    } else {
      setEvents([...events, newEvent]);
      setShowShiftModal(false);
    }
  };

  const handleEmployeeSearch = (event, value) => {
    if (value) {
      setShiftDetails((prevState) => ({
        ...prevState,
        employees: [...prevState.employees, value],
      }));
    }
  };

  const handleEmployeeRemove = (employee) => {
    setShiftDetails((prevState) => ({
      ...prevState,
      employees: prevState.employees.filter((emp) => emp !== employee),
    }));
  };

  const handleDutyAdd = () => {
    if (dutyInput.trim()) {
      setNewDuty([...newDuty, dutyInput.trim()]);
      setDutyInput("");
    }
  };

  const handleDutyRemove = (duty) => {
    setNewDuty(newDuty.filter((d) => d !== duty));
  };

  const handleWardAdd = () => {
    if (wardInput.trim()) {
      setNewWard([...newWard, wardInput.trim()]);
      setWardInput("");
    }
  };

  const handleWardRemove = (ward) => {
    setNewWard(newWard.filter((w) => w !== ward));
  };

  const handleDutyInputChange = (e) => {
    setDutyInput(e.target.value);
  };

  const handleWardInputChange = (e) => {
    setWardInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (dutyInput.trim()) {
        setNewDuty([...newDuty, dutyInput.trim()]);
        setDutyInput("");
      }
      if (wardInput.trim()) {
        setNewWard([...newWard, wardInput.trim()]);
        setWardInput("");
      }
    }
  };

  const renderEventContent = (event) => {
    return (
      <div>
        <h5>Shift</h5>
        <p>Duties: {event.duties.join(", ")}</p>
        <p>Wards: {event.wards.join(", ")}</p>
        <p>
          Employees:{" "}
          {event.employees.map((employee) => employee.name).join(", ")}
        </p>
        <p>Clock In: {moment(event.clockIn).format("hh:mm A")}</p>
        <p>Clock Out: {moment(event.clockOut).format("hh:mm A")}</p>
      </div>
    );
  };

  const renderShiftsList = () => {
    const shiftsForSelectedDate = events.filter((event) =>
      moment(event.start).isSame(selectedDate, "day")
    );

    return (
      <ListGroup>
        {shiftsForSelectedDate.length > 0 ? (
          shiftsForSelectedDate.map((shift, index) => (
            <ListGroup.Item
              key={index}
              style={index % 2 === 0 ? { backgroundColor: "#f2f2f2" } : {}}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Shift</Typography>
                <Typography variant="body2">{`${moment(shift.clockIn).format(
                  "hh:mm A"
                )} - ${moment(shift.clockOut).format("hh:mm A")}`}</Typography>
              </Box>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>
            <Typography>No work scheduled for this date.</Typography>
          </ListGroup.Item>
        )}
      </ListGroup>
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
            onNavigate={(date) => setSelectedDate(date)}
          />
        </Col>
        <Col md={3}>
          <h5>Shifts for {moment(selectedDate).format("MMMM DD, YYYY")}</h5>
          {renderShiftsList()}
          <Button
            variant="primary"
            onClick={() => setShowShiftModal(true)}
            style={{ marginTop: "1rem" }}
          >
            Add New Shift
          </Button>
        </Col>
      </Row>

      <Modal
        show={showShiftModal}
        onHide={() => setShowShiftModal(false)}
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#FF9B44",
            color: "black",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <Modal.Title>Shift Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group>
                  <Form.Label>Shift Date</Form.Label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    value={moment(shiftDetails.start).format("YYYY-MM-DD")}
                    onChange={(e) =>
                      setShiftDetails({
                        ...shiftDetails,
                        start: moment(e.target.value, "YYYY-MM-DD").toDate(),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Clock In Time</Form.Label>
                  <input
                    required
                    className="form-control"
                    type="time"
                    value={moment(shiftDetails.clockIn).format("HH:mm")}
                    onChange={(e) =>
                      setShiftDetails({
                        ...shiftDetails,
                        clockIn: moment(e.target.value, "HH:mm").toDate(),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Clock Out Time</Form.Label>
                  <input
                    required
                    className="form-control"
                    type="time"
                    value={moment(shiftDetails.clockOut).format("HH:mm")}
                    onChange={(e) =>
                      setShiftDetails({
                        ...shiftDetails,
                        clockOut: moment(e.target.value, "HH:mm").toDate(),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Duties</Form.Label>
                  <ListGroup>
                    {newDuty.map((duty, index) => (
                      <ListGroup.Item key={index}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography>{duty}</Typography>
                          <IconButton
                            onClick={() => handleDutyRemove(duty)}
                            aria-label="Remove Duty"
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListGroup.Item>
                    ))}
                    <ListItem button onClick={handleDutyAdd}>
                      <ListItemText primary={dutyInput} />
                      {dutyInput && (
                        <IconButton
                          onClick={handleDutyAdd}
                          aria-label="Add Duty"
                          edge="end"
                          style={{ backgroundColor: "green" }}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      )}
                    </ListItem>
                  </ListGroup>
                  <Form.Control
                    type="text"
                    placeholder="Add new duty"
                    value={dutyInput}
                    onChange={handleDutyInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Wards</Form.Label>
                  <ListGroup>
                    {newWard.map((ward, index) => (
                      <ListGroup.Item key={index}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography>{ward}</Typography>
                          <IconButton
                            onClick={() => handleWardRemove(ward)}
                            aria-label="Remove Ward"
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListGroup.Item>
                    ))}
                    <ListItem button onClick={handleWardAdd}>
                      <ListItemText primary={wardInput} />
                      {wardInput && (
                        <IconButton
                          onClick={handleWardAdd}
                          aria-label="Add Ward"
                          edge="end"
                          style={{ backgroundColor: "green" }}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      )}
                    </ListItem>
                  </ListGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter ward name"
                    value={wardInput}
                    onChange={handleWardInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search and Add Employees</Form.Label>
                <Autocomplete
                  options={employees.map((employee) => employee)}
                  getOptionLabel={(option) => option.name}
                  onChange={handleEmployeeSearch}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Form.Group>
              <ListGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
                {shiftDetails.employees.map((employee, index) => (
                  <ListGroup.Item key={index}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <ListItemAvatar>
                        <Avatar>{employee.name[0]}</Avatar>
                      </ListItemAvatar>
                      <Typography>{employee.name}</Typography>
                      <IconButton
                        onClick={() => handleEmployeeRemove(employee)}
                        aria-label="Remove Employee"
                        style={{ backgroundColor: "red" }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
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
      <ToastContainer />
    </Container>
  );
};

export default WorkSchedule;
