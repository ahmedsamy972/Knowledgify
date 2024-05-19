import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import UserDetail from './UserDetail/UserDetail';
import EnrolledCourses from './EnrolledCourses/EnrolledCourses';
import PointsSummary from './Points/PointsSummary';
import EditField from './EditField/EditField';

import { AuthContext } from '../Shared/Context/auth-context';

import './User.css'; 

function User() {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const { userId } = useParams();

    const auth = useContext(AuthContext);
    const uId = auth.userId;
    const uToken = auth.token;

    useEffect(() => {
        fetchUser();
    }, [user]);

    const authorization = uId + " " + uToken;
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: "GET", 
                headers: {
                    authorization
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (data.message === "noUser"){
                navigate("/NotFound");
            }
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    return (
        <div className="user-profile-page">
            <UserDetail user={user} />
            <EnrolledCourses courses={user.enrolledCourses} />
            {/* <PointsSummary points={points} /> */}
            {/* <EditField /> */}
        </div>
    );
}

export default User;
