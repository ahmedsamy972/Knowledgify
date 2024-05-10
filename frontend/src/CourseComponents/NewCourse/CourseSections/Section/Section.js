import React from 'react';
import SectionInfo from './SectionInfo/SectionInfo';
import VideoUploadForm from './VideoUploadForm/VideoUploadForm';
import './Section.css';

function Section() {
    const section = {
        name: "Introduction to React",
        description: "Learn the basics of React, including components and state management."
    };

    const handleVideoUpload = (event) => {
        event.preventDefault();
        // Handle video upload logic
        console.log("Video uploaded!");
    };

    return (
        <div className="section-page">
            <SectionInfo section={section} />
            <VideoUploadForm onSubmit={handleVideoUpload} />
        </div>
    );
}

export default Section;
