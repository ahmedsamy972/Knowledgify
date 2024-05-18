import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Shared/Context/auth-context';

import { storage } from '../utlis/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import './Auth.css'; 

function Auth() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [isSignupMode, setIsSignupMode] = useState(false);

    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState();


    const uploadImageAndGetURL = async (image) => {
        const imageRef = ref(storage, `profile_images/${image.name}-${v4()}`);
        let publicUrl = "";

        try {
            const snapshot = await uploadBytes(imageRef, image);
            publicUrl = await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error(error);
        }

        return publicUrl;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        

        let formData;
        if (isSignupMode){
            const profileImgUrl = await uploadImageAndGetURL(profileImg);
            formData = {
                fullName,
                bio,
                email,
                password, 
                image: profileImgUrl
            };
        }
        else{
            formData = {
                email,
                password
            };
        }
        

        try {
            let response;
            if (isSignupMode){
                response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            }
            else{
                response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            const responseData = await response.json();
            if (response.ok) {
                auth.login(responseData.userId, responseData.token);
                navigate("/");
            }

        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    const handleBtnSwitch = () => {
        setIsSignupMode(!isSignupMode);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className='form-container'>
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

                {isSignupMode && (
                    <div className="form-group">
                        <label htmlFor="img">Profile Image</label>
                        <input name="file" type="file" accept="image/*" onChange={(e) => { setProfileImg(e.target.files[0]) }} id="img" required />

                    </div>
                )}


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

                <div>
                    <button onClick={handleBtnSwitch}>{isSignupMode ? 'Already Have Account Log In intead' : 'Have No Account Sign Up instead'}</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
