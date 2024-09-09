import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import { ThemeContext } from '../context/ThemeContext';
import { LocaleConsumer } from '../context/LocaleContext';

function LoginPage({ loginSuccess }) {
  const { isDarkMode } = useContext(ThemeContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <>
            <section
              className={`flex flex-col items-center justify-center overflow-y-auto`}
              style={{ minHeight: '100vh' }}
            >
              <div
                className={`shadow-2xl border-2 rounded-lg p-8 w-full max-w-md ${
                  isDarkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <h2
                  className={`text-2xl font-bold text-center mb-6 ${
                    isDarkMode ? 'text-white' : 'text-indigo-600'
                  }`}
                >
                  {locale === 'id'
                    ? 'Masuk ke Akun Anda'
                    : 'Log in to Your Account'}
                </h2>
                <LoginInput login={onLogin} />
                <p
                  className={`mt-4 text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {locale === 'id'
                    ? 'Belum punya akun?'
                    : "Don't have an account?"}{' '}
                  <Link
                    to="/register"
                    className={`hover:underline font-medium ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  >
                    {locale === 'id' ? 'Daftar di sini.' : 'Register here.'}
                  </Link>
                </p>
              </div>
            </section>
          </>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
