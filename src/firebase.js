import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {
  getMessaging,
  getToken,
  onMessage,
  currentToken,
} from "firebase/messaging";
import { useState } from "react";
import axios from "axios";
// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyDsWO0fBb_nmjAbTyx-SfNOgV6Rno85ypo",
  authDomain: "react-acfd3.firebaseapp.com",
  projectId: "react-acfd3",
  storageBucket: "react-acfd3.appspot.com",
  messagingSenderId: "838553441351",
  appId: "1:838553441351:web:cc0e85caf17341f83dcd62",
  measurementId: "G-G8FEF0EJRJ",
};


initializeApp(firebaseConfig);
const messaging = getMessaging();
export const Tokens = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BPmPKud9SgYTv23BB9dsM9TaA1uvSW5fh0MpNdxC20nw_xfvpgLyirQU-0uHGI_jDcbOkG9d66h-N-t8ZUILSFg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log({currentToken });
       axios
         .post("http://localhost:8000/setFireToken", {
           token: currentToken,
         })
         .then((res) => {
           console.log(res);
         });
       
        
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
}; 
//
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
//......

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });