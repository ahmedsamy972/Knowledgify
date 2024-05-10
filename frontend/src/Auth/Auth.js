import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Shared/Context/auth-context';

import './Auth.css'; 

function Auth() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [isSignupMode, setIsSignupMode] = useState(true);

    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            fullName,
            bio,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                auth.login();
                navigate("/");
            }

        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {isSignupMode && (
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                )}

                {isSignupMode && (
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            placeholder="Enter your Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                )}

                {/* {isSignupMode && (
                    <div className="form-group">
                        <label htmlFor="img">Image</label>
                        <input
                            type="text"
                            id="img"
                            placeholder="Enter your Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                )} */}


                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>


                <div className="button-group">
                    <button type="submit">{isSignupMode ? 'Sign Up' : 'Log In'}</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
