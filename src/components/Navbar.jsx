import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; // pastikan sudah install @heroicons/react

const Navbar = ({ currentPage = 'home' }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', key: 'home', href: '/' },
    { name: 'Articles', key: 'article', href: '/article' },
    { name: 'BMI', key: 'BMI', href: '/bmi' },
    { name: 'About BOMI', key: 'about', href: '/about' },
    { name: 'Login', key: 'login', href: '/login' }
  ];

  const handleLogoClick = () => {
    const welcomeSection = document.getElementById('welcome-banner');
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-10 px-6 py-4 bg-slate-700">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer transform hover:scale-105 transition-transform duration-200"
          onClick={handleLogoClick}
        >
          <img
            src="/logo.svg"
            alt="Menyakin Logo"
            className="w-16 h-16"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`text-lg font-medium transition-colors duration-200 relative ${
                currentPage === item.key || hoveredItem === item.key
                  ? 'text-[#626F47]'
                  : 'text-white'
              }`}
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              {(currentPage === item.key || hoveredItem === item.key) && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`block text-lg font-medium ${
                currentPage === item.key ? 'text-yellow-400' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
