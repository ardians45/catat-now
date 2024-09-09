// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5QygomO93hhtZP3SDqtC-CkA6YAkh3UU',
  authDomain: 'catatnow-9a5f4.firebaseapp.com',
  projectId: 'catatnow-9a5f4',
  storageBucket: 'catatnow-9a5f4.appspot.com',
  messagingSenderId: '571539096630',
  appId: '1:571539096630:web:915bb1a2001245edae8497',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
