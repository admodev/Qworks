import React from "react";
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
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";
import "firebase/database";
import "firebase/firestore";
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

let firebaseFirestore = firebase.firestore();

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }
  componentWillMount() {
    firebaseFirestore
      .collection("chats")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let chatId = doc.id;
          let remitente = doc.remitente;
          let contenido = doc.contenido;
          console.log(`${doc.id} => ${doc.remitente()}`);
        });
      });

    firebase
      .database()
      .ref("/usuarios")
      .on("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            foto: child.val().foto,
            nombre: child.val().nombre,
            apellido: child.val().apellido,
            profesion: child.val().profesion,
          });
        });
        itm = items;
        this.setState({ items: items });
        console.log(itm);
        console.log("itemstate " + this.state.items);
        itm.forEach((itms) => {
          console.log("title*" + itms.title);
        });
      });
  }
  render() {
    return (
      <SafeAreaView>
        <Card>
          <Card.Title>Mensajes</Card.Title>
          <Card.Divider />
          {users.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                <Image resizeMode="cover" source={{ uri: u.foto }} />
                <Text>{u.nombre}</Text>
                <Text>{firebaseFirestore.contenido}</Text>
              </View>
            );
          })}
        </Card>
      </SafeAreaView>
    );
  }
}

export default Messages;
