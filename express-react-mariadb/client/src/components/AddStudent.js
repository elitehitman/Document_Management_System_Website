import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [regNo, setRegNo] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [course, setCourse] = useState('');
    const [branch, setBranch] = useState('');
    const [studyYear, setStudyYear] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [caste, setCaste] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';

        if (!isAdminLogin) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add validation checks
            if (
                regNo.length !== 9 ||
                isNaN(regNo) ||
                aadharNo.length !== 12 ||
                isNaN(aadharNo) ||
                !email.endsWith('.vjti.ac.in') ||
                mobileNo.length !== 10 ||
                isNaN(mobileNo)
            ) {
                alert('Please enter valid data.');
                return;
            }

            const response = await axios.post('http://localhost:5000/add-student', {
                regNo,
                aadharNo,
                name,
                email,
                mobileNo,
                course,
                branch,
                studyYear,
                gender,
                category,
                caste,
                birthDate,

            });
            console.log(response.data);
            // Redirect to admin page or any other page after successful addition
            navigate('/admin');
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };
   

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Add Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="regNo" className="block mb-1">
                        Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="regNo"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="aadharNo" className="block mb-1">Aadhar Number</label>
                    <input
                        type="text"
                        id="aadharNo"
                        value={aadharNo}
                        onChange={(e) => setAadharNo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block mb-1">Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="mobileNo" className="block mb-1">Mobile Number</label>
                    <input
                        type="text"
                        id="mobileNo"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="course" className="block mb-1">Course <span className="text-red-500">*</span></label>
                    <select
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="Diploma">Diploma</option>
                        <option value="BTech">BTech</option>
                        <option value="MTech">MTech</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="branch" className="block mb-1">Branch <span className="text-red-500">*</span></label>
                    <select
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Branch</option>
                        <option value="CS">CS</option>
                        <option value="IT">IT</option>
                        <option value="EXTC">EXTC</option>
                        <option value="TRONICS">TRONICS</option>
                        <option value="TRICAL">TRICAL</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="MECH">MECH</option>
                        <option value="PROD">PROD</option>
                        <option value="TEXTILE">TEXTILE</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="studyYear" className="block mb-1">Study Year <span className="text-red-500">*</span></label>
                    <select
                        id="studyYear"
                        value={studyYear}
                        onChange={(e) => setStudyYear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Study Year</option>
                        <option value="First">First</option>
                        <option value="Second">Second</option>
                        <option value="Third">Third</option>
                        <option value="Final">Final</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gender" className="block mb-1">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="OPEN">OPEN</option>
                        <option value="EWS">EWS</option>
                        <option value="TFWS">TFWS</option>
                        <option value="DEFENCE">DEFENCE</option>
                        <option value="PWD">PWD</option>
                        <option value="CIWG">CIWG</option>
                        <option value="J&K">J&K</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="caste" className="block mb-1">Caste</label>
                    <select
                        id="caste"
                        value={caste}
                        onChange={(e) => setCaste(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Caste</option>
                        <option value="VJNT">VJNT</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birthDate" className="block mb-1">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
