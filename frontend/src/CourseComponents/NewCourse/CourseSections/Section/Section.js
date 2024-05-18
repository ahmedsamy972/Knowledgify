import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import SectionInfo from './SectionInfo/SectionInfo';
import VideoUploadForm from './VideoUploadForm/VideoUploadForm';
import VideoCourseDisplay from './CourseVideos/CourseVideos';
import { AuthContext } from '../../../../Shared/Context/auth-context';

import { storage } from '../../../../utlis/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import './Section.css';

function Section() {
    const auth = useContext(AuthContext);
    const uID = auth.userId;

    const { courseId, sectionId } = useParams();

    const [section, setSection] = useState();

    const [vids, setVids] = useState([]);
    const [courseVids, setCourseVids] = useState([]);
    const [isVideoUpload, setIsVideoUpload] = useState(false);

    useEffect(() => {
        fetchSection();
    }, [sectionId]);

    const endPointFetch = `http://localhost:5000/api/courses/${courseId}/sections/${sectionId}`;
    const fetchSection = async () => {
        try {
            const response = await fetch(endPointFetch);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setSection(data.section);

        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };
    if (!section){
        return(
            <div>....Loading</div>
        )
    }

    const uploadVideosAndGetURLs = async (files) => {
        const uploadPromises = files.map(async (file) => {
            const fileRef = ref(storage, `courses_videos/${file.name}-${v4()}`);
            try {
                const snapshot = await uploadBytes(fileRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
            } catch (error) {
                console.error("Error uploading video:", error);
                throw new Error(error);
            }
        });

        try {
            const urls = await Promise.all(uploadPromises);
            return urls;
        } catch (error) {
            console.error("Error uploading one or more videos:", error);
            throw error;
        }
    };

    const handleVideoUpload = async (event) => {
        event.preventDefault();
        
        const coursesVidsUrl = await uploadVideosAndGetURLs(courseVids);

        const videos = vids.map((title, index) => {
            return { title: title, URL: coursesVidsUrl[index] };
        });

        
        const authorization = uID + " " + auth.token;
        const endPoint = `http://localhost:5000/api/courses/${courseId}/sections/${section.ID}/upload`
        try {
            const response = await fetch(endPoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization
                },
                body: JSON.stringify({ videos })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setSection(data.section);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    return (
        <div className="section-page">
            <div>
                <h1>{section.course.title}</h1>
                <h2>{section.course.code}</h2>
                <p>{section.course.description}</p>
            </div>
            

            <SectionInfo section={section} />

            <VideoCourseDisplay videos={section.videos} />

            {
                (uID.substring(0, 2) !== "SD") && (<button onClick={ () => {setIsVideoUpload(true)}}>upload</button>)
            }
            
            {
                isVideoUpload && (<VideoUploadForm onSubmit={handleVideoUpload} handleFileChange={(e) => { setCourseVids([...e.target.files]); }} vids={vids} setVids={setVids} />)
            }
            
        </div>
    );
}

export default Section;
