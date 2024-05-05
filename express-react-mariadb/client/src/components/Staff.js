import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';

const Staff = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isUserLogin = localStorage.getItem('isUserLogin') === 'true';
        const isStaffLogin = localStorage.getItem('isStaffLogin') === 'true';
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';

        console.log("isUserLogin:", isUserLogin);
        console.log("isStaffLogin:", isStaffLogin);
        console.log("isAdminLogin:", isAdminLogin);

        if (!isStaffLogin) {
            console.log("Redirecting to login page...");
            navigate('/login');
        } else {
            console.log("Fetching students...");
            fetchStudents();
        }
    }, []);


    const fetchStudents = async () => {
        try {
            console.log("Fetching students data...");
            const response = await axios.get('http://localhost:5000/studentnames');
            console.log("Students data:", response.data.students);
            setStudents(response.data.students);
            setFilteredStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };


    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        const filtered = students.filter(student => {
            return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.reg_no.toLowerCase().includes(searchTerm.toLowerCase());
        });
        console.log("Filtered students:", filtered);
        setFilteredStudents(filtered);
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex h-screen">
            <StaffSidebar />
            <div className="flex flex-col flex-grow ml-48">
                <div className="bg-gray-800 p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 text-gray-200 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex-1 p-8 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">List of Students:</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                                <div key={index} className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-semibold">{student.name}</p>
                                        <p>Study Year: {student.study_year}</p>
                                        <p>Course: {student.course}</p>
                                        <p>Branch: {student.branch}</p>
                                        <p>Registration Number: {student.reg_no}</p>
                                    </div>
                                    <Link to={`/documents/${student.reg_no}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        View Documents
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No students found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;
