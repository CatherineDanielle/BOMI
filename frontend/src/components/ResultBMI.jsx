import React, { useState, useEffect } from 'react';
import { Scale, BarChart3, TrendingUp } from 'lucide-react';
import axios from 'axios';

const ResultBMI = ({ bmiData = null }) => {
  const [bmiHistory, setBmiHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use passed bmiData or default values
  const latestBMI = bmiData ? bmiData.bmi : "24.6";
  const bmiCategory = bmiData ? bmiData.category : "Optimal";

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Optimal';
    if (bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  const displayCategory = bmiData ? getBMICategory(bmiData.bmi) : bmiCategory;

  // Format date to match your design (e.g., "SUN, 4 May 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  // Fetch BMI history from Laravel backend
  const fetchBMIHistory = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        console.log('No authentication token found, using mock data');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8000/api/records', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Format the data to match your component structure
      const formattedHistory = response.data.map(record => ({
        bmi: parseFloat(record.bmi).toFixed(1),
        height: record.height,
        weight: record.weight,
        date: formatDate(record.created_at),
        category: getBMICategory(record.bmi)
      }));

      setBmiHistory(formattedHistory);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching BMI history:', error);
      setError('Failed to fetch BMI history');
      setLoading(false);
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        console.log('Unauthorized access, using mock data');
      }
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchBMIHistory();
  }, []);

  // Mock BMI history data matching the design (fallback)
  const mockBMIHistory = [
    { bmi: 18.5, height: 160, weight: 50, date: "SUN, 4 May 2025" },
    { bmi: 18.5, height: 160, weight: 50, date: "SUN, 4 May 2025" },
    { bmi: 18.5, height: 160, weight: 50, date: "SUN, 4 May 2025" },
    { bmi: 18.5, height: 160, weight: 50, date: "SUN, 4 May 2025" },
    { bmi: 18.5, height: 160, weight: 50, date: "SUN, 4 May 2025" }
  ];

  // Use real data if available, otherwise fall back to mock data
  const displayHistory = bmiHistory.length > 0 ? bmiHistory : mockBMIHistory;

  const bmiToY = (bmi, chartHeight = 320) => {
    const minBMI = 15; // Lower bound for chart
    const maxBMI = 40; // Upper bound for chart
    const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, parseFloat(bmi)));
    return chartHeight - ((normalizedBMI - minBMI) / (maxBMI - minBMI)) * (chartHeight - 40) + 20;
  };

  const indexToX = (index, totalPoints, chartWidth = 300) => {
    if (totalPoints <= 1) return chartWidth / 2;
    const padding = 40;
    const availableWidth = chartWidth - (padding * 2);
    return padding + (index / (totalPoints - 1)) * availableWidth;
  };

  // BMI Chart Component matching the design
  const BMIChart = () => {
    const chartData = displayHistory.slice(0, 10); // Limit to 10 points for readability
    
    // Generate points for the polyline
    const points = chartData.map((item, index) => {
      const x = indexToX(index, chartData.length);
      const y = bmiToY(item.bmi);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative bg-white rounded-lg p-4" style={{ height: '400px', width: '100%' }}>
        {/* BMI Categories on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-24 flex flex-col">
          <div className="bg-red-400 text-white text-center py-3 text-sm font-bold flex-1 flex items-center justify-center rounded-tr-lg">
            Obese
          </div>
          <div className="bg-orange-400 text-white text-center py-3 text-sm font-bold flex-1 flex items-center justify-center">
            Overweight
          </div>
          <div className="bg-green-500 text-white text-center py-3 text-sm font-bold flex-1 flex items-center justify-center">
            Optimal
          </div>
          <div className="bg-amber-600 text-white text-center py-3 text-sm font-bold flex-1 flex items-center justify-center rounded-br-lg">
            Underweight
          </div>
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-6 top-0 bottom-19 w-8 flex flex-col justify-between text-xs text-[#626F47] py-4">
          <span>35</span>
          <span>30</span>
          <span>25</span>
          <span>18.5</span>
        </div>
        
        {/* Chart area with trend line */}
        <div className="ml-10 mr-28 mt-4 mb-4 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 300 320">
            {/* Grid lines for better readability */}
            <defs>
              <pattern id="grid" width="60" height="64" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 64" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* BMI trend line using actual data */}
            {chartData.length > 1 && (
              <polyline
                points={points}
                fill="none"
                stroke="#626F47"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* Data points */}
            {chartData.map((item, index) => {
              const x = indexToX(index, chartData.length);
              const y = bmiToY(item.bmi);
              return (
                <g key={index}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="5" 
                    fill="#626F47" 
                    stroke="white" 
                    strokeWidth="2"
                  />
                  {/* BMI value tooltip */}
                  <text 
                    x={x} 
                    y={y - 12} 
                    textAnchor="middle" 
                    className="text-xs fill-[#626F47] font-medium"
                  >
                    {item.bmi}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* BMI label on left side */}
        <div className="absolute left-0 top-1/2 transform -rotate-90 text-sm text-[#626F47] font-medium origin-center">
          BMI
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5ECD5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Cards - exactly as shown in design */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Latest BMI Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-[#A4B465]/30">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-[#F5ECD5] rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Scale size={24} className="text-[#626F47] mx-auto mb-1" />
                  <div className="text-xs font-bold text-[#626F47]">BMI</div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">Latest BMI</h3>
                <p className="text-4xl font-bold text-[#A4B465]">
                  {bmiHistory.length > 0 ? bmiHistory[0].bmi : latestBMI}
                </p>
              </div>
            </div>
          </div>

          {/* BMI Category Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-[#A4B465]/30">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-[#F5ECD5] rounded-full flex items-center justify-center">
                <BarChart3 size={32} className="text-[#626F47]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">BMI Category</h3>
                <p className="text-3xl font-bold text-[#A4B465]">
                  {bmiHistory.length > 0 ? bmiHistory[0].category : displayCategory}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - History and Chart side by side */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* History Section - Left Side */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold text-black">History</h2>
              {loading && (
                <div className="text-sm text-[#626F47]/70">Loading...</div>
              )}
              {!loading && bmiHistory.length > 0 && (
                <button 
                  onClick={fetchBMIHistory}
                  className="text-sm text-[#A4B465] hover:text-[#626F47] font-medium"
                >
                  Refresh
                </button>
              )}
            </div>
            <div className="space-y-4">
              {displayHistory.length > 0 ? (
                displayHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-4">
                      {/* Green up arrow */}
                      <div className="text-green-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 14l5-5 5 5H7z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#A4B465] text-xl">BMI : {record.bmi}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#626F47] text-sm font-medium">
                        Height : {record.height}
                      </p>
                      <p className="text-[#626F47] text-sm font-medium">
                        Weight : {record.weight}
                      </p>
                    </div>
                    <div className="text-right text-sm text-[#626F47]/70">
                      <p>{record.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#626F47]/70">
                  <p className="text-2xl font-medium">Empty :(</p>
                </div>
              )}
            </div>
            
            {/* Show data source indicator */}
            <div className="mt-4 text-xs text-[#626F47]/50 text-center">
              {bmiHistory.length > 0 ? 'Showing your personal BMI history' : 'Showing sample data - login to see your history'}
            </div>
          </div>

          {/* BMI Chart Section - Right Side */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <BMIChart />
            </div>
          </div>
        </div>

        {/* Additional Insights Section - if there's BMI data */}
        {bmiData && (
          <div className="mt-12 bg-white rounded-xl p-6 border-2 border-[#A4B465]/30">
            <h3 className="text-2xl font-bold text-[#626F47] mb-6 text-center">Your Latest Calculation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F5ECD5] rounded-lg p-4 text-center">
                <p className="text-sm text-[#626F47]/70 mb-1">Gender</p>
                <p className="font-bold text-[#626F47] text-lg capitalize">{bmiData.gender}</p>
              </div>
              <div className="bg-[#F5ECD5] rounded-lg p-4 text-center">
                <p className="text-sm text-[#626F47]/70 mb-1">Weight</p>
                <p className="font-bold text-[#626F47] text-lg">{bmiData.weight}kg</p>
              </div>
              <div className="bg-[#F5ECD5] rounded-lg p-4 text-center">
                <p className="text-sm text-[#626F47]/70 mb-1">Height</p>
                <p className="font-bold text-[#626F47] text-lg">{bmiData.height}cm</p>
              </div>
              <div className="bg-[#F5ECD5] rounded-lg p-4 text-center">
                <p className="text-sm text-[#626F47]/70 mb-1">Age</p>
                <p className="font-bold text-[#626F47] text-lg">{bmiData.age}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchBMIHistory}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultBMI;