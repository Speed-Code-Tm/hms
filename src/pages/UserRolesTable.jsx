import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const UserRoleMapping = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedActions, setSelectedActions] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const roles = [
    {
      id: 1,
      name: 'Reception',
      description: 'Manage patient appointments, check insurance, and handle front desk tasks.',
      actions: [
        { id: 1, name: 'View', description: 'View patient records and appointment details.' },
        { id: 2, name: 'Edit', description: 'Edit patient records and appointment details.' },
        { id: 3, name: 'Create', description: 'Create new patient records and appointments.' },
        { id: 4, name: 'Delete', description: 'Delete patient records and appointments.' },
      ],
    },
    {
      id: 2,
      name: 'Doctor',
      description: 'Manage patient medical records, diagnose, and prescribe treatments.',
      actions: [
        { id: 1, name: 'View', description: 'View patient medical records and history.' },
        { id: 2, name: 'Edit', description: 'Edit patient medical records and update diagnoses.' },
        { id: 3, name: 'Create', description: 'Create new patient medical records.' },
        { id: 4, name: 'Delete', description: 'Delete patient medical records.' },
      ],
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedActions([]);
  };

  const handleActionChange = (event) => {
    const actionId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedActions([...selectedActions, actionId]);
    } else {
      setSelectedActions(selectedActions.filter((id) => id !== actionId));
    }
  };

  const handleConfirmRoleMapping = () => {
    setShowConfirmationModal(true);
  };

  const renderConfirmationModal = () => {
    if (!selectedRole) {
      return null; // Return early if selectedRole is null
    }

    return (
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Role Mapping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h6">Selected Role:</Typography>
          <Typography variant="body1">{selectedRole.name}</Typography>
          <Typography variant="body2">{selectedRole.description}</Typography>
          <Typography variant="h6">Selected Actions:</Typography>
          <ListGroup>
            {selectedRole.actions &&
              selectedRole.actions.length > 0 &&
              selectedRole.actions
                .filter((action) => selectedActions.includes(action.id))
                .map((action) => (
                  <ListGroup.Item key={action.id}>
                    <Typography variant="body1">{action.name}</Typography>
                    <Typography variant="body2">{action.description}</Typography>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSaveRoleMapping()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSaveRoleMapping = () => {
    // Implement your logic to save the role mapping here
    
    
    setShowConfirmationModal(false);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Select Role</Card.Title>
              <ListGroup>
                {roles.map((role) => (
                  <ListGroup.Item
                    key={role.id}
                    action
                    active={selectedRole?.id === role.id}
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Assign Actions</Card.Title>
              {selectedRole && (
                <Form>
                  {selectedRole.actions.map((action) => (
                    <FormControlLabel
                      key={action.id}
                      control={
                        <Checkbox
                          checked={selectedActions.includes(action.id)}
                          onChange={handleActionChange}
                          value={action.id}
                        />
                      }
                      label={action.name}
                    />
                  ))}
                  <Button variant="primary" onClick={handleConfirmRoleMapping}>
                    Confirm Role Mapping
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {renderConfirmationModal()}
    </Container>
  );
};

export default UserRoleMapping;