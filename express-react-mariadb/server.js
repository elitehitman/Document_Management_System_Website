// Import necessary modules
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database connection
const app = express();
const port = 5000;

// Configure middleware
app.use(cors());
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Check if user exists
        const existingUser = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            // Update password if it's currently NULL
            if (existingUser[0].password === null) {
                await conn.query('UPDATE user SET password = ? WHERE username = ?', [password, username]);
                conn.release();
                return res.json({ message: 'Password updated successfully!' });
            } else {
                conn.release();
                return res.status(400).json({ message: 'User already has a password' });
            }
        }

        // Check if staff member exists
        const existingStaff = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);
        if (existingStaff.length > 0) {
            // Update password if it's currently NULL
            if (existingStaff[0].passwords === null) {
                await conn.query('UPDATE staff SET passwords = ? WHERE emp_email = ?', [password, username]);
                conn.release();
                return res.json({ message: 'Password updated successfully!' });
            } else {
                conn.release();
                return res.status(400).json({ message: 'Staff member already has a password' });
            }
        }

        conn.release();
        return res.status(400).json({ message: 'User does not exist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Initialize variables to track login status
        let isUserLogin = false;
        let isStaffLogin = false;
        let isAdminLogin = false;

        // Check if the user is a regular user
        let result = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (result.length > 0 && result[0].password === password) {
            // Fetching reg_no from the user table result
            const regNo = result[0].reg_no;
            // Fetch user data from the student table based on the reg_no (student table)
            const userData = await conn.query('SELECT * FROM student WHERE reg_no = ?', [regNo]);
            conn.release();
            return res.json({ message: 'Login successful!', userType: 'user', userData: userData[0], isUserLogin, isStaffLogin, isAdminLogin });
        }

        // Check if the user is a staff member
        result = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);
        if (result.length > 0 && result[0].passwords === password) {
            conn.release();
            isStaffLogin = true;
            return res.json({ message: 'Login successful!', userType: 'staff', isUserLogin, isStaffLogin, isAdminLogin });
        }

        // Check if the user is an admin
        result = await conn.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);
        if (result.length > 0) {
            conn.release();
            return res.json({ message: 'Login successful!', userType: 'admin', isUserLogin, isStaffLogin, isAdminLogin });
        }

        conn.release();
        res.status(401).json({ message: 'Invalid username or password' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Add a new route to fetch user data
app.get('/userdata', async (req, res) => {
    try {
        const { username } = req.query;
        console.log("Received username:", username); // Log received username
        const conn = await pool.getConnection();

        // Fetch user data from both user and student tables
        const userData = await conn.query(`
            SELECT u.username, s.*
            FROM user u
            INNER JOIN student s ON u.user_id = s.reg_no
            WHERE u.username = ?
        `, [username]);

        console.log("Fetched userData:", userData); // Log fetched userData
        conn.release();

        // Send the user data to the client
        res.json({ userData: userData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Add console.log statements inside the /studentdata route handler
// Add a new route to fetch student data
// app.get('/studentdata', async (req, res) => {
//     try {
//         const { regNo } = req.query;
//         console.log("Received regNo:", regNo); // Log received registration number
//         const conn = await pool.getConnection();

//         // Fetch user data from the student table based on reg_no
//         const userData = await conn.query('SELECT * FROM student WHERE reg_no = ?', [regNo]);

//         console.log("Fetched userData:", userData); // Log fetched userData
//         conn.release();

//         // Send the user data to the client
//         res.json({ userData: userData[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Add a new route to fetch all student names
app.get('/studentnames', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const students = await conn.query('SELECT * FROM student');
        conn.release();
        res.json({ students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Add a new route to fetch student data
app.get('/studentdata/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        console.log("Received regNo:", regNo); // Log received registration number
        const conn = await pool.getConnection();

        // Fetch user data from the student table based on reg_no
        const userData = await conn.query('SELECT * FROM student WHERE reg_no = ?', [regNo]);

        console.log("Fetched userData:", userData); // Log fetched userData
        conn.release();

        // Send the user data to the client
        res.json({ userData: userData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Add a new route to fetch staff data
app.get('/staffdata', async (req, res) => {
    try {
        const { username } = req.query;
        const conn = await pool.getConnection();

        // Fetch staff data based on the username
        const staffData = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);

        conn.release();

        // Send the staff data to the client
        res.json({ staffData: staffData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/alldocuments', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const documents = await conn.query('SELECT doc_id, doc_name FROM document');
        conn.release();
        res.json({ documents });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new route to fetch document image
app.get('/document/:regNo/:docId', async (req, res) => {
    try {
        const { regNo, docId } = req.params;
        const conn = await pool.getConnection();
        const documentData = await conn.query('SELECT doc_img FROM document WHERE stud_reg_no = ? AND doc_id = ?', [regNo, docId]);
        conn.release();
        if (documentData.length === 0 || !documentData[0].doc_img) {
            res.status(404).json({ message: 'Document not found' });
        } else {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': documentData[0].doc_img.length
            });
            res.end(documentData[0].doc_img);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Add a new route to handle adding a new student
app.post('/add-student', async (req, res) => {
    try {
        // Extract data from the request body
        const { regNo, aadharNo, name, email, mobileNo, course, branch, studyYear, gender, category, caste, birthDate, age } = req.body;

        // Add your validation checks here if necessary

        // Execute SQL query to insert the new student into the database
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO student (reg_no, aadhar_no, name, email_id, mobile_no, course, branch, study_year, gender, category, caste, birth_date, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [regNo, aadharNo, name, email, mobileNo, course, branch, studyYear, gender, category, caste, birthDate, age]);
        conn.release();

        // Send a success response to the client
        res.json({ message: 'Student added successfully!' });
    } catch (error) {
        // Handle errors
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.delete('/remove-student/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        const conn = await pool.getConnection();

        // Execute SQL query to delete the student from the database
        await conn.query('DELETE FROM student WHERE reg_no = ?', [regNo]);
        conn.release();

        // Send a success response to the client
        res.json({ message: 'Student removed successfully!' });
    } catch (error) {
        // Handle errors
        console.error('Error removing student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
