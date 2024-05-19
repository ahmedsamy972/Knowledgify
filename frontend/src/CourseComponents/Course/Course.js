import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';

import CourseHeader from './CourseHeader/CourseHeader';
import CourseCurriculum from './CourseCurriculum/CourseCurriculum';
// import ModuleDescription from './ModuleDescription/ModuleDescription';
// import StudentReviews from './StudentReviews/StudentReviews';
// import EnrollmentForm from './EnrollmentForm/EnrollmentForm';
import { AuthContext } from '../../Shared/Context/auth-context';
import "./Course.css"

function CoursePage() {
    const auth = useContext(AuthContext);
    const uID = auth.userId;

    const { categoryId, courseId } = useParams();
    const endPointFetch = `http://localhost:5000/api/categories/${categoryId}/courses/${courseId}?uID=${uID}`
    const endPointEnroll = `http://localhost:5000/api/categories/${categoryId}/courses/${courseId}/enroll`

    const [course, setCourse] = useState({});
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(endPointFetch);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            // console.log()
            setCourse(data.course);
            setEnrolled(data.enrolled);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };


    const enroll = async () => {
        try {
            const response = await fetch(endPointEnroll, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uID })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (data.message === "success"){
                setEnrolled(true);
            }
        } catch (error) {
            console.log(error);
            console.error('Error fetching categories:', error.message);
        }
    };

    return (
        <div className="course-page">
            <CourseHeader code={course.code } title={course.title} description={course.description} />
            <CourseCurriculum modules={course.sections} courseId={course.ID} />
            {
                (uID && !enrolled) && (<button className='enroll' onClick={enroll}>Enroll</button>)
            }
        </div>
    );
}

export default CoursePage;
