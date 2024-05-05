import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Page Not Found</h1>
                    <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
                    <Link to="/" className="text-blue-500">Go to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
