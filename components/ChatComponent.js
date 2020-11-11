// @refresh reset
//
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Actions, ActionsProps } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
} from "react-native";
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
import "firebase/auth";
import "firebase/firestore";
import * as RootNavigation from "../RootNavigation.js";
import LoginPage from "../pages/LoginPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

export default function Chat({ route }) {
  let firstUserId = route.params.userOne;
  let secondUserId = route.params.userTwo;
  const usersIds = firstUserId + secondUserId;
  let currentUser = firebase.auth().currentUser;
  const [messages, setMessages] = useState([
    {
      _id: firstUserId,
      text: messages,
      createdAt: new Date().getTime(),
      user: {
        _id: firstUserId,
        name: "nombre",
      },
    },
    {
      _id: secondUserId,
      text: messages,
      createdAt: new Date().getTime(),
      user: {
        _id: secondUserId,
        name: "nombreDos",
      },
    },
  ]);
  let [image, setImage] = useState("");
  let firestore = firebase.firestore().collection("MESSAGE_THREADS");

  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  (async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Perdón, necesitamos tu permiso para que puedas subir una foto!");
      }
    }
  })();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    setImage(result.uri);
  };

  function renderActions(ActionsProps) {
    return (
      <Actions
        {...ActionsProps}
        options={{
          ["Enviar Imágen"]: pickImage,
        }}
        icon={() => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={"#000000"}
            size={24}
          />
        )}
        onSend={(args) => console.log(args)}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/gradients/20x20.png")}
        style={{
          flex: 1,
          position: "absolute",
          resizeMode: "cover",
          width: "100%",
          height: "5%",
        }}
      />
      {currentUser ? (
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
          <GiftedChat
            messages={messages}
            user={{
              _id: currentUser.uid,
              user: currentUser.uid,
            }}
            onSend={newMessage => handleSend(newMessage)}
            showUserAvatar={true}
            placeholder="Escribe un mensaje..."
            renderActions={renderActions}
          />
        </SafeAreaView>
      ) : (
        <LoginPage />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
});
