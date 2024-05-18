import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from "../CourseCard/CourseCard"

import './CourseCategory.css';  

function CourseCategory({ category, mode }) {
    const navigate = useNavigate();
    const navigateToCategory = () => {
        navigate(`/categories/${category.ID}`)
    }
    
    return (
        <div className="category-container">
            <h2>{category.name}</h2>
            {
                category.fields && category.fields.map((field, index) => {
                    return (<>
                        <p key={index}> {field.title} </p>
                        <p key={index}> {field.description} </p>
                    </>)
                })
            }
            <div className="courses-preview">
                {category.courses && category.courses.map(course => (
                    <CourseCard key={course.ID} course={course} categoryId={category.ID}/>
                ))}
            </div>
            {
                mode === "three" && (<button onClick={navigateToCategory} className="show-more-btn">Show More</button>)
            }
            
        </div>
    );
}

export default CourseCategory;
