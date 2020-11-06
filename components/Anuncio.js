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
  Button,
  Card,
  Icon,
  Input,
  Overlay,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import CardsUsuarios from "./Cards";
import { concat } from "react-native-reanimated";

const AnuncioSeleccionado = ({ route }) => {
  let id = route.params.id;
  let routeParamsToString = id.toString();
  let image, nombre, apellido, actividad, emailPersonal;
  let dbRef = firebase
    .database()
    .ref("anuncios/")
    .orderByChild("id")
    .equalTo(id);
  let dbResult = dbRef.on("value", (snap) => {
    snap.forEach((child) => {
      key: child.key, (nombre = child.val().nombre);
      image = child.val().image;
      apellido = child.val().apellido;
      actividad = child.val().actividad;
      emailPersonal = child.val().emailPersonal;
      id = child.val().id;
    });
  });
  let storage = firebase.storage();
  let storageRef = storage.ref();
  let defaultImageRef = storageRef
    .child("defaultUserImage/icon.png")
    .toString();
  let userProfilePic = storageRef.child("userProfilePics/").child(id).child;
  const [visible, setVisible] = useState(false);
  const rating = () => {
    console.log("placeholder");
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={{ margin: 25, backgroundColor: "transparent" }}>
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
        <TouchableOpacity onPress={toggleOverlay}>
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
        </TouchableOpacity>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ width: "80%", height: "80%" }}
        >
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
        </Overlay>
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
        <AirbnbRating
          count={5}
          reviews={["Malo", "Promedio", "Bueno", "Profesional", "Experto"]}
          defaultRating={3}
          size={18}
          readonly={true}
          // startingValue={rating}
        />
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
        <TouchableOpacity onPress={() => alert("Proximamente...")}>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Ver Mapa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            RootNavigation.navigate("ChatComponent", {
              userOne: firebase.auth().currentUser.uid,
              userTwo: routeParamsToString,
            })
          }
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
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Enviar Mensaje
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
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

export default AnuncioSeleccionado;
