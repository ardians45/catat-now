import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-500">
          404
        </h1>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
          Page Not Found
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
