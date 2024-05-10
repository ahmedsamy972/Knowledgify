import React from 'react';
import CourseCard from '../../CourseComponents/CourseCard/CourseCard';
import './FeaturedSection.css';

function FeaturedCourses() {
    // Example data - you might fetch this from an API
    const courses = [
        { id: 1, title: "Introduction to Programming", instructor: "Jane Doe" },
        { id: 2, title: "Advanced Business Management", instructor: "John Smith" }
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
