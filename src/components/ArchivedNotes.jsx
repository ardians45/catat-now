import React from 'react';
import PropTypes from 'prop-types';
import NotesItem from './NotesItem';
import { LocaleConsumer } from '../context/LocaleContext';

function ArchivedNotes({ notes }) {
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="notes-list dark:bg-gray-900 dark:text-white">
            {/* Daftar Catatan Arsip */}
            {archivedNotes.length > 0 && (
              <div className="archived-notes">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'id' ? 'Catatan Arsip' : 'Archive Notes'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {archivedNotes.map((note) => (
                    <NotesItem key={note.id} {...note} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

ArchivedNotes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArchivedNotes;
