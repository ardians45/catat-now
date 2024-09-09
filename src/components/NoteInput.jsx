import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { LocaleConsumer } from '../context/LocaleContext';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      maxTitleLength: 50,
      isSubmitting: false,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    if (newTitle.length <= this.state.maxTitleLength) {
      this.setState({ title: newTitle });
    }
  }

  onBodyChangeEventHandler(event) {
    const newBody = event.target.innerText;
    this.setState({ body: newBody });
  }

  async onSubmitEventHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;

    // Validasi jika judul atau isi kosong
    if (!title.trim() || !body.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Title and content cannot be empty!',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      await this.props.addNote({
        title: this.state.title,
        body: this.state.body,
      });

      // Tampilkan SweetAlert ketika berhasil menambahkan catatan
      Swal.fire({
        title: 'Success!',
        text: 'Note has been added successfully',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

      this.setState({
        title: '',
        body: '',
      });
    } catch (error) {
      console.error('Error adding note:', error);

      // Tampilkan SweetAlert ketika terjadi error
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding your note.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    } finally {
      this.setState({ isSubmitting: false });
    }
  }

  render() {
    const { title, maxTitleLength, isSubmitting } = this.state;
    const charactersLeft = maxTitleLength - title.length;

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form
              className="notes-input space-y-6 p-8 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700 mb-6"
              onSubmit={this.onSubmitEventHandler}
            >
              <div>
                <input
                  type="text"
                  placeholder={locale === 'id' ? 'Judul' : 'Title'}
                  value={title}
                  onChange={this.onTitleChangeEventHandler}
                  className={`w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={isSubmitting}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {charactersLeft}{' '}
                  {locale === 'id'
                    ? 'karakter yang tersisa'
                    : 'characters remaining'}
                </p>
              </div>
              <div
                contentEditable
                placeholder="Write your note here..."
                onInput={this.onBodyChangeEventHandler}
                className={`w-full min-h-40 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                }`}
                data-placeholder="Write your note here..."
              ></div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isSubmitting}
              >
                {locale === 'id' ? 'Tambah Catatan' : 'Add Note'}
              </button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
