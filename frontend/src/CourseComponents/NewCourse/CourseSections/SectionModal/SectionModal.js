import React, { useState, useContext } from 'react';

import { AuthContext } from '../../../../Shared/Context/auth-context';
import './SectionModal.css';

function SectionModal({ onClose, setSections, courseId }) {
    const auth = useContext(AuthContext);
    const uId = auth.userId;

    const [num, setnum] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handelSecCreation = async (e) => {
        e.preventDefault();

        const formData = {
            num,
            title,
            description
        };
        const authorization = uId + " " + auth.token;
        const endPoint = `http://localhost:5000/api/courses/${courseId}/sections/new`
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setSections(prevSections => [...prevSections, data.section]);
            onClose();
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handelSecCreation}>
                    <input type="text" placeholder="Section Num" required value={num}
                        onChange={(e) => { setnum(e.target.value) }}
                    />
                    <input type="text" placeholder="Section title" required value={title}
                        onChange={(e) => { setTitle(e.target.value) }} />

                    <textarea placeholder="Section description" required value={description}
                        onChange={(e) => { setDescription(e.target.value) }}></textarea>

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default SectionModal;
