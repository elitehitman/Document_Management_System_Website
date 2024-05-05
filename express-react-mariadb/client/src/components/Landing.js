import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import the image as a variable
import backgroundImage from '../VJTI_Background.jpg'

const LandingPage = () => {
    useEffect(() => {
        // Forcefully remove login values from local storage when component mounts
        localStorage.removeItem('isUserLogin');
        localStorage.removeItem('isStaffLogin');
        localStorage.removeItem('isAdminLogin');

        // Set height of html and body to 100% and hide overflow to prevent scrolling
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';
    }, []);

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex justify-end p-4">
                <Link to="/login" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</Link>
                <Link to="/signup" className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Sign Up</Link>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Website</h1>
            </div>
        </div>
    );
};

export default LandingPage;
