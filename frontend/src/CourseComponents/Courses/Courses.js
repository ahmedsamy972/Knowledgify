import React from 'react';
import CourseCategory from "../CourseCategory/CourseCategory";

import "./Courses.css";

function Courses() {
    const category = {
            name: 'Development',
            courses: [
                { id: 1, title: 'Web Development', description: 'HTML, CSS, JavaScript' },
                { id: 2, title: 'Mobile App Development', description: 'React Native' },
                { id: 3, title: 'Database Management', description: 'SQL' }
            ]
        };
        

    return (
        <CourseCategory category={category} />
    );
}

export default Courses;
