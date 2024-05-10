import React from 'react';
import UserDetail from './UserDetail/UserDetail';
import EnrolledCourses from './EnrolledCourses/EnrolledCourses';
import PointsSummary from './Points/PointsSummary';
import EditField from './EditField/EditField';

import './User.css'; 

function User() {
    const user = {
        name: 'Ahmed Samy',
        role: 'Student',
        description: 'Information about the user',
        avatar: '/path-to-avatar.jpg'
    };

    const courses = [
        { id: 1, title: 'Course Title 1', progress: '50%' },
        { id: 2, title: 'Course Title 2', progress: '25%' }
    ];

    const points = {
        total: 100,
        available: 80
    };

    return (
        <div className="user-profile-page">
            <UserDetail user={user} />
            <EnrolledCourses courses={courses} />
            <PointsSummary points={points} />
            <EditField />
        </div>
    );
}

export default User;
