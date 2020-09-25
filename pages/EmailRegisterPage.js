import React, { Component, useState, setState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  KeyboardAvoidingView,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, Input, SocialIcon } from "react-native-elements";
import * as FirebaseCore from "expo-firebase-core";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as Location from "expo-location";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

const EmailRegisterPage = ({ navigation }, props) => {
  const database = SQLite.openDatabase("quedeoficios", 3);

  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");

  let register_user = () => {
    console.log(userName, userEmail, userPassword);

    if (!userName) {
      alert("Por favor rellena todos los campos.");
      return;
    }
    if (!userEmail) {
      alert("Por favor rellena todos los campos.");
      return;
    }
    if (!userPassword) {
      alert("Por favor rellena todos los campos.");
      return;
    }

    database.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_user (user_name, user_email, user_password) VALUES (?,?,?)",
        [userName, userEmail, userPassword],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Éxito!",
              "Te registraste",
              [
                {
                  text: "Okay",
                  onPress: () => navigation.navigate("ProfilePage"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Tu registro falló!");
        }
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/gradients/20x20.png")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Image
                source={require("../assets/gradients/20x20.png")}
                style={{
                  flex: 1,
                  position: "absolute",
                  resizeMode: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
              <Input
                placeholder="Nombre de Usuario"
                leftIcon={<Icon name="user" size={24} color="white" />}
                onChangeText={(userName) => setUserName(userName)}
                value={props.value}
              />
              <Input
                placeholder="Correo Electrónico"
                leftIcon={<Icon name="envelope-o" size={24} color="white" />}
                onChangeText={props.onChangeText}
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                value={props.value}
              />
              <Input
                placeholder="Contraseña"
                leftIcon={<Icon name="lock" size={24} color="white" />}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                value={props.value}
              />
              <Button
                buttonStyle={{
                  backgroundColor: "orange",
                  paddingLeft: 40,
                  paddingRight: 40,
                  borderRadius: 20,
                }}
                onPress={register_user}
                title="Registrarme"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
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
});

export default EmailRegisterPage;
