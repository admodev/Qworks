import * as React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as FirebaseCore from "expo-firebase-core";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as Location from "expo-location";
import { TouchableHighlight } from "react-native-gesture-handler";

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: `195588211075-0kc4192v9lu24af5nic1jnlc82ri3ukc.apps.googleusercontent.com`,
      iosClientId: `195588211075-447b690on13phnr40ovggmc0mau4qau3.apps.googleusercontent.com`,
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
      appId: "791075094961301",
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
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

const signInWithFacebook = () => {
  logInWithFacebook();
};

const LoginPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <View style={{ width: "70%", top: 70, bottom: 0 }}>
          <Button
            buttonStyle={{
              backgroundColor: "#F4743B",
              paddingTop: 12,
              paddingRight: 80,
              paddingBottom: 12,
              paddingLeft: 80,
              borderRadius: 25,
            }}
            onPress={() => navigation.navigate("EmailLoginPage")}
            title="Iniciar Sesión"
          />
        </View>
        <View style={{ width: "70%", top: 80, bottom: 0 }}>
          <SocialIcon
            button
            title="Ingresar con Google"
            type="google"
            onPress={() => signInWithGoogle()}
          />
        </View>
        <View style={{ width: "70%", top: 85, bottom: 0 }}>
          <SocialIcon
            button
            title="Ingresar con Facebook"
            type="facebook"
            onPress={() => signInWithFacebook()}
          />
        </View>
        <View style={{ width: "70%", top: 90, bottom: 0 }}>
          <TouchableHighlight
            onPress={() => navigation.navigate("RegisterPage")}
          >
            <Text
              style={{ color: "#fff", marginLeft: "auto", marginRight: "auto" }}
            >
              No tienes cuenta? REGISTRATE
            </Text>
          </TouchableHighlight>
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

export default LoginPage;
