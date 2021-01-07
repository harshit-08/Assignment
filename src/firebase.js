import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyArx35xIoEgKV34I8ekoFA-6emcNhOqX1A",
    authDomain: "assignment-582cc.firebaseapp.com",
    projectId: "assignment-582cc",
    storageBucket: "assignment-582cc.appspot.com",
    messagingSenderId: "199991224710",
    appId: "1:199991224710:web:af4eccfc448ea8b8176407"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };