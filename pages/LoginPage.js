import React, { Component, useState, setState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Button, CheckBox, Input, SocialIcon } from "react-native-elements";
import * as FirebaseCore from "expo-firebase-core";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as Location from "expo-location";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/auth";
import {
    GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    GOOGLE_LOGIN_IOS_CLIENT_ID,
    FACEBOOK_APP_ID,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from "@env";
import * as RootNavigation from "../RootNavigation.js";
import RegisterPage from "./RegisterPage";

async function signInWithGoogleAsync() {
    try {
        const result = await Google.logInAsync({
            androidClientId: `${GOOGLE_LOGIN_ANDROID_CLIENT_ID}`,
            iosClientId: `${GOOGLE_LOGIN_IOS_CLIENT_ID}`,
            scopes: ["profile", "email"],
        });

        if (result.type === "success") {
            return result.accessToken;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        return { error: true };
    }
}
const signInWithGoogle = () => {
    signInWithGoogleAsync();
};

async function logInWithFacebook() {
    try {
        await Facebook.initializeAsync({
            appId: `${FACEBOOK_APP_ID}`,
        });
        const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ["public_profile"],
        });
        if (type === "success") {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`
            );
            Alert.alert("Ingresaste!", `Hola ${(await response.json()).name}!`);
        } else {
            Alert.alert(
                "Tienes que permitir el acceso a tu cuenta para que puedas iniciar sesión con Facebook."
            );
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}

const signInWithFacebook = () => {
    logInWithFacebook();
};

const LoginPage = ({ navigation }) => {
    let [email, setUserEmail] = useState("");
    let [password, setUserPassword] = useState("");
    var [isChecked, setChecked] = useState(false);
    const toggle = React.useCallback(() => setChecked(!isChecked));

    const loguearUsuarios = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                if (password != user.password) {
                    alert(
                        "Ingreso una contraseña erronea, intentelo nuevamente por favor."
                    );
                }
            })
            .then(function ({ navigation }) {
                () => RootNavigation.navigate("ProfilePage");
            });
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
        } else {
            user == null;
        }
    });
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
                alignItems: "center",
                justifyContent: "center",
        }}
        >
        <Image
        source={require("../assets/loginBackground.jpg")}
        style={{
            flex: 1,
                position: "absolute",
                resizeMode: "stretch",
                width: "100%",
                height: "100%",
        }}
        />
        <View
        style={{ width: "80%", marginTop: 70, bottom: 0 }}
        keyboardShouldPersistTaps="handled"
        >
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
        <Input
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        inputContainerStyle={{ marginTop: 100 }}
        style={{ color: "#ffffff", fontSize: 16 }}
        leftIcon={<Icon name="envelope-o" size={18} color="white" />}
        onChangeText={(email) => setUserEmail(email)}
        value={email}
        />
        <Input
        placeholder="Contraseña"
        inputContainerStyle={{}}
        leftIcon={<Icon name="lock" size={20} color="white" />}
        style={{ color: "#ffffff", fontSize: 16 }}
        secureTextEntry={true}
        onChangeText={(password) => setUserPassword(password)}
        value={password}
        onEndEditing={() => loguearUsuarios()}
        />
        <CheckBox
        title="Recordar Correo"
        containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: -20,
                marginLeft: 0,
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}
        onPress={toggle}
        checked={isChecked}
        />
        </KeyboardAvoidingView>
        </View>
        <View style={{ marginTop: 50 }}>
        <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
        Ingresar con...
        </Text>
        </View>
        <View
        style={{
            flex: 1,
                flexDirection: "row",
                marginTop: 30,
                bottom: 0,
        }}
        >
        <View>
        <SocialIcon
        button
        type="google"
        style={{ padding: 25 }}
        onPress={() => signInWithGoogle()}
        />
        </View>
        <View>
        <Text style={{ color: "#ffffff", marginTop: 25 }}>O</Text>
        </View>
        <View>
        <SocialIcon
        button
        type="facebook"
        style={{ padding: 30 }}
        onPress={() => signInWithFacebook()}
        />
        </View>
        </View>
        <View style={{ width: "70%", bottom: 50 }}>
        <TouchableHighlight
        onPress={() => RootNavigation.navigate("RegisterPage")}
        >
        <Text
        style={{
            color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
        }}
        >
        No tienes cuenta? REGISTRATE
        </Text>
        </TouchableHighlight>
        </View>
        </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
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

export var user;
export default LoginPage;
