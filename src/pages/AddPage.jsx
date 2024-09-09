import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/network-data';
import Loading from '../components/Loading';

function AddPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onAddNoteHandler(note) {
    setIsLoading(true);
    await addNote(note);
    setIsLoading(false);
    navigate('/');
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mt-10">
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default AddPage;
