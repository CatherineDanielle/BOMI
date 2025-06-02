import React, { useState } from 'react';
import { User, Users } from 'lucide-react';

const BMICalc = () => {
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(170);

  const handleWeightChange = (increment) => {
    setWeight(prev => Math.max(0, prev + increment));
  };

  const handleWeightInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    setWeight(Math.max(0, value));
  };

  const handleAgeChange = (increment) => {
    setAge(prev => Math.max(0, prev + increment));
  };

  const handleAgeInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    setAge(Math.max(0, value));
  };

  const handleHeightChange = (e) => {
    setHeight(parseInt(e.target.value));
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    alert(`Your BMI is: ${bmi.toFixed(1)}`);
  };

  return (
    <div className="min-h-screen bg-[#A4B465]">

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 ">
        <div className="w-full max-w-4xl">
          {/* Main Card Container */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Side - Instructions and Gender Selection */}
              <div className="bg-[#626F47] rounded-2xl p-6 text-white items-center justify-center text-center ff">
                <h2 className="text-2xl font-bold mb-4">Measure your BMI now!</h2>
                <p className="text-sm mb-8 opacity-90">
                  BMI, or Body Mass Index, is a measure that uses your height and weight to work out if your weight is healthy. BMI checks if you're underweight, overweight, or obese.
                </p>
                
                {/* Gender Selection */}
                <div className="flex justify-center space-x-8">
                  <button
                    onClick={() => setGender('female')}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      gender === 'female' 
                        ? 'bg-yellow-400 text-green-800' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <User size={32} />
                    <span className="mt-2 font-medium">Female</span>
                  </button>
                  
                  <button
                    onClick={() => setGender('male')}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      gender === 'male' 
                        ? 'bg-yellow-400 text-green-800' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Users size={32} />
                    <span className="mt-2 font-medium">Male</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Input Controls */}
              <div className="bg-[#F5ECD5] rounded-2xl p-6">
                <div className="text-[#626F47] mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Current Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </h3>
                </div>

                {/* Weight Control */}
                <div className="mb-6">
                  <label className="block text-[#626F47] font-medium mb-2">Weight (kg)</label>
                  <div className="flex items-center justify-between bg-white rounded-xl p-4">
                    <button
                      onClick={() => handleWeightChange(-1)}
                      className="w-10 h-10 bg-[#626F47] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-[#626F47]">{weight}</span>
                    <button
                      onClick={() => handleWeightChange(1)}
                      className="w-10 h-10 bg-[#626F47] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Age Control */}
                <div className="mb-6">
                  <label className="block text-[#626F47] font-medium mb-2">Age</label>
                  <div className="flex items-center justify-between bg-white rounded-xl p-4">
                    <button
                      onClick={() => handleAgeChange(-1)}
                      className="w-10 h-10 bg-[#626F47] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-[#626F47]">{age}</span>
                    <button
                      onClick={() => handleAgeChange(1)}
                      className="w-10 h-10 bg-[#626F47] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="mb-6">
                  <label className="block text-[#626F47] font-medium mb-2">Height (cm)</label>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-[#626F47]">{height}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={height}
                      onChange={handleHeightChange}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(height - 100) / 1.5}%, #bbf7d0 ${(height - 100) / 1.5}%, #bbf7d0 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-[#626F47] mt-1">
                      <span>0cm</span> 
                      <span>300cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center mt-8">
              <button
                onClick={calculateBMI}
                className="bg-[#626F47] text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-green-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Check your BMI!
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BMICalc;