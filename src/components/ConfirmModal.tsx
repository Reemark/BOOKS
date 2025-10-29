
import React from 'react';
import './ConfirmModal.css'; // We will create this CSS file next

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="button confirm-button">Oui</button>
                    <button onClick={onClose} className="button cancel-button">Non</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
