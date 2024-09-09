import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';

function NotesItemBody({ id, title, createdAt, body }) {
  return (
    <div className="notes-item__body max-w-full p-4 dark:bg-gray-800 dark:text-white">
      <h3 className="notes-item__title text-lg font-bold">
        <Link to={`/detail/${id}`} className="text-blue-500 dark:text-blue-300">
          {title}
        </Link>
      </h3>
      <p className="notes-item__time font-light text-sm">
        {showFormattedDate(createdAt)}
      </p>
      <br />
      <p className="notes-item__record overflow-hidden text-ellipsis">
        {parser(body)}
      </p>
    </div>
  );
}

NotesItemBody.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NotesItemBody;
