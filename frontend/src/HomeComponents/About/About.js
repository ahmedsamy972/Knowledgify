import React from 'react';
import './About.css';

function AboutUs() {
    return (
        <div className="about-us">
            <h2>About Us</h2>
            <p>Learn more about Knowledgeify and our mission to make education accessible to all.</p>
            <button onClick={() => alert('Learn More')}>Learn More</button>
        </div>
    );
}

export default AboutUs;
