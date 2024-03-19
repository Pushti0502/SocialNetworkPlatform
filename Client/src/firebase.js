// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmoGOUGe0ahaWejbtp7D8s1gX7hQ1eM38",
  authDomain: "socialnetworkplatformfordev.firebaseapp.com",
  projectId: "socialnetworkplatformfordev",
  storageBucket: "socialnetworkplatformfordev.appspot.com",
  messagingSenderId: "575075041005",
  appId: "1:575075041005:web:61ca262efc509fdd3c16e4",
  measurementId: "G-6618MBQQQB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = firebase.messaging();

// Request permission for notifications
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
  // Retrieve FCM token
  return messaging.getToken();
}).then((token) => {
  console.log('FCM Token:', token);
  // Send token to your backend server
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // Display notification to user
});