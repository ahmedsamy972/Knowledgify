import React, { useState } from 'react';
import './EditField.css';

function EditField() {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password changed successfully!");
    };

    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Current Password</label>
                <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
            </div>
            <div className="form-group">
                <label>New Password</label>
                <input type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
            </div>
            <div className="button-group">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => alert('Cancelled')}>Cancel</button>
            </div>
        </form>
    );
}

export default EditField;
