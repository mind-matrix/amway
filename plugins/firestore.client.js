import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyAx6Re5Iy4PwxizBoJPeAlNxJi7PBV1j0o",
    authDomain: "amway-ec865.firebaseapp.com",
    databaseURL: "https://amway-ec865.firebaseio.com",
    projectId: "amway-ec865",
    storageBucket: "amway-ec865.appspot.com",
    messagingSenderId: "391330334563",
    appId: "1:391330334563:web:cdc2a07ab06d15d4e2b556",
    measurementId: "G-B4M7NCKT68"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;