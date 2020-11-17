import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  View,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import CardsUsuarios from "./Cards";
import { concat } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Sharing from "expo-sharing";
import * as Updates from "expo-updates";

const AnunciosPage = ({ route }) => {
  let user = firebase.auth().currentUser;
  let id = user.uid;
  let image, nombre, apellido, actividad, emailPersonal;
  let dbRef = firebase
    .database()
    .ref("anuncios/")
    .orderByChild("id")
    .equalTo(id);
  dbRef.on("value", (snap) => {
    snap.forEach((child) => {
      key: child.key, (nombre = child.val().nombre);
      image = child.val().image;
      apellido = child.val().apellido;
      actividad = child.val().actividad;
      emailPersonal = child.val().emailPersonal;
    });
  });

  function eliminarAnuncio() {
    firebase.database().ref("anuncios/").child(id).remove();
    Updates.reloadAsync();
  }

  function eliminarCuenta() {
    console.log("placeholder");
    //    admin
    //      .auth()
    //      .deleteUser(uid)
    //      .then(function () {
    //        console.log("Successfully deleted user");
    //      })
    //      .catch(function (error) {
    //        console.log("Error deleting user:", error);
    //      });
  }

  function shareContent() {
    let options;
    Platform.OS === "ios" ? (options = "UTI") : (options = "mimeType");
    Sharing.isAvailableAsync().then(function () {
      Sharing.shareAsync(dbRef, options);
    });
  }

  return (
    <SafeAreaView style={{ margin: 25, backgroundColor: "transparent" }}>
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          left: 5,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => RootNavigation.navigate("ProfilePage")}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            color={"black"}
            size={32}
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ height: "98%" }}>
        <Card
          style={styles.card}
          containerStyle={{
            padding: 0,
            borderRadius: 15,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
        >
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
          {image == null ? (
            <Card.Image
              source={require("../assets/icon.png")}
              style={{
                borderRadius: 100,
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 60,
                marginRight: 60,
              }}
            />
          ) : (
            <Card.Image
              source={{ uri: image }}
              style={{
                borderRadius: 100,
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 60,
                marginRight: 60,
              }}
            />
          )}
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: "#fff",
            }}
          >
            {nombre} {apellido}
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
            }}
          >
            {actividad}
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
            }}
          >
            {emailPersonal}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 20,
              backgroundColor: "transparent",
            }}
            onPress={() => shareContent()}
          >
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Compartir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("EditarAnuncioScreen")}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 20,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Editar Anuncio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => eliminarAnuncio()}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 15,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Eliminar Anuncio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => eliminarCuenta()}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 15,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Eliminar Cuenta
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
      <SafeAreaView
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "flex-end",
          bottom: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></SafeAreaView>
    </SafeAreaView>
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

export default AnunciosPage;
