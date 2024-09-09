import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';
import { LocaleConsumer } from '../context/LocaleContext';

function RegisterInput({ register }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <form
            onSubmit={onSubmitHandler}
            className={`register-input max-w-md mx-auto p-8 shadow-lg rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder={locale === 'id' ? 'Nama' : 'Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-4${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-300'
                    : 'bg-white border-gray-300 text-black focus:ring-blue-500'
                }`}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder={locale === 'id' ? 'Surel' : 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-4'${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-300'
                    : 'bg-white border-gray-300 text-black focus:ring-blue-500'
                }`}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder={locale === 'id' ? 'Sandi' : 'Password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-4 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-300'
                    : 'bg-white border-gray-300 text-black focus:ring-blue-500'
                }`}
              />
            </div>
            <button
              type="submit"
              className={`w-full p-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400'
                  : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
              }`}
            >
              {locale === 'id' ? 'Daftar' : 'Register'}
            </button>
          </form>
        );
      }}
    </LocaleConsumer>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
