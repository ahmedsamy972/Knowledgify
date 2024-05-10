import React from 'react';
import CourseCard from "../CourseCard/CourseCard"
import './CourseCategory.css';  

function CourseCategory({ category, mode }) {
    return (
        <div className="category-container">
            <h2>{category.name}</h2>
            <div className="courses-preview">
                {category.courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            {
                mode === "three" & (<button className="show-more-btn">Show More</button>)
            }
            
        </div>
    );
}

export default CourseCategory;
