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
import CardsUsuarios from "./Cards";

export default function Botonera() {
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 0 }}>
        <Button
        title="Recomendar"
        type="outline"
        />
        <Button
        title="Enviar Mensaje"
        titleStyle={{ fontSize: 12, marginTop: 10 }}
        buttonStyle={{ width: 150, height: 42 }}
        />
        <Button
        title="Comentar"
        type="outline"
        />
        </View>
        <View style={{ position: "absolute" }}>
        <Image
        source={require("../assets/icon.png")}
        style={{
            width: 50,
                height: 50,
                borderRadius: 100,
                position: "absolute",
                marginTop: -30,
                marginLeft: 165
        }}
        />
        </View>
        </SafeAreaView>
    );
}
