// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyDsWO0fBb_nmjAbTyx-SfNOgV6Rno85ypo",
  authDomain: "react-acfd3.firebaseapp.com",
  projectId: "react-acfd3",
  storageBucket: "react-acfd3.appspot.com",
  messagingSenderId: "838553441351",
  appId: "1:838553441351:web:cc0e85caf17341f83dcd62",
  measurementId: "G-G8FEF0EJRJ",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
