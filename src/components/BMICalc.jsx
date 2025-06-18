import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Chart } from 'react-google-charts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BMICalc = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  // Check if user is logged in from AuthContext
  const isLoggedIn = Boolean(user);

  const handleCheckHereClick = () => {
    if (!user) {
      // Tampilkan pesan dan redirect ke login
      if (window.confirm('You need to login first. Go to login page?')) {
        navigate('/login');
      }
      return;
    }

    // Jika sudah login, lanjut ke result
    navigate('/result');
  };

  const handleWeightChange = (increment) => {
    setWeight((prev) => Math.max(0, prev + increment));
  };

  const handleAgeChange = (increment) => {
    setAge((prev) => Math.max(0, prev + increment));
  };

  const handleHeightChange = (e) => {
    setHeight(parseInt(e.target.value));
  };

  const calculateBMI = async () => {
    try {
      // Try authenticated request first if user is logged in
      if (user) {
        const response = await axios.post('http://localhost:8000/api/bmi', {
          gender,
          weight,
          height,
          age,
        }, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        const { bmi, category, composition } = response.data;
        setBmi(bmi);
        setBmiCategory(category);

        setBodyCompositionData([
          ['Component', 'Percentage'],
          ['Muscle', composition.muscle_mass],
          ['Bone', composition.bone_mass],
          ['Fat', composition.bfp],
          ['Other', composition.other],
        ]);
      } else {
        // If not logged in, use no-login endpoint
        const response = await axios.post('http://localhost:8000/api/bmi-no-login', {
          gender,
          weight,
          height,
          age,
        });

        const { bmi, category, composition } = response.data;
        setBmi(bmi);
        setBmiCategory(category);

        setBodyCompositionData([
          ['Component', 'Percentage'],
          ['Muscle', composition.muscle_mass],
          ['Bone', composition.bone_mass],
          ['Fat', composition.bfp],
          ['Other', composition.other],
        ]);
      }
    } catch (error) {
      console.error('Error calculating BMI:', error);
      
      // Fallback to no-login endpoint if authenticated request fails
      if (user && error.response?.status === 401) {
        console.log('Auth failed, trying no-login endpoint');
        try {
          const response = await axios.post('http://localhost:8000/api/bmi-no-login', {
            gender,
            weight,
            height,
            age,
          });

          const { bmi, category, composition } = response.data;
          setBmi(bmi);
          setBmiCategory(category);

          setBodyCompositionData([
            ['Component', 'Percentage'],
            ['Muscle', composition.muscle_mass],
            ['Bone', composition.bone_mass],
            ['Fat', composition.bfp],
            ['Other', composition.other],
          ]);
        } catch (fallbackError) {
          console.error('Fallback BMI calculation also failed:', fallbackError);
          alert('Failed to calculate BMI. Please try again.');
        }
      } else {
        alert('Failed to calculate BMI. Please try again.');
      }
    }
  };

  // Data untuk Pie Chart Google
  const [bodyCompositionData, setBodyCompositionData] = useState([
    ['Component', 'Percentage'],
    ['Muscle', 40],
    ['Bone', 25],
    ['Fat', 23],
    ['Other', 12],
  ]);

  const chartOptions = {
    pieHole: 0.4,
    is3D: false,
    legend: { position: 'bottom' },
    slices: {
      0: { color: '#A4B465' },
      1: { color: '#C3D899' },
      2: { color: '#E6E9D2' },
      3: { color: '#f0f5e4' },
    },
    chartArea: { width: '90%', height: '80%' },
  };

  return (
    <div className="min-h-screen bg-[#A4B465] py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Kiri */}
        <div className="bg-[#626F47] rounded-2xl p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Measure your BMI now!</h2>
          <p className="text-sm mb-8 opacity-90 text-justify">
            BMI, or Body Mass Index, is a measure that uses your height and weight to work out if your weight is healthy.
          </p>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setGender('female')}
              className={`flex flex-col items-center p-4 rounded-xl w-24 h-24 ${
                gender === 'female' ? 'bg-yellow-400 text-green-800' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <User size={32} />
              <span className="mt-2 font-medium">Female</span>
            </button>
            <button
              onClick={() => setGender('male')}
              className={`flex flex-col items-center p-4 rounded-xl w-24 h-24 ${
                gender === 'male' ? 'bg-yellow-400 text-green-800' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <User size={32} />
              <span className="mt-2 font-medium">Male</span>
            </button>
          </div>
        </div>

        {/* Kanan */}
        <div className="bg-[#F5ECD5] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-center text-[#626F47] mb-4">
            Current Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </h3>

          {/* Weight */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-4">
              <label className="text-[#626F47] font-medium">Weight (kg)</label>
              <button onClick={() => handleWeightChange(-1)} className="w-10 h-10 bg-[#626F47] text-white rounded-full">-</button>
              <span className="text-2xl font-bold text-[#626F47]">{weight}</span>
              <button onClick={() => handleWeightChange(1)} className="w-10 h-10 bg-[#626F47] text-white rounded-full">+</button>
            </div>
          </div>

          {/* Age */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-4">
              <label className="text-[#626F47] font-medium">Age</label>
              <button onClick={() => handleAgeChange(-1)} className="w-10 h-10 bg-[#626F47] text-white rounded-full ml-14">-</button>
              <span className="text-2xl font-bold text-[#626F47]">{age}</span>
              <button onClick={() => handleAgeChange(1)} className="w-10 h-10 bg-[#626F47] text-white rounded-full">+</button>
            </div>
          </div>

          {/* Height */}
          <div className="mb-6 bg-white p-4 rounded-xl">
            <label className="text-[#626F47] font-medium">Height (cm)</label>
            <div className="text-center text-3xl font-bold text-[#626F47] mb-2">{height}</div>
            <input
              type="range"
              min="0"
              max="300"
              value={height}
              onChange={handleHeightChange}
              className="w-full h-2 rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, #16a34a 0%, #16a34a ${height / 3}%, #bbf7d0 ${height / 3}%, #bbf7d0 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-[#626F47] mt-1">
              <span>0cm</span> <span>300cm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Hitung */}
      <div className="text-center mt-8">
        <button
          onClick={calculateBMI}
          className="bg-[#626F47] text-white px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Check your BMI!
        </button>
      </div>

      {/* Hasil BMI & Pie Chart */}
      {bmi && (
        <div className="bg-[#F5ECD5] mt-12 max-w-2xl mx-auto rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-[#626F47] mb-4">Results</h2>
          <div className="inline-block bg-[#A4B465] px-6 py-2 rounded-xl text-white text-lg font-semibold mb-6">
            {bmiCategory}
          </div>

          <h3 className="text-2xl font-semibold text-[#626F47] mb-6">Body Composition Estimation</h3>

          <div className="flex justify-center">
            <Chart
              chartType="PieChart"
              data={bodyCompositionData}
              options={chartOptions}
              width={'100%'}
              height={'300px'}
            />
          </div>

          {isLoggedIn && (
              <button 
                onClick={handleCheckHereClick}
                className="mt-6 bg-[#626F47] text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors">
                Track results
              </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICalc;