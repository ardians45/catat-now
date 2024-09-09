import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import NotesItem from './NotesItem';
import { LocaleConsumer } from '../context/LocaleContext';

function NotesList({ notes }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Filter notes berdasarkan kata kunci
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredNotes.length === 0) {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {locale === 'id'
                ? 'Tidak ada catatan yang ditemukan'
                : 'No notes found'}
            </p>
          );
        }}
      </LocaleConsumer>
    );
  }

  return (
    <div className="notes-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredNotes.map((note) => (
        <NotesItem key={note.id} {...note} />
      ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool,
    })
  ).isRequired,
};

export default NotesList;
