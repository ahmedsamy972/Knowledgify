import React, { useContext, useEffect, useState } from 'react';
import UserCard from './UserCard/UserCard';
import { AuthContext } from '../../Shared/Context/auth-context';
import "./Users.css";

const Users = ({mode, courseId}) => {
    const auth = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [users]);

    let endPoint;
    if (mode === "all"){
        endPoint = `http://localhost:5000/api/users/`
    }
    else{
        endPoint = `http://localhost:5000/api/users/course/${courseId}`
    }
    const authorization = auth.userId + " " + auth.token;

    const fetchUsers = async () => {
        try {
            const response = await fetch(endPoint, {
                method: 'GET',
                headers: {
                    authorization
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            // console.log(data.user);
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };


    return (
        <div>

            {
                mode === "all" ? (<h1>All Users</h1>) : (<h1>Course</h1>)
            }
            <div className="user-list">
                {users.map((user, index) => (
                    <UserCard
                        key={index}
                        fullName={user.fullName}
                        bio={user.bio}
                        email={user.email}
                    />
                ))}
            </div>
        </div>
    );
}

export default Users;
