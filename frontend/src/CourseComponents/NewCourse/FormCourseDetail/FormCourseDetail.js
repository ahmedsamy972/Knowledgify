import React from 'react';
import './FormCourseDetail.css';

function FormCourseDetail({ onSubmit }) {
    return (
        <form className="course-form" onSubmit={onSubmit}>
            <input type="text" name="title" placeholder="Enter course title" required />
            <textarea name="description" placeholder="Enter course description" required></textarea>
            <input type="text" name="instructor" placeholder="Enter instructor name" required />
            <button type="submit">Submit</button>
        </form>
    );
}

export default FormCourseDetail;
