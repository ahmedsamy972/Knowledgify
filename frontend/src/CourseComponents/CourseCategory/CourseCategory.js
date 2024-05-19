import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from "../CourseCard/CourseCard"

import './CourseCategory.css';  

function CourseCategory({ category, mode }) {
    const navigate = useNavigate();
    const navigateToCategory = () => {
        navigate(`/categories/${category.ID}`)
    }
    
    return (
        <div className="category-container">
            <Link className='link-no-underline' to={`/categories/${category.ID}`}>
                <h2>{category.name}</h2>
            </Link>
            
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
                mode === "three" && (
                    <div className="button-container">
                        <button onClick={navigateToCategory} className="show-more-btn">Show More{" >>>"}</button>
                    </div>)
            }
            
        </div>
    );
}

export default CourseCategory;
