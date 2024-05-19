import React from 'react';
import './UserDetail.css'; 

function UserDetail({ user }) {
    return (
        <div className="user-profile">
            <img src={user.image} alt="User Avatar" className="avatar" />
            <div className="user-info">
                <h2>{user.fullName}</h2>
                <p>{user.bio}</p>
                <p>{user.email}</p>
            </div>
            {/* <div className="user-actions">
                <button onClick={() => alert('Change Password')}>Change Password</button>
                <button onClick={() => alert('Edit Profile')}>Edit Profile</button>
            </div> */}
        </div>
    );
}

export default UserDetail;
