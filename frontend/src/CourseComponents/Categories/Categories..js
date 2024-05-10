import React from 'react';
import CourseCategory from "../CourseCategory/CourseCategory";
import FormCategoryDetail from "./FormCategoryDetail/FormCategoryDetail";
import "./Categories.css"

function Categories() {
    // Dummy data for categories and courses
    const categories = [
        {
            name: 'Development',
            courses: [
                { id: 1, title: 'Web Development', description: 'HTML, CSS, JavaScript' },
                { id: 2, title: 'Mobile App Development', description: 'React Native' },
                { id: 3, title: 'Database Management', description: 'SQL' }
            ]
        },
        {
            name: 'Design',
            courses: [
                { id: 4, title: 'Graphic Design', description: 'Adobe Creative Suite' },
                { id: 5, title: 'UI/UX Design', description: 'Prototyping Tools' },
                { id: 6, title: 'Typography', description: 'Typeface design' }
            ]
        }
    ];

    return (
        <>
            <div className="category-page">
                {categories.map(category => (
                    <CourseCategory key={category.name} category={category} mode="three" />
                ))}
            </div>
            
            <FormCategoryDetail />
        </>
        
    );
}

export default Categories;
