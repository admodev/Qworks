import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";

var itm = [];

export default function FiltroRecomendados() {
  let user = firebase.auth().currentUser;
  firebase
    .database()
    .ref("calificaciones/")
    .on("value", (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          ratedUser: child.val().ratedUser,
          calificacion: child.val().calificacion,
        });
      });
      itm = items;
    });

  console.log(itm);
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          ...Platform.select({
            android: {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            ios: {
              alignItems: "center",
              justifyContent: "center",
            },
          }),
        }}
      >
        <Button
          title="Mostrar menos de 3 estrellas"
          onPress={() => filtrarMenosTresEstrellas()}
        />
        <Button
          title="Mostrar más de 3 estrellas"
          onPress={() => filtrarMasTresEstrellas()}
        />
        <Button
          title="Mostrar solo 5 estrellas"
          onPress={() => filtrarCincoEstrellas()}
        />
      </View>
      {itm.map((l, i) => (
        <View key={i}>
          <Text>{l.ratedUser}</Text>
          <Text>{l.calificacion}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
