import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Impor ThemeProvider
import NotesApp from './components/NotesApp';
import { app } from './utils/firebase';

console.log(app);
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
