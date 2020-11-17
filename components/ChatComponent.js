// @refresh reset
//
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Actions, ActionsProps } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import { Image, SafeAreaView, StyleSheet } from "react-native";
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
import LoginPage from "../pages/LoginPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import TimerComponent from "./Timer";

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

export default function Chat({ route }) {
  let firstUserId = route.params.userOne;
  let secondUserId = route.params.userTwo;
  const nombre = "placeholder";
  const [messages, setMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const usersIds = firstUserId + secondUserId;
  const db = firebase.firestore();
  const chatsRef = db.collection("chats/");
  let selectedChat = chatsRef.where("userTwo", "==", secondUserId);
  const database = firebase.database();
  const storage = firebase.storage();
  // Estado del chat mediante la función setTimeOut().
  const [chatActivo, setChatActivo] = useState(true);
  const storageRef = storage.ref();
  const defaultImageRef = storageRef.child("/defaultUserImage/icon.png");
  let [image, setImage] = useState("");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          if (chatsRef.where("userTwo", "==", secondUserId)) {
            return { ...message, createdAt: message.createdAt.toDate() };
          } else {
            return "Inicia un chat!";
          }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "QuedeOficios!",
          body: "Tienes nuevas notificaciones!",
          data: { data: "Mensajes no leídos." },
        },
        trigger: null,
      });
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

    // Desactivar chat luego de que pasen 30 minutos:
    setTimeout(() => {
      (chatActivo) => setChatActivo(!chatActivo);
    }, 1000 * 60 * 30);
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

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
          <TimerComponent />
          <GiftedChat
            messages={messages}
            user={{
              _id: firstUserId,
              user: firstUserId,
              _idTwo: secondUserId,
              userTwo: secondUserId,
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
