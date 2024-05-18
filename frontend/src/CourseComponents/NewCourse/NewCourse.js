import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import FormCourseDetail from "./FormCourseDetail/FormCourseDetail";
import CourseSections from './CourseSections/CourseSections';
import './NewCourse.css';  

function NewCourse() {
    const [courseCreated, setCourseCreated] = useState(false);
    const [course, setCourse] = useState({});

    return (
        <div className="new-course">
            <h1>Create Course</h1>
            {
                courseCreated && (<CourseCard course={course}/>)
            }
            
            {
                !courseCreated && (<FormCourseDetail setCourse={setCourse} setCourseCreated={setCourseCreated} />)
            }

            {
                courseCreated && (<CourseSections courseId={course.ID} />)
            }
            
        </div>
    );
}

export default NewCourse;
