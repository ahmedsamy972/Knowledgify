import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Your CSS for styling

function HeroSection() {
    const navigate = useNavigate();
    const navigateToCategories = () => {
        navigate("/categories");
    }

    return (
        <div className="hero-section">
            <h1>Welcome to Knowledgeify</h1>
            <p>Unlock your potential with our online courses</p>
            <button onClick={navigateToCategories}>Explore Courses</button>
        </div>
    );
}

export default HeroSection;
