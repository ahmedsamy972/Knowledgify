import React from 'react';
import './UserDetail.css'; 

function UserDetail({ user }) {
    return (
        <div className="user-profile">
            <img src={user.avatar || "/default-avatar.png"} alt="User Avatar" className="avatar" />
            <div className="user-info">
                <h2>{user.name}</h2>
                <p>{user.role}</p>
                <p>{user.description}</p>
            </div>
            <div className="user-actions">
                <button onClick={() => alert('Change Password')}>Change Password</button>
                <button onClick={() => alert('Edit Profile')}>Edit Profile</button>
            </div>
        </div>
    );
}

export default UserDetail;
