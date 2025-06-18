import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import BMI from './pages/BMI';
import Result from './pages/Result';
import LoginPage from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';

import { AuthProvider } from './context/AuthContext';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'; 

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}