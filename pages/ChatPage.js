import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
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
import Chat from "../components/ChatComponent";

const ChatPage = ({ navigation }) => {
  return <Chat />;
};

export default ChatPage;
