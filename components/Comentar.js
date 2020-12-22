// @refresh reset
//
import React, { useState, setState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, Image, TouchableOpacity, View } from "react-native";
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
import * as Updates from "expo-updates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

export default function ComentarScreen({ route, navigation }) {
  let id = route.params.id;
  let user = firebase.auth().currentUser.uid;
  let [comentario, setComentario] = useState("");

  function comentarUsuario(comentario) {
      let userCommentingRef = firebase.database().ref("anuncios/").orderByChild("id").equalTo(firebase.auth().currentUser.uid);
      let userNameRef = userCommentingRef.once("value").then(function(snapshot) {
    var nombre = snapshot.val().nombre;
      });
    firebase
      .database()
      .ref("comentarios/")
      .push({})
      .set({
        id: user,
        comentadoPor: nombre,
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
    <Image
        source={require("../assets/gradients/20x20.png")}
        style={{
          flex: 1,
          position: "absolute",
          resizeMode: "cover",
          width: "100%",
          height: "5%",
          top: 0
        }}
      />
      <View
        style={{
            width: 30,
                height: 30,
                alignItems: "center",
                top: 50,
                left: 10,
                position: "absolute"
        }}
        >
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
        <MaterialCommunityIcons
        name="arrow-left"
        color={"#fd5d13"}
        size={32}
        style={{ marginTop: "auto", marginBottom: "auto" }}
        />
        </TouchableOpacity>
        </View>
      <Input
        placeholder="Deja un comentario..."
        onChangeText={(comentario) => setComentario(comentario)}
        value={comentario}
      />
      <Button title="Comentar" onPress={() => alert("¡Enviado!")} />
    </SafeAreaView>
  );
}
