// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTGPVSxZw2wmPAOihCSe0PkspCCLs1xJI",
  authDomain: "owncloudapp-6930c.firebaseapp.com",
  projectId: "owncloudapp-6930c",
  storageBucket: "owncloudapp-6930c.appspot.com",
  messagingSenderId: "968244503906",
  appId: "1:968244503906:web:8a193a6d829656c2b9b83b",
  measurementId: "G-FVRBT3D4NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app); // Initialize auth

export { app, auth };