import React from 'react';
import './CourseCard.css';

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <img src="/path-to-image.jpg" alt="Course Thumbnail" />
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>
            <button onClick={() => alert('Enroll Now')}>Enroll Now</button>
        </div>
    );
}

export default CourseCard;
