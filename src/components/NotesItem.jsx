import React from 'react';
import PropTypes from 'prop-types';
import NotesItemBody from './NotesItemBody';

function NotesItem({ id, title, createdAt, body }) {
  return (
    <div className="notes-item bg-white dark:bg-gray-900 border-2 dark:border-gray-700 rounded-lg shadow-inner-right">
      <div className="text-left rounded h-80 w-100 p-4 grid dark:text-white">
        <NotesItemBody
          id={id}
          title={title}
          createdAt={createdAt}
          body={body}
        />
      </div>
    </div>
  );
}

NotesItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NotesItem;
