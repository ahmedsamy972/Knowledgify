import React from 'react';
import './VideoUploadForm.css';

function VideoUploadForm({ onSubmit, handleFileChange, vids, setVids }) {
    // const [vids, setVids] = useState([]);

    const addVideo = () => {
        setVids([...vids, ""]);
    };
    const removeVideo = (index) => {
        const updatedVids = [...vids];
        updatedVids.splice(index, 1);
        setVids(updatedVids);
    };
    const handleSectionChange = (index, e) => {
        const value = e.target.value;
        const updatedVids = [...vids];
        updatedVids[index] = value;
        setVids(updatedVids);
    };



    return (
        <form className="video-upload-form" onSubmit={onSubmit}>
            <button type="button" onClick={addVideo}>Add Video</button>
            {vids.map((vid, index) => (
                <VideoTitle
                    key={index}
                    index={index}
                    vid={vid}
                    onChange={handleSectionChange}
                    onRemove={removeVideo}
                />
            ))}

            {
                (vids.length > 0) && (
                    <>
                        <label htmlFor='video'>Upload Videos</label>
                        <input
                            name="file"
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={handleFileChange}
                            id="video"
                            required
                        />
                    </>
                )
            }
            
            <button type="submit">Upload Video</button>
        </form>
    );
}

function VideoTitle({ index, vid, onChange, onRemove }) {
    return (
        <div className="section-container">
            <input
                type="text"
                name="vid"
                value={vid}
                placeholder="Enter Video title"
                onChange={(e) => onChange(index, e)}
                required
            />
            
            <button type="button" onClick={() => onRemove(index)}>Remove Video Title</button>
        </div>
    );
}

export default VideoUploadForm;
