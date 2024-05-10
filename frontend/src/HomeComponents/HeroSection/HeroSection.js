import React from 'react';
import './HeroSection.css'; // Your CSS for styling

function HeroSection() {
    return (
        <div className="hero-section">
            <h1>Welcome to Knowledgeify</h1>
            <p>Unlock your potential with our online courses</p>
            <button onClick={() => alert('Explore Courses')}>Explore Courses</button>
        </div>
    );
}

export default HeroSection;
