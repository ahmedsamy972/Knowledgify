import React, {useState, useCallback, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Shared/Navbar/Navbar';
import Footer from './Shared/Footer/Footer';
import NotFound from './Notfound';
import Home from './HomeComponents/Home';
import User from './User/User';
import Users from './User/Users/Users';
import Auth from './Auth/Auth';
import Categories from './CourseComponents/Categories/Categories.';
import Courses from "./CourseComponents/Courses/Courses";
import Course from "./CourseComponents/Course/Course";
import NewCourse from './CourseComponents/NewCourse/NewCourse';
import Section from "./CourseComponents/NewCourse/CourseSections/Section/Section";

import { AuthContext } from './Shared/Context/auth-context';

let logoutTimer;

function App() {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('userData');
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData && storedUserData.token && storedUserData.userId && new Date(storedUserData.expiration) > new Date()) {
            login(storedUserData.userId, storedUserData.token, new Date(storedUserData.expiration));
        }
        setLoading(false);
    }, [login]);

    if (loading) {
        return <div>Loading...</div>;
    }

    let routes = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/auth' element={<Auth />} />

            {
                (userId && userId.substring(0, 2) === "AD") && (<Route path="/users" element={<Users mode="all" />}/>)
            }

            {
                (userId && userId.substring(0, 2) !== "SD") && (<Route path="/users/course/:courseId" element={<Users />} />)
            }

            {
                userId && (<Route path="/users/:userId" element={<User />} />)
            }

            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Courses />} />
            <Route path="/categories/:categoryId/courses/:courseId" element={<Course />} />

            <Route path="/courses/:courseId/sections/:sectionId" element={<Section />} />
            
            {
                (userId && userId.substring(0, 2) !== "SD") && (<Route path="/categories/:categoryId/courses/new" element={<NewCourse />} />)
            }

            <Route path="*" element={<NotFound />} />
        </Routes>
    );


    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <Navbar />
            <main>
                {routes}
            </main>
            <Footer />
        </AuthContext.Provider>
            
    );
}

export default App;
