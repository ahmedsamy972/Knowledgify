import React, { useState } from 'react';

import "./EnrollmentForm.css";

function EnrollmentForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form submitted');
    };

    return (
        <form className="enrollment-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit">Enroll</button>
        </form>
    );
}

export default EnrollmentForm;
