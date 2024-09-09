import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';
import { LocaleConsumer } from '../context/LocaleContext';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    const { isDarkMode } = this.context;

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form
              onSubmit={this.onSubmitHandler}
              className={`login-input max-w-md mx-auto p-8 shadow-lg rounded-lg ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder={locale === 'id' ? 'Surel' : 'Email'}
                  value={this.state.email}
                  onChange={this.onEmailChangeHandler}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-300'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-400'
                  }`}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder={locale === 'id' ? 'Sandi' : 'Password'}
                  value={this.state.password}
                  onChange={this.onPasswordChangeHandler}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-300'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-400'
                  }`}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400'
                    : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                }`}
              >
                {locale === 'id' ? 'Masuk' : 'Login'}
              </button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

// Menghubungkan context ke komponen
LoginInput.contextType = ThemeContext;

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
