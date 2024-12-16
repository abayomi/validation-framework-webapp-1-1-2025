import React from 'react';
import { Button } from 'react-bootstrap';
import "./validate.css";

/**
 * Component for displaying an alert window.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Flag indicating whether to show the alert window.
 * @param {function} props.handleClose - The function to call when the alert window is closed.
 * @param {Object} [props.error] - The error object, if any.
 * @param {string} [props.modalData] - The data to display in the modal.
 * @returns {JSX.Element}
 */
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