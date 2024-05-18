import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FormCategoryDetail.css";
import { AuthContext } from '../../../Shared/Context/auth-context';

function FormCategoryDetail() {
    const auth = useContext(AuthContext);
    const uId = auth.userId;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [sections, setSections] = useState([]);
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const addSection = () => {
        setSections([...sections, { title: '', description: ''}]);
    };

    const handleSectionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...sections];
        updatedSections[index][name] = value;
        setSections(updatedSections);
    };

    const removeSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            fields: sections
        };
        const authorization = uId + " " + auth.token;
        try {
            const response = await fetch('http://localhost:5000/api/categories/new', {
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
            // const data = await response.json();
            navigate(0);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

  

    return (
        <form className="course-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Category Name" required value={name} onChange={handleNameChange}/>

            <button type="button" onClick={addSection}>Add Section</button>
            {sections.map((section, index) => (
                <Section
                    key={index}
                    index={index}
                    section={section}
                    onChange={handleSectionChange}
                    onRemove={removeSection}
                />
            ))}

            <button type="submit">Create</button>
        </form>
    );
}

function Section({ index, section, onChange, onRemove }) {
    return (
        <div className="section-container">
            <input
                type="text"
                name="title"
                value={section.title}
                placeholder="Enter section title"
                onChange={(e) => onChange(index, e)}
                required
            />
            <textarea
                name="description"
                value={section.description}
                placeholder="Enter section description"
                onChange={(e) => onChange(index, e)}
                required
            ></textarea>
            {/* <input
                type="text"
                name="imageUrl"
                value={section.imageUrl}
                placeholder="Enter image URL"
                onChange={(e) => onChange(index, e)}
                required
            /> */}
            <button type="button" onClick={() => onRemove(index)}>Remove Section</button>
        </div>
    );
}

export default FormCategoryDetail;
