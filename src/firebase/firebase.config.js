// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBitKDQGzBcm_ilB26CyIREImRLXNRUO5Q",
  authDomain: "click-crafters.firebaseapp.com",
  projectId: "click-crafters",
  storageBucket: "click-crafters.appspot.com",
  messagingSenderId: "737506935673",
  appId: "1:737506935673:web:8095ca7c144057ddc9e5a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app