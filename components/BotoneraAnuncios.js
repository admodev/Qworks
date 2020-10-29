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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Botonera() {
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
        <View>
        <Button
        title="Recomendar"
        titleStyle={{ fontSize: 12, marginBottom: 15 }}
        buttonStyle={{ width: 100, height: 45 }}
        />
        <MaterialCommunityIcons
        name="heart"
        color={"red"}
        size={22}
        style={{ position: "absolute", marginLeft: 40, marginTop: 24 }}
        />
        </View>
        <View>
        <Button
        title="Enviar Mensaje"
        titleStyle={{ fontSize: 12, marginTop: 10 }}
        buttonStyle={{ width: 100, height: 45 }}
        />
        <Image
        source={require("../assets/icon.png")}
        style={{
            width: 50,
                height: 50,
                borderRadius: 100,
                position: "absolute",
                marginTop: -30,
                marginLeft: 25
        }}
        />
        </View>
        <View>
        <Button
        title="Comentar"
        titleStyle={{ fontSize: 12, marginTop: 15 }}
        buttonStyle={{ width: 100, height: 45 }}
        />
        <MaterialCommunityIcons
        name="comment-multiple-outline"
        color={"white"}
        size={18}
        style={{ position: "absolute", marginLeft: 40, marginTop: 2 }}
        />
        </View>
        </View>
        </SafeAreaView>
    );
}
