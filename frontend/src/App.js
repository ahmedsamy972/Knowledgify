import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Shared/Navbar/Navbar';
import Footer from './Shared/Footer/Footer';
import NotFound from './Notfound';
import Home from './HomeComponents/Home';
import User from './User/User';
import Auth from './Auth/Auth';
import Categories from './CourseComponents/Categories/Categories.';
import Courses from "./CourseComponents/Courses/Courses";
import Course from "./CourseComponents/Course/Course";
import NewCourse from './CourseComponents/NewCourse/NewCourse';
import Section from "./CourseComponents/NewCourse/CourseSections/Section/Section";

import { AuthContext } from './Shared/Context/auth-context';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            {/* <Route path="/users" element={<User />} /> */}
            <Route path="/users/:userId" element={<User />} />

            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Courses />} />

            <Route path="/categories/:categoryId/courses/:courseId" element={<Course />} />
            <Route path="/categories/:categoryId/courses/new" element={<NewCourse />} />

            <Route path="/categories/:categoryId/courses/:courseId/sections/:sectionId" element={<Section />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
            {/* <Router> */}
                <Navbar />
                <main>
                    {routes}
                </main>
                <Footer />
            {/* </Router> */}
        </AuthContext.Provider>
            
    );
}

export default App;
