import * as React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as FirebaseCore from "expo-firebase-core";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as Location from "expo-location";
import * as firebase from "firebase";
import 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from "@env";
import firebaseKeys from "../keys.js";

const EmailLoginPage = ({ navigation }) => {
  let [email, setUserEmail] = useState("");
  let [password, setUserPassword] = useState("");

    const loguearUsuarios = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(err) {
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
                onChangeText={props.onChangeText}
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
                onPress={loguearUsuarios}
                title="Iniciar Sesión"
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

export default EmailLoginPage;
