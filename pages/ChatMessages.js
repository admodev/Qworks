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
import {
  Avatar,
  Button,
  Card,
  Icon,
  Input,
  ListItem,
} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";

var itm = [];
let image;

class MessagesScreen extends React.Component {
  render() {
    let defaultImage = require("../assets/icon.png");
    let image;
    const list = [
      {
        nombre: "Usuario",
        avatar_url: image == null ? defaultImage : image,
        mensaje: "Mensaje de chat acá",
      },
      {
        nombre: "Usuario",
        avatar_url: image == null ? defaultImage : image,
        mensaje: "Mensaje de chat acá",
      },
      {
        nombre: "Usuario",
        avatar_url: image == null ? defaultImage : image,
        mensaje: "Mensaje de chat acá",
      },
      {
        nombre: "Usuario",
        avatar_url: image == null ? defaultImage : image,
        mensaje: "Mensaje de chat acá",
      },
    ];
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.nombre}</ListItem.Title>
              <ListItem.Subtitle>{l.mensaje}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </SafeAreaView>
    );
  }
}

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

export default MessagesScreen;
