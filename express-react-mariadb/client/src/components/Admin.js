// Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';

        if (!isAdminLogin) {
            navigate('/login');
        } else {
            fetchStudents();
        }
    }, [navigate]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/studentnames');
            setStudents(response.data.students);
            setFilteredStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleSearch = () => {
        const filtered = students.filter(student => {
            return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.reg_no.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredStudents(filtered);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const removeStudent = async (regNo) => {
        try {
            await axios.delete(`http://localhost:5000/remove-student/${regNo}`);
            // After successful deletion, refetch students
            fetchStudents();
        } catch (error) {
            console.error('Error removing student:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isUserLogin');
        localStorage.removeItem('isStaffLogin');
        localStorage.removeItem('isAdminLogin');
        navigate('/login');
    };

    return (
        <div>
            <div className="bg-gray-800 p-4 flex items-center justify-between">
                <div>
                    <button onClick={handleLogout} className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded">Logout</button>
                </div>
                <div className="flex">
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
                <Link
                    to="/admin/add-student"
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Student
                </Link>
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
                                <div>
                                    <Link to={`/documents/${student.reg_no}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2">
                                        View Documents
                                    </Link>
                                    <button onClick={() => removeStudent(student.reg_no)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 block">
                                        Remove Student
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No students found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
