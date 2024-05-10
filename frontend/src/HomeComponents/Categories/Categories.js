import React from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import './Categories.css';

function Categories() {
    const categories = [
        { id: 1, name: "Programming", courses: 50 },
        { id: 2, name: "Business", courses: 30 }
    ];

    return (
        <div className="categories">
            <h2>Course Categories</h2>
            <div className="category-list">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}

export default Categories;
