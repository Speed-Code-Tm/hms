import React, { useState } from "react";
import { Modal, Form, Button, ListGroup, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faHeart,
  faThermometer,
  faTint,
  faWeight,
  faSyringe,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import styled from "styled-components";

// Dummy data
const dummyAllergies = ["Peanuts", "Dust"];
const dummyVitalSigns = {
  temperature: "",
  temperatureUnit: "F",
  bloodPressure: { systolic: "", diastolic: "" },
  heartRate: "",
  bloodType: "",
  weight: "",
  bloodSugarLevel: "",
};

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const VitalSigns = ({
  show,
  onHide,
  patientName,
  patientAge,
  loggedInUser,
}) => {
  const [allergies, setAllergies] = useState(dummyAllergies);
  const [newAllergy, setNewAllergy] = useState("");
  const [vitalSigns, setVitalSigns] = useState(dummyVitalSigns);
  const [editMode, setEditMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);

  const validationSchema = Yup.object().shape({
    temperature: Yup.number().when("age", {
      is: (age) => age < 18,
      then: Yup.number().required("Temperature is required for children"),
      otherwise: Yup.number(),
    }),
    bloodPressure: Yup.object().when(["age", "bloodPressureEntered"], {
      is: (age, bloodPressureEntered) =>
        age >= 18 && bloodPressureEntered === true,
      then: Yup.object().shape({
        systolic: Yup.number().required("Systolic blood pressure is required"),
        diastolic: Yup.number().required(
          "Diastolic blood pressure is required"
        ),
      }),
      otherwise: Yup.object().shape({
        systolic: Yup.number(),
        diastolic: Yup.number(),
      }),
    }),
    heartRate: Yup.number().when(["age", "bloodPressureEntered"], {
      is: (age, bloodPressureEntered) =>
        age >= 18 && bloodPressureEntered === true,
      then: Yup.number().required("Heart rate is required"),
      otherwise: Yup.number(),
    }),
    bloodType: Yup.string(),
    weight: Yup.number(),
    bloodSugarLevel: Yup.number().when("age", {
      is: (age) => age >= 18,
      then: Yup.number().required("Blood sugar level is required for adults"),
      otherwise: Yup.number(),
    }),
  });

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleAllergyChange = (e) => {
    setNewAllergy(e.target.value);
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleVitalSignChange = (field, value) => {
    if (field === "bloodPressure") {
      setVitalSigns({ ...vitalSigns, [field]: value });
    } else {
      setVitalSigns({ ...vitalSigns, [field]: value });
    }
  };

  const handleSave = async () => {
    try {
      await validationSchema.validate(
        { ...vitalSigns, age: patientAge },
        { abortEarly: false }
      );
      // Save vital signs to the database or perform any necessary operations
      setEditMode(false);
      // Show success message or perform any necessary actions
    } catch (error) {
      // Show error message or perform any necessary actions
      console.error(error);
    }
  };

  const getBloodSugarLevel = (value) => {
    if (value < 100) {
      return "Normal";
    } else if (value >= 100 && value < 126) {
      return "Pre-diabetes";
    } else {
      return "Diabetes";
    }
  };

  const getBloodSugarLevelColor = (value) => {
    if (value < 100) {
      return "green";
    } else if (value >= 100 && value < 126) {
      return "orange";
    } else {
      return "red";
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
    if (isCelsius) {
      setVitalSigns({
        ...vitalSigns,
        temperature: ((vitalSigns.temperature - 32) * 5) / 9,
        temperatureUnit: "C",
      });
    } else {
      setVitalSigns({
        ...vitalSigns,
        temperature: (vitalSigns.temperature * 9) / 5 + 32,
        temperatureUnit: "F",
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon
            icon={faSyringe}
            style={{ color: "#c63737", marginRight: "10px" }}
          />
          Vital Signs & Allergies ({patientName}, {patientAge} years old)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              <FontAwesomeIcon
                icon={faSyringe}
                style={{ color: "#c63737", marginRight: "10px" }}
              />
              Allergies
            </Form.Label>
            {editMode ? (
              <>
                <Form.Control
                  type="text"
                  value={newAllergy}
                  onChange={handleAllergyChange}
                  placeholder="Enter allergy"
                  className="mb-2"
                />
                <ListGroup>
                  {allergies.map((allergy, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{allergy}</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{
                          cursor: "pointer",
                          color: "#c63737",
                          marginLeft: "0.5rem",
                        }}
                        onClick={() => handleRemoveAllergy(index)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            ) : (
              allergies.join(", ")
            )}
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faThermometer}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Temperature
                </StyledLabel>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.temperature}
                    onChange={(e) =>
                      handleVitalSignChange("temperature", e.target.value)
                    }
                    isInvalid={!!validationSchema.fields.temperature?.error}
                    disabled={!editMode}
                    className="mr-2"
                  />
                  <span>
                    {vitalSigns.temperatureUnit === "F" ? "°F" : "°C"}
                  </span>
                  <ToggleButton
                    id="temperature-switch"
                    checked={isCelsius}
                    onChange={toggleTemperatureUnit}
                    className="ml-2"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {validationSchema.fields.temperature?.error}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Heart Rate (bpm)
                </StyledLabel>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.heartRate}
                    onChange={(e) =>
                      handleVitalSignChange("heartRate", e.target.value)
                    }
                    isInvalid={!!validationSchema.fields.heartRate?.error}
                    disabled={!editMode}
                    className="mr-2"
                  />
                  <span>bpm</span>
                </div>
                <Form.Control.Feedback type="invalid">
                  {validationSchema.fields.heartRate?.error}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faTint}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Blood Type
                </StyledLabel>
                <Form.Control
                  as="select"
                  value={vitalSigns.bloodType}
                  onChange={(e) =>
                    handleVitalSignChange("bloodType", e.target.value)
                  }
                  disabled={!editMode}
                >
                  <option value="">Select blood type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faTint}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Blood Pressure (mmHg)
                </StyledLabel>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.bloodPressure.systolic}
                    onChange={(e) =>
                      handleVitalSignChange("bloodPressure", {
                        ...vitalSigns.bloodPressure,
                        systolic: e.target.value,
                      })
                    }
                    isInvalid={
                      !!validationSchema.fields.bloodPressure?.error &&
                      !!validationSchema.fields.bloodPressure?.error?.message
                    }
                    disabled={!editMode}
                    placeholder="Systolic"
                    className="mr-2"
                    onBlur={() =>
                      handleVitalSignChange("bloodPressureEntered", true)
                    }
                  />
                  <span>mmHg</span>
                </div>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.bloodPressure.diastolic}
                    onChange={(e) =>
                      handleVitalSignChange("bloodPressure", {
                        ...vitalSigns.bloodPressure,
                        diastolic: e.target.value,
                      })
                    }
                    isInvalid={
                      !!validationSchema.fields.bloodPressure?.error &&
                      !!validationSchema.fields.bloodPressure?.error?.message
                    }
                    disabled={!editMode}
                    placeholder="Diastolic"
                    className="mr-2"
                    onBlur={() =>
                      handleVitalSignChange("bloodPressureEntered", true)
                    }
                  />
                  <span>mmHg</span>
                </div>
                <Form.Control.Feedback type="invalid">
                  {validationSchema.fields.bloodPressure?.error?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faWeight}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Weight (kg)
                </StyledLabel>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.weight}
                    onChange={(e) =>
                      handleVitalSignChange("weight", e.target.value)
                    }
                    isInvalid={!!validationSchema.fields.weight?.error}
                    disabled={!editMode}
                    className="mr-2"
                  />
                  <span>kg</span>
                </div>
                <Form.Control.Feedback type="invalid">
                  {validationSchema.fields.weight?.error}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <StyledLabel>
                  <FontAwesomeIcon
                    icon={faTint}
                    style={{ color: "#c63737", marginRight: "10px" }}
                  />
                  Blood Sugar Level (mg/dL)
                </StyledLabel>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    value={vitalSigns.bloodSugarLevel}
                    onChange={(e) =>
                      handleVitalSignChange("bloodSugarLevel", e.target.value)
                    }
                    isInvalid={!!validationSchema.fields.bloodSugarLevel?.error}
                    disabled={!editMode}
                    className="mr-2"
                  />
                  <span>mg/dL</span>
                  {vitalSigns.bloodSugarLevel && (
                    <span
                      style={{
                        marginLeft: "10px",
                        color: getBloodSugarLevelColor(
                          vitalSigns.bloodSugarLevel
                        ),
                        fontWeight: "bold",
                      }}
                    >
                      {getBloodSugarLevel(vitalSigns.bloodSugarLevel)}
                    </span>
                  )}
                </div>
                <Form.Control.Feedback type="invalid">
                  {validationSchema.fields.bloodSugarLevel?.error}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {editMode ? (
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
export default VitalSigns;
