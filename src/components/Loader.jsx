import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderAnimation = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  animation: loadingAnimation 2s infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: #ff4d4f;
    animation: bloodAnimation 2s infinite;
  }

  @keyframes loadingAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bloodAnimation {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(0);
    }
  }
  `;


const Loader = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDialog, setShowDialog] = useState(!isOnline);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowDialog(false);
      toast.success('You are back online!');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowDialog(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {showDialog && (
        <LoaderContainer>
          <div>
            <LoaderAnimation />
            <h2>No Internet Connection</h2>
            <button onClick={handleRefresh}>Refresh</button>
          </div>
        </LoaderContainer>
      )}
      <ToastContainer />
    </>
  );
};

export default Loader;