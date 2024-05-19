import React, { useState, useEffect, useContext } from 'react';
import CourseCategory from "../CourseCategory/CourseCategory";
import FormCategoryDetail from "./FormCategoryDetail/FormCategoryDetail";
import { AuthContext } from '../../Shared/Context/auth-context';

import "./Categories.css"

function Categories() {
    const auth = useContext(AuthContext);
    const uId = auth.userId;

    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []); 

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.categories); 
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    

    return (
        <>
            <div className="category-page">
                {categories && categories.map(category => (
                    <CourseCategory key={category.name} category={category} mode="three" />
                ))}
            </div>

            {
                (uId && uId.substring(0, 2) !== "SD" && !showForm) && (<button className='createCat' onClick={() => { setShowForm(true) }}>Create Category</button>)
            }
           
            {
                showForm && (<FormCategoryDetail />)
            }
          
        </>
        
    );
}

export default Categories;
