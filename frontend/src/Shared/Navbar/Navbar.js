import React, { useState, useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have some CSS for styling
import { AuthContext } from '../Context/auth-context';

function Navbar() {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const isLoggedIn = auth.isLoggedIn;
    
    const userId = auth.userId;
    let firstTwoCharacters = userId ? userId.substring(0, 2) : "";

    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };

    return (
        <nav>
            <button className="nav-toggle" onClick={toggleNav}>
                Menu
            </button>
            <Link to="/" className='link-no-underline'>
                <h1>KNOWLEDGIFY</h1>
            </Link>
            
            <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/categories">Courses</Link></li>

                {
                    firstTwoCharacters === "AD" && (<li><Link to="/users">Users</Link></li>)
                }

                {
                    isLoggedIn && (<li><Link to={"/users/" + userId}>Profile</Link></li>)
                }

                {
                    !isLoggedIn && (<li><Link to="/auth">Login</Link></li>)
                }
                
                {
                    isLoggedIn && (<button className='logout' onClick={handleLogout}>Logout</button>)
                } 
            </ul>
        </nav>
    );
}

export default Navbar;
