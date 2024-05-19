import React from 'react';
import { Link } from 'react-router-dom';

import './CourseCard.css';

function CourseCard({ course, categoryId }) {
    return (
        <div className="course-card">
            <Link to={`/categories/${categoryId}/courses/${course.ID}`} className="link-no-underline">
                <img src={course.coverImg} alt="Course Thumbnail" />
            </Link>
            <Link to={`/categories/${categoryId}/courses/${course.ID}`} className="link-no-underline">
                <h3>{course.title}</h3>
            </Link>
            <p>{course.code}</p>
            <p>{course.instructor}</p>
        </div>
    );
}

export default CourseCard;

