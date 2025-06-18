import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });


      // Axios menyimpan data di response.data, bukan response.json()
      const data = response.data;

      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      login(data.user);

      console.log("Login successful:", data);
      navigate("/");
    } catch (error) {
      // Bisa ambil error dari error.response.data.message (jika Laravel pakai response JSON standar)
      const message = error.response?.data?.message || "Login failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a8b764] p-4">
      <div className="w-full max-w-sm shadow-xl rounded-2xl bg-[#e9deb8] border-none p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-[#374c2c]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-[#374c2c] font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border border-[#374c2c] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#ffdd00]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-[#374c2c] font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-[#374c2c] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#ffdd00]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#ffdd00] text-[#374c2c] rounded-md font-semibold hover:bg-[#e6c900]"
          >
            Sign In
          </button>
          <Link to="/register" className="w-full py-2 mt-2 bg-[#374c2c] text-white rounded-md font-semibold hover:bg-[#2c3f23] block text-center">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}