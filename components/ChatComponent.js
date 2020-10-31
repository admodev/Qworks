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
import "firebase/database";
import * as RootNavigation from "../RootNavigation.js";
import LoginPage from "../pages/LoginPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as AuthWatcher from "../hooks/HookEstadoDeAuth";

if (firebase.apps.length === 0) {
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
}

const db = firebase.firestore();
const chatsRef = db.collection("chats");
const database = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();
const defaultImageRef = storageRef.child("icon.png");
const image = storageRef.child("userImages/uid");

export default function Chat() {
  const [user, setUser] = useState(null);
  const nombre = firebase
    .database()
    .ref("/users/" + "id")
    .once("value")
    .then(function (snapshot) {
      var nombre = snapshot.val() && snapshot.val().nombre;
    });
  const [messages, setMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Perdón, necesitamos tu permiso para que puedas subir una foto!"
          );
        }
      }
    })();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, nombre };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  const secondUser = "CBlLQIfFijbs1Hh7jWWEhkKfIkN2";

  if (messages >= 1) {
    schedulePushNotification();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function renderActions(props: Readonly<ActionsProps>) {
    return (
      <Actions
        {...props}
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

  if (!AuthWatcher.user) {
    () => RootNavigation.navigate("LoginPage");
  }

  if (image == null) {
    image = defaultImageRef;
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
              user,
              avatar: image,
            }}
            user={{
              secondUser,
              avatar: secondUser.image,
            }}
            onSend={handleSend}
            showUserAvatar={true}
            showAvatarForEveryMessage={true}
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
