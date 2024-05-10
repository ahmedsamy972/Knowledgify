import React, { useState } from 'react';
import "./FormCategoryDetail.css";

function FormCategoryDetail({ onSubmit }) {
    const [sections, setSections] = useState([]);

    const addSection = () => {
        setSections([...sections, { title: '', description: '', imageUrl: '' }]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ sections });
    };

    return (
        <form className="course-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Enter course title" required />
            <textarea name="description" placeholder="Enter course description" required></textarea>
            <input type="text" name="instructor" placeholder="Enter instructor name" required />

            {/* Add section button */}
            <button type="button" onClick={addSection}>Add Section</button>

            {/* Section inputs */}
            {sections.map((section, index) => (
                <Section
                    key={index}
                    index={index}
                    section={section}
                    onChange={handleSectionChange}
                    onRemove={removeSection}
                />
            ))}

            <button type="submit">Submit</button>
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
            <input
                type="text"
                name="imageUrl"
                value={section.imageUrl}
                placeholder="Enter image URL"
                onChange={(e) => onChange(index, e)}
                required
            />
            <button type="button" onClick={() => onRemove(index)}>Remove Section</button>
        </div>
    );
}

export default FormCategoryDetail;
