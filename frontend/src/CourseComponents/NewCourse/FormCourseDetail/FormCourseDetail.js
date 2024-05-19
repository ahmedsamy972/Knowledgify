import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../../Shared/Context/auth-context';

import { storage } from '../../../utlis/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import './FormCourseDetail.css';

function FormCourseDetail({ setCourse, setCourseCreated }) {
    const auth = useContext(AuthContext);
    const uId = auth.userId;

    const { categoryId } = useParams();

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImg, setCoverImg] = useState();


    const uploadImageAndGetURL = async (image) => {
        const imageRef = ref(storage, `cover_images/${image.name}-${v4()}`);
        let publicUrl = "";

        try {
            const snapshot = await uploadBytes(imageRef, image);
            publicUrl = await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error(error);
        }

        return publicUrl;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const coverImgUrl = await uploadImageAndGetURL(coverImg);
        // console.log(coverImgUrl);

        const formData = {
            code,
            title,
            description,
            instructor: uId, 
            category: categoryId, 
            coverImg: coverImgUrl
        };
        const authorization = uId + " " + auth.token;
        const endPoint = `http://localhost:5000/api/categories/${categoryId}/courses/new`
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCourse(data.course);
            setCourseCreated(true);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };


    return (
        <form className="course-form" onSubmit={handleSubmit}>
            <input type="text" name="code" placeholder="Enter course code" required value={code}
                onChange={(e) => { setCode(e.target.value) }} className='code'/>

            <input type="text" name="title" placeholder="Enter course title" required value={title} 
                onChange={(e) => { setTitle(e.target.value) }} className='title'/>

            <textarea name="description" placeholder="Enter course description" required value={description}
                onChange={(e) => { setDescription(e.target.value) }} className='description' />


            <label htmlFor='fileInput'>Cover Image</label>
            <input name="file" type="file" accept="image/*" onChange={(e) => { setCoverImg(e.target.files[0]) }} id="fileInput" required className='file' />

            

            <button className='create' type="submit">Create</button>
        </form>
    );
}

export default FormCourseDetail;
