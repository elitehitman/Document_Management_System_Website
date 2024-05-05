import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signupError, setSignupError] = useState('');

    // Forcefully remove login values from local storage when component mounts
    localStorage.removeItem('isUserLogin');
    localStorage.removeItem('isStaffLogin');
    localStorage.removeItem('isAdminLogin');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSignup();
        }
    };

    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            }

            const response = await axios.post('http://localhost:5000/signup', { username, password });
            console.log(response.data);

            if (response.data.message === 'Password updated successfully!') {
                window.location.href = '/login';
            } else {
                console.error('Error:', response.data.message);
                setSignupError(response.data.message); // Set signup error message
            }
        } catch (error) {
            console.error('Error:', error);
            setSignupError('User does not exist'); // Set signup error message for internal server errors
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError('');
                            setSignupError(''); // Clear signup error when typing in confirm password field
                        }}
                        onKeyDown={handleKeyPress}
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    {signupError && <p className="text-red-500">{signupError}</p>}

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded border border-black bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                        onClick={handleSignup}
                    >
                        Create Account
                    </button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link className="no-underline border-b border-blue text-blue" to="/login">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
    );
};

export default Signup;
