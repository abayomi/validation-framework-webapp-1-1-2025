import React from 'react';
import { Button } from 'react-bootstrap';
import "./validate.css";

const AlertWindow = ({ show, handleClose, error, modalData }) => {
    if (!show) {
      return <></>;
    }
  
    const handleOverlayClick = (e) => {
      if (e.target.className === 'overlay') {
        handleClose();
      }
    };
  
    return (
      <div className="overlay" onClick={handleOverlayClick}>
        <div className="alert-popup" variant="info" onClose={handleClose} dismissible="true">
          {error && <p>Error: {error.message}</p>}
          {modalData && <pre>{modalData}</pre>}
          <div className="d-flex justify-content-end">
            <Button onClick={handleClose} variant="outline-primary">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AlertWindow;