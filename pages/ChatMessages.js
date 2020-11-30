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
import LoginPage from "./LoginPage";

let user = firebase.auth().currentUser;
let items = [];
let usuario, ultimoMensaje;
let db = firebase.firestore();
let chatsRef = db.collection("chats/");

var itm = [];

export default function MessagesScreen({ route }) { 
    let [items, setItems] = useState([]);

    useEffect(() => {
        chatsRef.get().then((snapshot) => {
            let items = [];
            snapshot.docs.forEach((doc) => {
                items.push({
                    ultimoMensaje: doc.data().text,
                });
            });
            itm = items;
            setItems(items = items);
        });
    });
    return(
        <SafeAreaView style={{ flex: 1 }}>
        {items.map((u, i) => {
            return(
                <View key={i}>
                    <ListItem bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title>Chat</ListItem.Title>
                    <ListItem.Subtitle>{u.ultimoMensaje}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
                </View>
            );
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
