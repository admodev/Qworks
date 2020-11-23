import React, { useEffect, useState, setState } from "react";
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
    Avatar,
    Button,
    Card,
    Icon,
    Input,
    ListItem,
} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";

let user = firebase.auth().currentUser;
let items = [];
let usuario, ultimoMensaje;
let db = firebase.firestore();
let chatsRef = db.collection("chats/");

export default function MessagesScreen({ route }) {
    useEffect(() => {
        if (user) {
            Promise.all([
                //chatsRef.where("_id", "==", user.uid).orderBy("createdAt")
                chatsRef.get().then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        console.log(doc.data());
                        items.push({
                            usuario: doc.data()._id,
                            ultimoMensaje: doc.data().text,
                        });
                    });
                }),
            ]);
        }
    })
    return(
        <SafeAreaView style={{ flex: 1 }}>
        {user == null ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: "auto", marginBottom: "auto" }}>
            <Text style={{ alignSelf: "center", fontSize: 26 }}>Por favor inicia sesión para visualizar tus chats.</Text>
            <TouchableOpacity onPress={() => RootNavigation.navigate('LoginPage')}>
            <Text style={{ alignSelf: "center", marginTop: "5%", fontSize: 24, color: "orange", fontWeight: "bold", textTransform: "uppercase" }}>Ingresar</Text>
            </TouchableOpacity>
            </View>
        ) : items.map((u, i) => {
            (
                <View key={i}>
                <ListItem bottomDivider>
                <ListItem.Content>
                <ListItem.Title>Chat</ListItem.Title>
                <ListItem.Subtitle>{u.ultimoMensaje}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
                </View>
            )
        })}
        </SafeAreaView>
    );
}

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
