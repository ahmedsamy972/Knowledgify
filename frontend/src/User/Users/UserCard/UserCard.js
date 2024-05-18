import React from 'react';
import './UserCard.css';

const UserCard = ({ fullName, bio, email }) => {
    return (
        <div className="user-card">
            <h2>{fullName}</h2>
            <p>{bio}</p>
            <p>Email: {email}</p>
        </div>
    );
}

export default UserCard;
