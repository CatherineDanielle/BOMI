import React from 'react';
import Navbar from '../components/Navbar';
import ResultBMI from '../components/ResultBMI';
import Footer from '../components/Footer';

const Result = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar currentPage='bmi'/>
      <ResultBMI />
      <Footer />
    </div>
  );
};

export default Result;