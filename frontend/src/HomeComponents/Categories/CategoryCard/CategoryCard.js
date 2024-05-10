import React from 'react';
import './CategoryCard.css';

function CategoryCard({ category }) {
    return (
        <div className="category-card">
            <h3>{category.name}</h3>
            <p>{category.courses} Courses</p>
        </div>
    );
}

export default CategoryCard;
