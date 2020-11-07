import React, { useState, setState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

export default function CambiarNombreScreen() {
  let nombreNuevo = useState("");
  let user = firebase.auth().currentUser;
  let userId = user.uid;

  function updateName(nombreNuevo) {
    firebase
      .database()
      .ref("anuncios/")
      .orderByChild("id")
      .equalTo(userId)
      .once("value", function (snap) {
        snap.ref.update({ nombre: nombreNuevo });
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input
        placeholder="Escribe tu nombre..."
        value={nombreNuevo}
        onChangeText={(nombreNuevo) => setState(nombreNuevo)}
        inputContainerStyle={{
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "25%",
        }}
      />
      <Button
        onPress={() => updateName()}
        buttonStyle={{
          backgroundColor: "orange",
          borderRadius: 25,
          width: "70%",
          alignSelf: "center",
          marginTop: 10,
        }}
      />
    </SafeAreaView>
  );
}
