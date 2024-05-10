import React from 'react';
import './VideoUploadForm.css';

function VideoUploadForm({ onSubmit }) {
    return (
        <form className="video-upload-form" onSubmit={onSubmit}>
            <input type="file" accept="video/*" required />
            <button type="submit">Upload Video</button>
        </form>
    );
}

export default VideoUploadForm;
