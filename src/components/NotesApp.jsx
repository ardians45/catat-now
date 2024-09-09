import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { FcGlobe } from 'react-icons/fc';
import { LocaleProvider, LocaleConsumer } from '../context/LocaleContext';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import ArchivePage from '../pages/ArchivePage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ThemeToggleButton from './ThemeToggleButton';
import { getUserLogged, putAccessToken } from '../utils/network-data';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    return (
      <ThemeProvider>
        <LocaleProvider value={this.state.localeContext}>
          <ThemeContext.Consumer>
            {({ isDarkMode }) => (
              <div
                className={`notes-app flex flex-col items-center transition-colors duration-300 ease-in-out ${
                  isDarkMode ? 'dark' : ''
                }`}
              >
                {this.state.authedUser === null ? (
                  <>
                    <header className="bg-purple-950 text-white flex items-center justify-between p-4 shadow-md w-full fixed top-0 left-0 z-50">
                      <h1 className="text-2xl font-bold ">CatatNow</h1>
                      <div className="flex gap-2">
                        <LocaleConsumer>
                          {({ toggleLocale }) => {
                            return (
                              <button onClick={toggleLocale}>
                                <FcGlobe className="text-4xl hover:animate-spin transition duration-0 ease-in-out" />
                              </button>
                            );
                          }}
                        </LocaleConsumer>
                        <ThemeToggleButton />
                      </div>
                    </header>
                    <main className="w-full max-w-6xl px-5 min-h-screen h-full">
                      <Routes>
                        <Route
                          path="/*"
                          element={
                            <LoginPage loginSuccess={this.onLoginSuccess} />
                          }
                        />
                        <Route path="/register" element={<RegisterPage />} />
                      </Routes>
                    </main>
                  </>
                ) : (
                  <>
                    <header className="bg-black text-white flex items-center justify-between p-4 shadow-md w-full fixed top-0 left-0 z-50">
                      <Navigation
                        activePage="home"
                        logout={this.onLogout}
                        name={this.state.authedUser.name}
                      />
                    </header>

                    <main className="w-full max-w-6xl px-5 mt-16">
                      <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/add" element={<AddPage />}></Route>
                        <Route
                          path="/detail/:id"
                          element={<DetailPage />}
                        ></Route>
                        <Route
                          path="/archive"
                          element={<ArchivePage />}
                        ></Route>
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </main>
                  </>
                )}
              </div>
            )}
          </ThemeContext.Consumer>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default NotesApp;
