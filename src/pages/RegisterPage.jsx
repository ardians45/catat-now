import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { ThemeContext } from '../context/ThemeContext';
import { LocaleConsumer } from '../context/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section
            className={`flex flex-col items-center justify-center min-h-screen `}
          >
            <div
              className={`shadow-2xl border-2 rounded-lg p-8 w-full max-w-md ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <h2
                className={`text-2xl font-bold text-center mb-6 ${
                  isDarkMode ? 'text-white' : 'text-indigo-600'
                }`}
              >
                {locale === 'id'
                  ? 'Daftar Akun Baru'
                  : 'Sign Up for a New Account'}
              </h2>
              <RegisterInput register={onRegisterHandler} />
              <p
                className={`mt-4 text-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {locale === 'id' ? 'Sudah punya akun?' : 'Have an account?'}{' '}
                <Link
                  to="/"
                  className={`hover:underline font-medium ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                >
                  {locale === 'id' ? 'Masuk' : 'Login'}
                </Link>
              </p>
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
