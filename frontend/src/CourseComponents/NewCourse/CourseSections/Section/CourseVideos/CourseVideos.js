import React from 'react';
import './CourseVideos.css';

function VideoCourseDisplay({ videos }) {
    return (
        <div className="video-course-display">
            {videos && videos.map((video, index) => (
                <div key={index} className="video-container">
                    <h3>{video.title}</h3>
                    <video controls>
                        <source src={video.URL} type="video/mp4" />
                    </video>
                </div>
            ))}
        </div>
    );
}

export default VideoCourseDisplay;
