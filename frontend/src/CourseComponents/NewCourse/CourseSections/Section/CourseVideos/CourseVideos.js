import React, { useState } from 'react';
import './CourseVideos.css';

function VideoCourseDisplay({ videos }) {
    const [isShowVid, setIsShowVid] = useState(-1);

    return (
        <div className="video-course-display">
            {videos && videos.map((video, index) => (
                <>
                    <h2 onClick={() => { setIsShowVid(index) }}>{video.title}</h2>
                    {
                        (isShowVid === index) && (
                            <div key={index} className="video-container">
                                <h3>{video.title}</h3>
                                <br></br>
                                <video controls>
                                    <source src={video.URL} type="video/mp4" />
                                </video>
                            </div>
                        )
                    }
                </>
                
            ))}
        </div>
    );
}

export default VideoCourseDisplay;
