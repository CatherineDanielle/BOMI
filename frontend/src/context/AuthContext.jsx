import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  
  const logout = async () => {
    try {
      // Pastikan CSRF cookie tersedia
      await axios.get('/sanctum/csrf-cookie');
      
      // Hit logout API dengan explicit headers
      await axios.post('/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Logout API success');
    } catch (error) {
      console.log('Logout API failed:', error.response?.data || error.message);
      // Continue with local logout even if API fails
    } finally {
      // Clear user state
      setUser(null);
      
      // Clear token dari localStorage
      localStorage.removeItem('auth_token');
      
      // Clear axios default header
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);