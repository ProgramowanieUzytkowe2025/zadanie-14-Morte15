import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Potwierdzenie</h3>
      <p>Czy na pewno chcesz usunąć ten rekord?</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className="btn-confirm">Usuń</button> 
        <button onClick={onCancel} className="btn-cancel">Anuluj</button> 
      </div>
    </div>
  </div>
);

export default ConfirmationModal;