import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    // Forcefully remove login values from local storage when component mounts
    localStorage.removeItem('isUserLogin');
    localStorage.removeItem('isStaffLogin');
    localStorage.removeItem('isAdminLogin');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);

            if (response.data.message === 'Login successful!') {
                localStorage.setItem('userType', response.data.userType);
                if (response.data.userType === 'user') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isUserLogin', true);
                    console.log('User logged in');
                    navigate('/home');
                } else if (response.data.userType === 'staff') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isStaffLogin', true);
                    console.log('Staff logged in');
                    navigate('/staff');
                } else if (response.data.userType === 'admin') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isAdminLogin', true);
                    console.log('Admin logged in');
                    navigate('/admin');
                }
            } else {
                setLoginError(response.data.message); // Set login error message
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('Invalid username or password.');
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                    <button
                        className="w-full text-center py-3 rounded border border-black bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        New user?
                        <Link className="no-underline border-b border-blue text-blue" to="/signup">
                            Sign up here
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
