import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Impor ThemeProvider
import NotesApp from './components/NotesApp';

// Import style
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      {' '}
      <NotesApp />
    </ThemeProvider>
  </BrowserRouter>
);
