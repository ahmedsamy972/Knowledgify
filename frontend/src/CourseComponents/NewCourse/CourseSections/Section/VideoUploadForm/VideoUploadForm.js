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
            
            {vids.map((vid, index) => (
                <VideoTitle
                    key={index}
                    index={index}
                    vid={vid}
                    onChange={handleSectionChange}
                    onRemove={removeVideo}
                />
            ))}

            <button className='addVid' type="button" onClick={addVideo}>+</button>

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
            
            <button type="submit">Upload</button>
        </form>
    );
}

function VideoTitle({ index, vid, onChange, onRemove }) {
    return (
        <div className="field-container">
            <input
                type="text"
                name="vid"
                value={vid}
                placeholder="Enter Video title"
                onChange={(e) => onChange(index, e)}
                required
            />
            
            <button type="button" onClick={() => onRemove(index)}>-</button>
        </div>
    );
}

export default VideoUploadForm;
