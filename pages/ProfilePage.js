import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as RootNavigation from "../RootNavigation.js";
import * as LoginPageData from "./LoginPage";
import LoginPage from "./LoginPage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ProfilePage = () => {
  var user = firebase.auth().currentUser;
  const signUserOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert("Cerraste Sesión.");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  if (user) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("../assets/gradients/20x20.png")}
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            width: "100%",
            height: "5%",
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 70,
            marginLeft: 15,
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ color: "#000000", fontSize: 14, marginLeft: 20 }}>
              Nombre
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: 14,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Correo Electrónico
            </Text>
          </View>
          <Button
            title="Anunciarte"
            buttonStyle={{
              backgroundColor: "orange",
              marginRight: 15,
              borderRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            bottom: 50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("ChatPage")}>
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
              <MaterialCommunityIcons
                name="comment-text"
                color={"orange"}
                size={20}
              />{" "}
              Mensajes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MisComentariosPage")}
          >
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
              <MaterialCommunityIcons
                name="comment"
                color={"orange"}
                size={20}
              />{" "}
              Comentarios
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MisRecomendadosPage")}
          >
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
              <MaterialCommunityIcons name="heart" color={"orange"} size={20} />{" "}
              Recomendados
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Cerrar Sesión"
            onPress={() => signUserOut()}
            buttonStyle={{
              backgroundColor: "orange",
              borderRadius: 12,
              fontWeight: "bold",
              padding: 10,
              marginTop: 50,
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return <LoginPage />;
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default ProfilePage;
