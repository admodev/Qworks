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
import { Button, Card, Icon, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardsUsuarios from "./Cards";
import Botonera from "./BotoneraAnuncios";

export default class AnunciosPage extends React.Component {
    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
            <Image
            source={require("../assets/gradients/20x20.png")}
            style={{
                flex: 1,
                    position: "absolute",
                    resizeMode: "cover",
                    width: "100%",
                    height: "3%",
            }}
            />
            <View style={{ width: 30, height: 30, alignItems: "center", left: 5, marginTop: 15 }}>
            <MaterialCommunityIcons
            name="arrow-left-bold"
            color={"black"}
            size={32}
            style={{ marginTop: "auto", marginBottom: "auto" }}
            />
            </View>
            <ScrollView>
            <CardsUsuarios />
            </ScrollView>
            <SafeAreaView style={{ position: "absolute", alignItems: "center", justifyContent: "flex-end", bottom: 0, marginLeft: "auto", marginRight: "auto" }}>
            <Botonera />
            </SafeAreaView>
            </SafeAreaView>
        );
    }
}
