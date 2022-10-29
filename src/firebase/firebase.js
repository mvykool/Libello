import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCJvcjOA40Qh2IWCJB7cjgR1tEEHlls_Kk",
    authDomain: "libello-55da0.firebaseapp.com",
    projectId: "libello-55da0",
    storageBucket: "libello-55da0.appspot.com",
    messagingSenderId: "1031465040829",
    appId: "1:1031465040829:web:4ea46617d58e69002db0d4",
    measurementId: "G-23NBKED7RJ"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;

/**export storage */

export const storage = getStorage(FirebaseApp);