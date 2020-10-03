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
import * as firebase from "firebase";
import 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from "@env";

try {
    firebase.initializeApp({
        "apiKey": `${ FIREBASE_API_KEY }`,
        "authDomain": `${ FIREBASE_AUTH_DOMAIN }`,
        "databaseURL": `${ FIREBASE_DATABASE_URL }`,
        "projectId": `${ FIREBASE_PROJECT_ID }`,
        "storageBucket": `${ FIREBASE_STORAGE_BUCKET }`,
        "messagingSenderId": `${ FIREBASE_MESSAGING_SENDER_ID }`,
        "appId": `${ FIREBASE_APP_ID }`,
        "measurementId": `${ FIREBASE_MEASUREMENT_ID }`
    })

} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }}

const firebaseApp= firebase;

const EmailRegisterPage = ({ navigation }, props) => {
    let [email, setUserEmail] = useState("");
    let [password, setUserPassword] = useState("");

    const registrarUsuarios = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (err) {
                alert(err);
            });
    }

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
                                placeholder="Correo Electrónico"
                                leftIcon={<Icon name="envelope-o" size={24} color="white" />}
                                onChangeText={(email) => setUserEmail(email)}
                                value={props.value}
                            />
                            <Input
                                placeholder="Contraseña"
                                leftIcon={<Icon name="lock" size={24} color="white" />}
                                secureTextEntry={true}
                                onChangeText={(password) => setUserPassword(password)}
                                value={props.value}
                            />
                            <Button
                                buttonStyle={{
                                    backgroundColor: "#F4743B",
                                    paddingLeft: 40,
                                    paddingRight: 40,
                                    borderRadius: 20,
                                }}
                                onPress={registrarUsuarios}
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
