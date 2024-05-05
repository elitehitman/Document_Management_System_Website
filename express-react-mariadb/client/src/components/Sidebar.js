import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('username');
        localStorage.removeItem('password'); // Assuming you store password for some reason
        localStorage.removeItem('isUserLogin');
        localStorage.removeItem('isStaffLogin');
        localStorage.removeItem('isAdminLogin');
        navigate('/login');
    };


    return (
        <div className="bg-gray-800 text-white w-48 p-4 flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold">Menu</h1>
                <ul className="mt-4">
                    <li className="py-2"><button onClick={() => handleNavigate('/home')} className="hover:underline">Home</button></li>
                    <li className="py-2"><button onClick={() => handleNavigate('/profile')} className="hover:underline">Profile</button></li>
                    <li className="py-2"><button onClick={() => handleNavigate('/documents')} className="hover:underline">Documents</button></li>
                </ul>
            </div>
            <button onClick={handleLogout} className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded">Logout</button>
        </div>
    );
};

export default Sidebar;
