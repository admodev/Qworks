import React from "react";
import * as firebase from "firebase";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";
import "firebase/database";
import * as RootNavigation from "./RootNavigation.js";

try {
  firebase.initializeApp({
    apiKey: `${FIREBASE_API_KEY}`,
    authDomain: `${FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${FIREBASE_DATABASE_URL}`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${FIREBASE_APP_ID}`,
    measurementId: `${FIREBASE_MEASUREMENT_ID}`,
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error raised", err.stack);
  }
}

const firebaseApp = firebase;

class userConditionals extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <></>;
  }
}

export default userConditionals;
