import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import NotesItem from '../components/NotesItem';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import Loading from '../components/Loading';
import { LocaleConsumer } from '../context/LocaleContext';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery') || '';

  function changeSearchParams(newSearchQuery) {
    setSearchParams({ searchQuery: newSearchQuery });
  }

  return (
    <ArchivePage
      defaultKeyword={searchQuery}
      keywordChange={changeSearchParams}
    />
  );
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchQuery: props.defaultKeyword || '',
      isLoading: true,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    if (data) {
      this.setState({
        notes: data,
        isLoading: false,
      });
    }
  }

  handleSearchChange(searchQuery) {
    this.setState({ searchQuery });
    this.props.keywordChange(searchQuery);
  }

  render() {
    const { notes, searchQuery, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    // Filter catatan berdasarkan search query
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="p-4 dark:bg-gray-900 dark:text-white mt-10 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}
              </h3>

              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={this.handleSearchChange}
              />

              {filteredNotes.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {locale === 'id'
                    ? 'Tidak Catatan yang diarsipkan'
                    : 'No Archived notes'}
                </p>
              ) : (
                <div className="notes-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredNotes.map((note) => (
                    <NotesItem key={note.id} {...note} />
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;
