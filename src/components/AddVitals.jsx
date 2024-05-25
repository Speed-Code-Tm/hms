import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  message,
  List,
  Input,
  Typography,
  Switch,
  InputNumber,
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThermometer,
  faTint,
  faWeight,
  faSyringe,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

// Dummy data
const dummyAllergies = ["Peanuts", "Dust"];
const dummyVitalSigns = {
  temperature: 98.6,
  bloodPressure: { systolic: 120, diastolic: 80 },
  heartRate: 75,
  bloodType: "O+",
  weight: 70,
  bloodSugarLevel: 100,
};

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const { Text } = Typography;

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
  const [originalVitalSigns, setOriginalVitalSigns] = useState(dummyVitalSigns);

  const validationSchema = Yup.object().shape({
    temperature: Yup.number().required("Temperature is required"),
    bloodPressure: Yup.object().shape({
      systolic: Yup.number()
        .min(70, "Systolic blood pressure must be between 70 and 190")
        .max(190, "Systolic blood pressure must be between 70 and 190")
        .required("Systolic blood pressure is required"),
      diastolic: Yup.number()
        .min(40, "Diastolic blood pressure must be between 40 and 100")
        .max(100, "Diastolic blood pressure must be between 40 and 100")
        .required("Diastolic blood pressure is required"),
    }),
    heartRate: Yup.number()
      .min(40, "Heart rate must be between 40 and 180")
      .max(180, "Heart rate must be between 40 and 180")
      .required("Heart rate is required"),
    bloodType: Yup.string().required("Blood type is required"),
    weight: Yup.number()
      .min(20, "Weight must be between 20 and 300")
      .max(300, "Weight must be between 20 and 300")
      .required("Weight is required"),
    bloodSugarLevel: Yup.number().required("Blood sugar level is required"),
  });

  const handleEditClick = () => {
    setEditMode(true);
    setOriginalVitalSigns(vitalSigns);
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
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    setAllergies(newAllergies);
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
      await validationSchema.validate(vitalSigns, { abortEarly: false });
      // Save vital signs to the database or perform any necessary operations
      setEditMode(false);
      setOriginalVitalSigns(vitalSigns);
      message.success("Vital signs updated successfully");
    } catch (error) {
      message.error("Please correct the following errors:");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setVitalSigns(originalVitalSigns);
    setAllergies(dummyAllergies);
    setNewAllergy("");
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
      });
    } else {
      setVitalSigns({
        ...vitalSigns,
        temperature: (vitalSigns.temperature * 9) / 5 + 32,
      });
    }
  };

  return (
    <Modal
      title={
        <div>
          <FontAwesomeIcon
            icon={faSyringe}
            style={{ color: "#c63737", marginRight: "10px" }}
          />
          Vital Signs & Allergies
        </div>
      }
      visible={show}
      onCancel={onHide}
      footer={[
        <Button key="back" onClick={onHide}>
          Close
        </Button>,
        editMode ? (
          <>
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button key="edit" type="primary" onClick={handleEditClick}>
            Edit
          </Button>
        ),
      ]}
    >
      <Form
        labelCol={{ span: 11 }}
        wrapperCol={{ span: 14, fontWeight: 18 }}
        layout="horizontal"
        initialValues={editMode ? vitalSigns : originalVitalSigns}
      >
        <Form.Item label={<Label icon={faSyringe} text="Allergies" />}>
          {editMode ? (
            <>
              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  value={newAllergy}
                  onChange={handleAllergyChange}
                  placeholder="Enter allergy"
                />
                <Button type="primary" onClick={handleAddAllergy}>
                  <FontAwesomeIcon icon={faPlus} /> Add Allergy
                </Button>
              </Input.Group>
              <List
                dataSource={allergies}
                renderItem={(allergy, index) => (
                  <List.Item>
                    {allergy}
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{
                        cursor: "pointer",
                        color: "#c63737",
                        marginLeft: "8px",
                      }}
                      onClick={() => handleRemoveAllergy(index)}
                    />
                  </List.Item>
                )}
              />
            </>
          ) : (
            allergies.join(", ")
          )}
        </Form.Item>
        <Form.Item
          label={<Label icon={faThermometer} text="Temperature" />}
          name="temperature"
          rules={[{ required: true, message: "Temperature is required" }]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputNumber
              value={vitalSigns.temperature}
              onChange={(value) => handleVitalSignChange("temperature", value)}
              disabled={!editMode}
            />
            <Text>{isCelsius ? "°C" : "°F"}</Text>
            <Switch
              checked={isCelsius}
              onChange={toggleTemperatureUnit}
              style={{ marginLeft: 8 }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label={<Label icon={faHeart} text="Heart Rate (bpm)" />}
          name="heartRate"
          rules={[{ required: true, message: "Heart rate is required" }]}
        >
          <InputNumber
            value={vitalSigns.heartRate}
            onChange={(value) => handleVitalSignChange("heartRate", value)}
            disabled={!editMode}
            addonAfter="bpm"
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={faTint} text="Blood Type" />}
          name="bloodType"
          rules={[{ required: true, message: "Blood type is required" }]}
        >
          <Select
            value={vitalSigns.bloodType}
            onChange={(value) => handleVitalSignChange("bloodType", value)}
            disabled={!editMode}
          >
            <Select.Option value="">Select blood type</Select.Option>
            {bloodTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<Label icon={faTint} text="Blood Pressure (mmHg)" />}
          name="bloodPressure"
          rules={[
            { required: true, message: "Blood pressure is required" },
            {
              validator: (_, value) => {
                if (!value || !value.systolic || !value.diastolic) {
                  return Promise.reject(
                    "Both systolic and diastolic values are required"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputNumber
              value={vitalSigns.bloodPressure.systolic}
              onChange={(value) =>
                handleVitalSignChange("bloodPressure", {
                  ...vitalSigns.bloodPressure,
                  systolic: value,
                })
              }
              disabled={!editMode}
              placeholder="Systolic"
              style={{ marginRight: 8 }}
            />
            <Text>mmHg</Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputNumber
              value={vitalSigns.bloodPressure.diastolic}
              onChange={(value) =>
                handleVitalSignChange("bloodPressure", {
                  ...vitalSigns.bloodPressure,
                  diastolic: value,
                })
              }
              disabled={!editMode}
              placeholder="Diastolic"
              style={{ marginRight: 8 }}
            />
            <Text>mmHg</Text>
          </div>
        </Form.Item>
        <Form.Item
          label={<Label icon={faWeight} text="Weight (kg)" />}
          name="weight"
          rules={[{ required: true, message: "Weight is required" }]}
        >
          <InputNumber
            value={vitalSigns.weight}
            onChange={(value) => handleVitalSignChange("weight", value)}
            disabled={!editMode}
            addonAfter="kg"
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={faTint} text="Blood Sugar Level (mg/dL)" />}
          name="bloodSugarLevel"
          rules={[{ required: true, message: "Blood sugar level is required" }]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputNumber
              value={vitalSigns.bloodSugarLevel}
              onChange={(value) =>
                handleVitalSignChange("bloodSugarLevel", value)
              }
              disabled={!editMode}
              style={{ marginRight: 8 }}
            />
            <Text>mg/dL</Text>
            {vitalSigns.bloodSugarLevel && (
              <Text
                style={{
                  marginLeft: 8,
                  color: getBloodSugarLevelColor(vitalSigns.bloodSugarLevel),
                  fontWeight: "bold",
                }}
              >
                {getBloodSugarLevel(vitalSigns.bloodSugarLevel)}
              </Text>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const Label = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon icon={icon} style={{ color: "#c63737", marginRight: 8 }} />
    <Text strong>{text}</Text>
  </div>
);
export default VitalSigns;
