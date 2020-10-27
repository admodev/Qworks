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

const database = firebase.database();

firebase.database().ref('/users/uid/nombre').once('value').then(function(snapshot) {
    let nombre = (snapshot.val() && snapshot.val().nombre);
});

const ProfilePage = ({ navigation }) => { 
    const [nombre, actualizarNombre] = useState(nombre);
    var user = firebase.auth().currentUser;
    const signUserOut = () => {
        firebase
            .auth()
            .signOut()
            .catch(function (error) {
                alert(error);
            })
            .then(function () {
                navigation.replace("LoginPage");
            });
    };
    if (nombre == null) {
        let nombre = "Nombre";
    }
    return(
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
        {user ? (
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
            {nombre == null ? <Text>Nombre</Text> : nombre}
            </Text>
            <Text
            style={{
                color: "#000000",
                    fontSize: 14,
                    marginLeft: 20,
                    marginTop: 10,
            }}
            >
            {user.email}
            </Text>
            </View>
            <Button
            title="Anunciarte"
            onPress={() => navigation.navigate("AnunciatePage")}
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
            <TouchableOpacity onPress={() => RootNavigation.navigate("ChatComponent")}>
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
            <TouchableOpacity
            onPress={() => navigation.navigate("MisFavoritos")}
            >
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
            <MaterialCommunityIcons name="book-open" color={"orange"} size={20} />{" "}
            Favoritos
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("Anuncios")}
            >
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
            <MaterialCommunityIcons name="bullhorn" color={"orange"} size={20} />{" "}
            Mis Anuncios
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
        ) : (
            <LoginPage />
        )}
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

export default ProfilePage;
