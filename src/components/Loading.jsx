import React from 'react';
import { LocaleConsumer } from '../context/LocaleContext';

const Loading = () => {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-500">
              {locale === 'id' ? 'Memuat...' : 'Loading...'}
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

export default Loading;
