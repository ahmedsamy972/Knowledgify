import React from 'react';
import CourseHeader from './CourseHeader/CourseHeader';
import CourseCurriculum from './CourseCurriculum/CourseCurriculum';
import ModuleDescription from './ModuleDescription/ModuleDescription';
import StudentReviews from './StudentReviews/StudentReviews';
import EnrollmentForm from './EnrollmentForm/EnrollmentForm';

function CoursePage() {
    // Dummy data defined directly in the component for demonstration
    const courseData = {
        title: "Learn Python Programming",
        description: "Master Python from scratch with our comprehensive course.",
        curriculum: [
            { id: 1, name: 'Introduction to Python', modulesCount: 6 },
            { id: 2, name: 'Python Projects', modulesCount: 5 }
        ],
        modules: [
            { id: 1, title: 'Getting Started', description: 'Setting up Python environment, Hello World program.' }
        ],
        reviews: [
            { id: 1, author: 'John Doe', content: 'Great course, easy to follow and very informative.' },
            { id: 2, author: 'Jane Smith', content: 'I enjoyed the hands-on projects, they helped solidify my understanding.' }
        ]
    };

    return (
        <div className="course-page">
            <CourseHeader title={courseData.title} description={courseData.description} />
            <CourseCurriculum modules={courseData.curriculum} />
            <ModuleDescription module={courseData.modules[0]} />
            <StudentReviews reviews={courseData.reviews} />
            <EnrollmentForm />
        </div>
    );
}

export default CoursePage;
