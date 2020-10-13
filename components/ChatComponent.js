import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
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
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import * as RootNavigation from "../RootNavigation.js";

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

const refOn = (callback) => {
  this.ref
    .limitToLast(20)
    .on("child_added", (snapshot) => callback(this.parse(snapshot)));
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    messages: [],
  };

  get user() {
    return {
      name: "placeholder",
      email: "placeholder",
      avatar: "placeholder",
      _id: firebase.uid,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate("OnboardingPage")}
        >
          <Text
            style={{
              color: "#000000",
              margin: 25,
              fontSize: 20,
              position: "absolute",
            }}
          >
            ← Atrás
          </Text>
        </TouchableOpacity>
        <GiftedChat
          messages={this.state.messages}
          onSend={firebase.send}
          user={this.user}
        />
      </SafeAreaView>
    );
  }

  // componentDidMount() {
  //    firebase.refOn(message =>
  //        this.setState(previousState => ({
  //            messages: GiftedChat.append(previousState.messages, message),
  //        }))
  //    );
  // }
  // componentWillUnmount() {
  //    firebase.refOff();
  // }
}

export default Chat;
