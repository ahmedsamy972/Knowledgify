import React from 'react';

import HeroSection from './HeroSection/HeroSection';
import FeaturedCourses from './FeaturedSection/FeaturedSection';
import About from './About/About';
import Categories from './Categories/Categories';

function Home() {
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
