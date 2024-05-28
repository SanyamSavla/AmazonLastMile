import React from 'react';
import './Modal.css'; // Ensure you have some basic styling for the modal

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
          <div className="modal-buttons">
            {/* <button onClick={onClose}>Cancel</button>
            <button onClick={onClose}>Continue</button> */}
          </div>
        </div>
      </div>
    );
  };



export default Modal;
