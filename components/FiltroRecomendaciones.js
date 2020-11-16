import React from "react";
import { Image, Text, SafeAreaView, View } from "react-native";
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

  function filtrarMenosTresEstrellas() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByChild("calificacion")
      .startAt(0)
      .endAt(3)
      .on("child_added", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            ratedUser: child.val().ratedUser,
            calificacion: child.val().calificacion,
          });
        });
      });

    console.log(itm);
  }

  function filtrarMasTresEstrellas() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByChild("calificacion")
      .startAt(3)
      .endAt(5)
      .on("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            ratedUser: child.val().ratedUser,
            calificacion: child.val().calificacion,
          });
        });
      });

    console.log(itm);
  }

  function filtrarCincoEstrellas() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByChild("calificacion")
      .equalTo(5)
      .on("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            ratedUser: child.val().ratedUser,
            calificacion: child.val().calificacion,
          });
        });
      });

    console.log(itm);
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
          height: "4%",
          top: 0,
        }}
      />
      <View
        style={{
          ...Platform.select({
            android: {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            ios: {
              position: "absolute",
              top: "8%",
            },
          }),
        }}
      >
        <Button
          title="Mostrar menos de 3 estrellas"
          onPress={() => filtrarMenosTresEstrellas()}
          buttonStyle={{
            ...Platform.select({
              android: {
                margin: "2%",
              },
              ios: {
                margin: "2%",
              },
            }),
          }}
        />
        <Button
          title="Mostrar más de 3 estrellas"
          onPress={() => filtrarMasTresEstrellas()}
          buttonStyle={{
            ...Platform.select({
              android: {
                margin: "2%",
              },
              ios: {
                margin: "2%",
              },
            }),
          }}
        />
        <Button
          title="Mostrar solo 5 estrellas"
          onPress={() => filtrarCincoEstrellas()}
          buttonStyle={{
            ...Platform.select({
              android: {
                margin: "2%",
              },
              ios: {
                margin: "2%",
              },
            }),
          }}
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
