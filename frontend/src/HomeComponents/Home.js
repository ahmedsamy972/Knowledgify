import React from 'react';

import HeroSection from './HeroSection/HeroSection';
import FeaturedCourses from './FeaturedSection/FeaturedSection';
import About from './About/About';
import Categories from './Categories/Categories';

function Home() {
    // useEffect(() => {
    //     fetchCourses();
    // }, [categoryId]);

    // const fetchCourses = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch categories');
    //         }
    //         const data = await response.json();
    //         if (data.message) {
    //             navigate("/NotFound");
    //         }
    //         else {
    //             setCategory(data.category);
    //         }

    //     } catch (error) {
    //         console.error('Error fetching categories:', error.message);
    //     }
    // };

    return (
        <div>
            <HeroSection />
            <FeaturedCourses />
            <About />
            <Categories />
        </div>
    );
}

export default Home;
