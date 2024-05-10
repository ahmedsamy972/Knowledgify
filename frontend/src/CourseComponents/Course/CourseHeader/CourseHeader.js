import React from 'react';
import "./CourseHeader.css";

function CourseHeader({ title, description }) {
    return (
        <div className="course-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

export default CourseHeader;
