import React, { useState } from "react";
import {
  Card,
  Avatar,
  Tabs,
  List,
  Row,
  Col,
  Modal,
  Button,
  message,
  Form,
  Input,
  DatePicker,
  Space,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import moment from "moment";

const { TabPane } = Tabs;

// Mock data for testing
const mockEmployee = {
  avatar: "https://via.placeholder.com/100",
  name: "John Doe",
  department: "Cardiology",
  role: "Senior Nurse",
  dateJoined: "2020-01-15",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: "123 Main St, Anytown",
  emergencyContact: "Jane Doe",
  relation: "Wife",
  dob: "1985-08-25",
  // Add more properties as needed
};

const EmployeeProfile = ({ employee = mockEmployee }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...employee,
    dateJoined: moment(employee.dateJoined, "YYYY-MM-DD", true).isValid()
      ? moment(employee.dateJoined, "YYYY-MM-DD")
      : null,
  });

  // Error handling for undefined data
  if (!employee) {
    Modal.error({
      title: "Data Not Found",
      content: "The employee data could not be loaded. Please try again later.",
    });
    return <div>Data not found</div>;
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(employee);
  };

  const handleUpdate = () => {
    // Simulate updating data, you can send data to server here
    message.success("Employee data updated successfully");
    setEditing(false);
  };

  const onChange = (date, dateString) => {
    setFormData({
      ...formData,
      dateJoined: date, // Update dateJoined in formData with the moment object
    });
  };

  return (
    <Card>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {/* Responsive Left Column */}
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div style={{ textAlign: "center" }}>
            <Avatar size={100} src={employee.avatar} />
            <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {employee.name}
            </h2>
            <p style={{ margin: 0 }}>
              <strong>Department:</strong> {employee.department}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Role:</strong> {employee.role}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Date Joined:</strong> {employee.dateJoined}
            </p>
          </div>
        </Col>

        {/* Responsive Right Column */}
        <Col xs={24} sm={24} md={12} lg={16} xl={16}>
          <Card
            title="Employee Details"
            extra={<EditFilled onClick={handleEdit} />}
            style={{
              marginBottom: 16,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <List
              size="small"
              bordered
              dataSource={Object.entries(formData).filter(
                ([key]) =>
                  ![
                    "avatar",
                    "name",
                    "department",
                    "role",
                    "dateJoined",
                  ].includes(key)
              )}
              renderItem={([key, value]) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <strong>
                        {key
                          .replace(
                            /[A-Z]/g,
                            (letter) => ` ${letter.toLowerCase()}`
                          )
                          .trim()}
                        :
                      </strong>
                    }
                  />
                  <span style={{ color: "#666" }}>{value}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Styled Tabs Section */}
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ fontWeight: "bold", fontSize: "5.1em" }}
      >
        <TabPane
          tab={<span style={{ color: "#15A362" }}>Attendance</span>}
          key="1"
        >
          {/* Attendance content */}
        </TabPane>
        <TabPane tab={<span style={{ color: "#15A362" }}>Leaves</span>} key="2">
          {/* Leaves content */}
        </TabPane>
        <TabPane
          tab={<span style={{ color: "#15A362" }}>Roles and Permissions</span>}
          key="3"
        >
          {/* Roles and Permissions content */}
        </TabPane>
        <TabPane
          tab={<span style={{ color: "#15A362" }}>Bank and Tax Info</span>}
          key="4"
        >
          {/* Bank and Tax Info content */}
        </TabPane>
      </Tabs>

      {/* Modal Form for Editing */}
      <Modal
        title="Edit Employee Details"
        visible={editing}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
        cancelButtonProps={{
          style: { backgroundColor: "red", borderColor: "red" },
        }}
        maskClosable={false}
      >
        <Form
          labelCol={{ span: 6 }}
          initialValues={formData}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please enter the department" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter the role" }]}
          >
            <Input />
          </Form.Item>

          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date Joined"
            name="dateJoined"
            rules={[
              { required: true, message: "Please select the date joined" },
            ]}
          >
            <DatePicker
              onChange={onChange}
              defaultValue={formData.dateJoined}
              
            />
          </Form.Item>

          {/* Add more form fields as needed */}
        </Form>
      </Modal>
    </Card>
  );
};

export default EmployeeProfile;
