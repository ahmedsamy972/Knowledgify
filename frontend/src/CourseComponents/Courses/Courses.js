import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import CourseCategory from "../CourseCategory/CourseCategory";
import { AuthContext } from '../../Shared/Context/auth-context';
import "./Courses.css";

function Courses() {
    const auth = useContext(AuthContext);
    const uId = auth.userId;

    const navigate = useNavigate();

    const { categoryId } = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        fetchCourses();
    }, [categoryId]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (data.message) {
                navigate("/NotFound");
            }
            else{
                setCategory(data.category);
            }

        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    if (!category) {
        return <div>Loading...</div>; 
    }

    const navigateToCreateCourse = () => {
        navigate(`/categories/${categoryId}/courses/new`)
    }


    return (
        <>
            <CourseCategory category={category} />
            {
                (uId && uId.substring(0, 2) !== "SD") && (<button onClick={navigateToCreateCourse}>Add Course</button>)
            }
            
        </>
    );
}

export default Courses;
