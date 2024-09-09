import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FcGlobe, FcSurvey } from 'react-icons/fc';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { LocaleConsumer } from '../context/LocaleContext';
import ThemeToggleButton from './ThemeToggleButton';

function Navigation({ activePage, logout, name }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of the application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire(
          'Logged out!',
          'You have been logged out successfully.',
          'success'
        );
      }
    });
  };

  const handleLocaleToggle = (toggleLocale) => {
    setIsRotating(true);

    toggleLocale();

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  return (
    <LocaleConsumer>
      {({ toggleLocale }) => {
        return (
          <nav className="bg-purple-950 p-4 fixed top-0 left-0 w-full z-50 shadow-md flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              <Link to="/">CatatNow</Link>
            </h1>

            <div className="flex items-center space-x-4">
              <ul className="flex space-x-4 flex-grow justify-center">
                <li
                  className={`text-white underline underline-offset-auto${
                    activePage === 'archive'
                      ? 'font-bold'
                      : 'hover:text-gray-400'
                  }`}
                >
                  <Link to="/archive">
                    <FcSurvey className="text-4xl hover:animate-shake transition duration-300" />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleLocaleToggle(toggleLocale)}
                    className={`${isRotating ? 'animate-spin' : ''}`}
                  >
                    <FcGlobe className="text-4xl hover:animate-shake transition duration-300" />
                  </button>
                </li>
              </ul>
              <ThemeToggleButton />
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-gray-400"
              >
                <span className="mr-4">{name}</span>
                <FiLogOut className="text-2xl hover:animate-shake transition duration-300" />
              </button>
            </div>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  activePage: PropTypes.string,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
