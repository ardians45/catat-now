import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      // Menampilkan SweetAlert2 jika login gagal
      Swal.fire({
        title: 'Login Gagal!',
        text: responseJson.message,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Coba Lagi',
      });
      return { error: true, data: null };
    }

    // Menampilkan SweetAlert2 jika login berhasil
    Swal.fire({
      title: 'Login Berhasil!',
      text: 'Selamat datang kembali!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });

    return { error: false, data: responseJson.data };
  } catch (error) {
    // Menampilkan SweetAlert2 jika terjadi error saat login
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan saat mencoba login. Silakan coba lagi nanti.',
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Coba Lagi',
    });
    return { error: true, data: null };
  }
}

async function register({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      // Menampilkan SweetAlert2 jika registrasi gagal
      Swal.fire({
        title: 'Registrasi Gagal!',
        text: responseJson.message,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Coba Lagi',
      });
      return { error: true };
    }

    // Menampilkan SweetAlert2 jika registrasi berhasil
    Swal.fire({
      title: 'Registrasi Berhasil!',
      text: 'Akun Anda telah dibuat. Silakan login untuk melanjutkan.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });

    return { error: false };
  } catch (error) {
    // Menampilkan SweetAlert2 jika terjadi error saat registrasi
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan saat mencoba registrasi. Silakan coba lagi nanti.',
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Coba Lagi',
    });
    return { error: true };
  }
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
