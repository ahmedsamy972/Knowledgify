import React from 'react';
import CourseCard from '../../CourseComponents/CourseCard/CourseCard';
import './FeaturedSection.css';

function FeaturedCourses() {
    const courses = [
        { id: 1, title: "Introduction to Programming", instructor: "Jane Doe", coverImg: `${process.env.PUBLIC_URL}/images/course1.jpeg` },
        { id: 2, title: "Advanced Business Management", instructor: "John Smith", coverImg: `${process.env.PUBLIC_URL}/images/course2.jpeg` }
    ];

    return (
        <div className="featured-courses">
            <h2>Featured Courses</h2>
            <div className="course-list">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default FeaturedCourses;
