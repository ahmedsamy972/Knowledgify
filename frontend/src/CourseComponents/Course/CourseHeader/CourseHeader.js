import React from 'react';
import "./CourseHeader.css";

function CourseHeader({ code, title, description }) {
    return (
        <div className="course-header">
            <h1>{code}</h1>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default CourseHeader;
