import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have some CSS for styling

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav>
            <button className="nav-toggle" onClick={toggleNav}>
                Menu
            </button>
            <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/auth">Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
