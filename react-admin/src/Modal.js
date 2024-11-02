import React from 'react';
import './modal.scss'; // Add CSS styles here

const Modal = ({ title, onDelete, onCancel }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
      <button className="closeButton" onClick={onCancel}>×</button>
        <h2 className="modalTitle">{title}</h2>
        <div className="modalActions">
          <button className="cancelButton" onClick={onCancel}>
            Cancel
          </button>
          <button className="deleteButton" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
