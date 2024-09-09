import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcDownload, FcUpload, FcDeleteDatabase } from 'react-icons/fc';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { LocaleConsumer } from '../context/LocaleContext';

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      body: '',
      archived: false,
      createdAt: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.params;

    try {
      const { error, data } = await getNote(id);

      if (error) {
        this.setState({ error: 'Note not found!', isLoading: false });
      } else {
        this.setState({
          id: data.id,
          title: data.title,
          body: data.body,
          archived: data.archived,
          createdAt: data.createdAt,
          isLoading: false,
        });
      }
    } catch (e) {
      this.setState({ error: 'Failed to fetch note!', isLoading: false });
    }
  }

  handleArchiveToggle = async () => {
    const { id, archived } = this.state;

    try {
      if (archived) {
        await unarchiveNote(id);
        Swal.fire({
          title: 'Success!',
          text: 'Note has been unarchived.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        await archiveNote(id);
        Swal.fire({
          title: 'Success!',
          text: 'Note has been archived.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }

      this.setState({ archived: !archived });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update note status.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  handleDelete = async () => {
    try {
      await deleteNote(this.state.id);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your note has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.props.navigate('/');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the note.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  render() {
    const { title, body, archived, createdAt, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <LocaleConsumer>
          {({ locale }) => {
            return (
              <p className="text-center text-xl text-gray-700 dark:text-gray-300">
                {locale === 'id' ? 'Memuat...' : 'Loading...'}
              </p>
            );
          }}
        </LocaleConsumer>
      );
    }

    if (error) {
      return <p className="text-center text-xl text-red-500">{error}</p>;
    }

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl mt-10 transition-all duration-500">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                {locale === 'id' ? 'Detail Catatan' : 'Note Details'}
              </h2>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {body}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'id' ? 'Dibuat pada :' : 'Created on :'}{' '}
                  <span className="font-medium">
                    {showFormattedDate(createdAt)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status:{' '}
                  <span
                    className={`font-medium ${
                      archived ? 'text-yellow-500' : 'text-green-500'
                    }`}
                  >
                    {archived
                      ? `${locale === 'id' ? 'Arsip' : 'Archived'}`
                      : `${locale === 'id' ? 'Aktif' : 'Active'}`}
                  </span>
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={this.handleArchiveToggle}
                  className={`flex items-center justify-center py-3 px-6 rounded-lg text-white focus:outline-none transition-shadow duration-300 ${
                    archived
                      ? 'border border-green-700 shadow-lg hover:shadow-green-500'
                      : 'border border-blue-500 shadow-lg hover:shadow-blue-500'
                  }`}
                >
                  {archived ? (
                    <>
                      <FcUpload className="text-2xl" />
                    </>
                  ) : (
                    <>
                      <FcDownload className="text-2xl" />
                    </>
                  )}
                </button>
                <button
                  onClick={this.handleDelete}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg text-white shadow-lg hover:shadow-red-500 transition-shadow duration-300"
                >
                  <FcDeleteDatabase className="mr-2 text-2xl" />
                  {locale === 'id' ? 'Hapus' : 'Delete'}
                </button>
              </div>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

DetailPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

function withRouter(Component) {
  return function Wrapper(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  };
}

export default withRouter(DetailPage);
