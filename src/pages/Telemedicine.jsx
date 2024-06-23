import React, { useMemo, useState } from 'react';
import { Container, DropdownButton, Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import ReusableTable from './ReusableTable';
import VideoCall from '../components/videoCall';

const Telemedicine = () => {
  const [data, setData] = useState([
    { id: 1, patientName: 'John Doe', specialist: 'Dr. Smith', startTime: '10:00 AM', duration: '30 min', date: '2024-04-10', status: 'Scheduled' },
    { id: 2, patientName: 'Jane Smith', specialist: 'Dr. Johnson', startTime: '11:00 AM', duration: '45 min', date: '2024-04-11', status: 'Pending Approval' },
    { id: 3, patientName: 'Bob Johnson', specialist: 'Dr. Lee', startTime: '02:00 PM', duration: '20 min', date: '2024-04-12', status: 'Completed' },
  ]);

  const [callDetails, setCallDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCancelable, setIsCancelable] = useState(true);

  const COLUMNS = [
    { Header: 'Patient Name', accessor: 'patientName' },
    { Header: 'Specialist', accessor: 'specialist' },
    { Header: 'Start Time', accessor: 'startTime' },
    { Header: 'Duration', accessor: 'duration' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Status', accessor: 'status' },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const startCall = async (hospitalId, doctorId, patientId, duration) => {
    setLoading(true);
    setShowModal(true);
    setStatusMessage('Connecting to the server...');
    setProgress(10);

    try {
      const response = await fetch('/create-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hospitalId, doctorId, patientId, duration }),
      });

      setProgress(50);
      setStatusMessage('Generating the token...');

      if (response.ok) {
        const { id, channelName, token } = await response.json();
        setCallDetails({ id, channelName, token });
        setProgress(100);
        setStatusMessage('Video call ready!');
        setIsCancelable(false);
      } else {
        console.error('Error creating call:', response.status);
        setStatusMessage('Error creating call');
        setProgress(0);
      }
    } catch (error) {
      console.error('Error creating call:', error);
      setStatusMessage('Error connecting to server');
      setProgress(0);
    }
    setLoading(false);
  };

  const openSession = async (row) => {
    const { patientName, specialist, duration } = row.original;
    const hospitalId = 'hospital123'; // Replace with your actual hospital ID
    await startCall(hospitalId, specialist, patientName, duration.replace(' min', ''));
  };

  const handleClose = () => {
    if (isCancelable) {
      setShowModal(false);
      setProgress(0);
      setStatusMessage('');
    }
  };

  return (
    <Container className="telemedicine-container">
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <ActionCell>
            <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
              <Dropdown.Item onClick={() => openSession(row)}>
                Start Session
              </Dropdown.Item>
              <Dropdown.Item>Reschedule Session</Dropdown.Item>
              <Dropdown.Item>Rebook Session</Dropdown.Item>
              <Dropdown.Item>Cancel Session</Dropdown.Item>
            </DropdownButton>
          </ActionCell>
        )}
      />
      {loading && <p>Please wait, preparing video call...</p>}
      {callDetails && (
        <VideoCall channelName={callDetails.channelName} token={callDetails.token} />
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton={isCancelable}>
          <Modal.Title>Preparing Video Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{statusMessage}</p>
          <ProgressBar now={progress} label={`${progress}%`} />
        </Modal.Body>
        <Modal.Footer>
          {isCancelable && (
            <button onClick={handleClose} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
`;

export default Telemedicine;
