import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';

// Styled Modal component
const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 800px;
  }
  .modal-content{
    min-height:400px;
  }

  .modal-header {
    background-color: #007bff;
    color: #fff;
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .modal-header .close {
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }
`;

// Styled modal header
const StyledModalHeader = styled(Modal.Header)`
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

// Styled modal title
const StyledModalTitle = styled(Modal.Title)`
  font-weight: bold;
  font-size: 1.25rem;
`;

// Styled button row
const StyledButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

// Styled submit button
const StyledSubmitButton = styled(Button)`
  width: 200px;
`;

// Reusable Modal Component
const ReusableModal = ({ show, onHide, title,  children,customClass }) => {
  return (
    <StyledModal  className={customClass} show={show} onHide={onHide}  centered>
      <StyledModalHeader closeButton>
        <StyledModalTitle>{title}</StyledModalTitle>
      </StyledModalHeader>
      <Modal.Body>
       
         
          {children}
          
         
      </Modal.Body>
    </StyledModal>
  );
};

export default ReusableModal;
