import React from 'react';
import './SectionModal.css';

function SectionModal({ onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form>
                    <input type="text" placeholder="Section name" required />
                    <textarea placeholder="Section description" required></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default SectionModal;
