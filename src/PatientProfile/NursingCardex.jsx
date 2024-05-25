import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  List,
  Input,
  Button,
  Divider,
  Form,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const CardexForm = () => {
  const [treatments, setTreatments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [ivfs, setIvfs] = useState([]);
  const [newTreatment, setNewTreatment] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newIvf, setNewIvf] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingText, setEditingText] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAddTreatment = () => {
    if (newTreatment.trim()) {
      setTreatments([...treatments, { text: newTreatment, date: new Date() }]);
      setNewTreatment("");
    }
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setMedications([
        ...medications,
        { text: newMedication, date: new Date() },
      ]);
      setNewMedication("");
    }
  };

  const handleAddIvf = () => {
    if (newIvf.trim()) {
      setIvfs([...ivfs, { text: newIvf, date: new Date() }]);
      setNewIvf("");
    }
  };

  const handleRemoveItem = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleEditItem = (index, text) => {
    setEditingIndex(index);
    setEditingText(text);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setIvfs((prevItems) =>
      prevItems.map((item, i) =>
        i === editingIndex ? { ...item, text: editingText } : item
      )
    );
    setEditingIndex(-1);
    setEditingText("");
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditingText("");
    setShowEditModal(false);
  };

  const handleConfirmDelete = (item) => {
    setIvfs((prevItems) => prevItems.filter((i) => i !== item));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "4px",
              }}
            >
              <Title level={4}>Patient Information</Title>
              <Form layout="inline" style={{ marginBottom: "24px" }}>
                <Form.Item label="Patient Name" style={{ marginRight: "16px" }}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Primary Diagnosis"
                  style={{ marginRight: "16px" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Secondary Diagnosis"
                  style={{ marginRight: "16px" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Admission Date"
                  style={{ marginRight: "16px" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Phone Number" style={{ marginRight: "16px" }}>
                  <Input />
                </Form.Item>
                <Form.Item label="IP Number" style={{ marginRight: "16px" }}>
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "4px",
              }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                Treatment
              </Title>
              <List
                dataSource={treatments}
                renderItem={(treatment, index) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditItem(index, treatment.text)}
                      />,
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(treatment)}
                      />,
                    ]}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    <List.Item.Meta
                      title={treatment.text}
                      description={treatment.date.toLocaleString()}
                    />
                  </List.Item>
                )}
              />
              <Input.Group compact style={{ marginTop: "12px" }}>
                <Input
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  placeholder="Add new treatment"
                  style={{ width: "200px" }}
                />
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={handleAddTreatment}
                />
              </Input.Group>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "4px",
              }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                Medications
              </Title>
              <List
                dataSource={medications}
                renderItem={(medication, index) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditItem(index, medication.text)}
                      />,
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(medication)}
                      />,
                    ]}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    <List.Item.Meta
                      title={medication.text}
                      description={medication.date.toLocaleString()}
                    />
                  </List.Item>
                )}
              />
              <Input.Group compact style={{ marginTop: "12px" }}>
                <Input
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  placeholder="Add new medication"
                  style={{ width: "200px" }}
                />
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={handleAddMedication}
                />
              </Input.Group>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "4px",
              }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                IVF
              </Title>
              <List
                dataSource={ivfs}
                renderItem={(ivf, index) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditItem(index, ivf.text)}
                      />,
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(ivf)}
                      />,
                    ]}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    <List.Item.Meta
                      title={ivf.text}
                      description={ivf.date.toLocaleString()}
                    />
                  </List.Item>
                )}
              />
              <Input.Group compact style={{ marginTop: "12px" }}>
                <Input
                  value={newIvf}
                  onChange={(e) => setNewIvf(e.target.value)}
                  placeholder="Add new IVF"
                  style={{ width: "200px" }}
                />
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={handleAddIvf}
                />
              </Input.Group>
            </div>
          </Col>
        </Row>
      </Content>

      <Modal
        title="Edit Item"
        open={showEditModal}
        onOk={handleSaveEdit}
        onCancel={handleCancelEdit}
      >
        {/* Edit Item Modal Content */}
      </Modal>

      <Modal
        title="Delete Item"
        open={showDeleteModal}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        {/* Delete Item Modal Content */}
      </Modal>
    </Layout>
  );
};

export default CardexForm;
