import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
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
import { StackActions } from "@react-navigation/native";

const db = firebase.firestore();
const chatsRef = db.collection("chats");
const database = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();
const defaultImageRef = storageRef.child("icon.png");
const image = storageRef.child("userImages/uid");

const Messages = () => {
  let state = {
    items: [],
  };
  chatsRef.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      user: doc.user,
      message: doc.data(),
    }));
    let items = [];
    items.push({
      id: id,
      usuario: user,
      mensaje: doc.data(),
    });
    item = items;
    setState({ items: items });
    console.log(itm);
    console.log("itemstate " + state.items);
    itm.forEach((itms) => {
      console.log("title" + itms.title);
    });
  });
  var itm = [];
  const [messages, setMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;
  return (
    <Card
      style={styles.card}
      containerStyle={{
        padding: 0,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderWidth: 0,
      }}
    >
      {state.items.map((u, i) => {
        return (
          <View key={i} style={{ margin: 25, backgroundColor: "transparent" }}>
            <Image
              source={require("../assets/patron.jpg")}
              style={{
                flex: 1,
                position: "absolute",
                resizeMode: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            />
            <Image
              source={require("../assets/gradients/20x20.png")}
              style={{
                flex: 1,
                position: "absolute",
                resizeMode: "cover",
                width: "100%",
                height: "100%",
                opacity: 0.9,
                borderRadius: 10,
              }}
            />
            <Card.Image
              source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
              style={{
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 60,
                marginRight: 60,
              }}
            />
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {u.usuario}
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10,
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {u.mensaje}
            </Text>
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  card: {
    marginTop: 50,
    backgroundColor: "#483D8B",
    shadowColor: "#000",
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default Messages;
