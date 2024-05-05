import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Document from './components/Document';
import Staff from './components/Staff';
import StaffProfile from './components/StaffProfile';
import DocumentPage from './components/DocumentPage';
import Admin from './components/Admin';
import AddStudent from './components/AddStudent';
import LandingPage from './components/Landing';
import NotFound from './components/NotFound';
import './App.css';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/documents/:regNo" element={<DocumentPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
