import React from 'react';
import FormCourseDetail from "./FormCourseDetail/FormCourseDetail";
import CourseSections from './CourseSections/CourseSections';
import './NewCourse.css';  // Importing the main CSS file for App component styling.

function NewCourse() {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Course created!");
    };

    return (
        <div className="new-course">
            <h1>Create Course</h1>
            <FormCourseDetail onSubmit={handleSubmit} />
            <CourseSections />
        </div>
    );
}

export default NewCourse;
