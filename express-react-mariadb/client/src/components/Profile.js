// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isUserLogin = localStorage.getItem('isUserLogin') === 'true';
        const isStaffLogin = localStorage.getItem('isStaffLogin') === 'true';
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';

        if (!isUserLogin) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get('http://localhost:5000/userdata', {
                params: {
                    username: username
                }
            });
            setUserData(response.data.userData);
        } catch (error) {
            console.error(error);
            // Handle error or navigate to login page
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            {/* Main content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Your Profile:</h2>
                {userData && (
                    <div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Registration Number:</strong> {userData.reg_no}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Aadhar Number:</strong> {userData.aadhar_no}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Name:</strong> {userData.name}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Email:</strong> {userData.email_id}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Mobile Number:</strong> {userData.mobile_no}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Course:</strong> {userData.course}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Branch:</strong> {userData.branch}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Study Year:</strong> {userData.study_year}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Gender:</strong> {userData.gender}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Category:</strong> {userData.category}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Caste:</strong> {userData.caste}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                                    <p className="detail"><strong>Birth Date:</strong> {userData.birth_date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4">
                            <p className="detail"><strong>Age:</strong> {userData.age}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
