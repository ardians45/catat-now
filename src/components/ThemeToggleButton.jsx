import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center text-white bg-gray-800 p-1 rounded-full focus:outline-none text-2xl transition-colors duration-500 ease-in-out  ${
        isDarkMode
          ? 'bg-yellow-500 hover:bg-yellow-600'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isDarkMode ? '🌞 ' : '🌜 '}
    </button>
  );
};

export default ThemeToggleButton;
