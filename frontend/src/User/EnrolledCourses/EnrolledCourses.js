import React from 'react';
import CourseCard from '../../CourseComponents/CourseCard/CourseCard'; 
import './EnrolledCourses.css';

function EnrolledCourses({ courses }) {
    return (
        <div className="enrolled-courses">
            <h2>Enrolled Courses</h2>
            {courses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
    );
}

export default EnrolledCourses;
