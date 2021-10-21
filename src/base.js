// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD__nZC2PhqdVCMS0hksDDab-S7nq-lWh0',
    authDomain: 'the-work-21561.firebaseapp.com',
    projectId: 'the-work-21561',
    storageBucket: 'the-work-21561.appspot.com',
    messagingSenderId: '731167540467',
    appId: '1:731167540467:web:fd3567e655770a17f22386',
    measurementId: 'G-4WWNQD1ZK0',
    databaseURL: 'https://the-work-21561-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
