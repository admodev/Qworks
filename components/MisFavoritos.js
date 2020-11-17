import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";

var itm = [];

export default function MisFavoritosScreen() {
  let user = firebase.auth().currentUser;
  firebase
    .database()
    .ref("favoritos/")
    .on("value", (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          favoritos: child.val().favoritos,
        });
      });
      itm = items;
    });

  console.log(itm);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {itm.map((l, i) => (
        <View key={i}>
          <Text>{l.favoritos}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
