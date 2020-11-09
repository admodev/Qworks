// @refresh reset
//
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useCallback } from "react";
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
import { Input } from "react-native-elements";
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
import { unstable_batchedUpdates } from "react-dom";
import * as Updates from "expo-updates";

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

export default function ComentarScreen({ route }) {
  let id = route.params.id;
  let user = firebase.auth().currentUser.uid;
  let [comentario, setComentario] = useState("");

  function comentarUsuario(comentario) {
    firebase
      .database()
      .ref("comentarios/" + id)
      .set({
        id: user,
        comentario: comentario,
      })
      .then(function () {
        Updates.reloadAsync();
      });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Input
        placeholder="Deja un comentario..."
        onChangeText={(comentario) => setComentario(comentario)}
        value={comentario}
      />
      <Button title="Comentar" onPress={() => comentarUsuario(comentario)} />
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
