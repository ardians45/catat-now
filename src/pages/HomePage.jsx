import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcInspection } from 'react-icons/fc';
import { useSearchParams, Link } from 'react-router-dom';

import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { getActiveNotes } from '../utils/network-data';
import { ThemeContext } from '../context/ThemeContext';
import { LocaleConsumer } from '../context/LocaleContext';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery') || '';

  function changeSearchParams(newSearchQuery) {
    setSearchParams({ searchQuery: newSearchQuery });
  }

  return (
    <HomePage defaultKeyword={searchQuery} keywordChange={changeSearchParams} />
  );
}

class HomePage extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      searchQuery: props.defaultKeyword || '',
      loading: true,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
        loading: false,
      };
    });
  }

  handleSearchChange(searchQuery) {
    this.setState({ searchQuery });
    this.props.keywordChange(searchQuery);
  }

  render() {
    const { notes, searchQuery, loading } = this.state;
    const { isDarkMode } = this.context;

    // Jika loading, tampilkan komponen Loading
    if (loading) {
      return <Loading />;
    }

    // Filter catatan aktif dan berdasarkan search query
    const activeNotes = Array.isArray(notes)
      ? notes.filter((note) => !note.archived)
      : [];

    const filteredNotes = activeNotes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div
              className={`transition-colors duration-300 mt-10 rounded-lg px-4 py-4 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}
              </h3>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={this.handleSearchChange}
              />
              <NotesList notes={filteredNotes} />
              <Link
                to="/add"
                className={`fixed bottom-4 right-4 p-3 text-white rounded-full shadow-lg ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <FcInspection className="text-6xl hover:animate-shake transition duration-300" />
              </Link>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

// PropTypes untuk HomePage
HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
