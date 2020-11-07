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
import { StackActions } from "@react-navigation/native";
import CardsUsuarios from "./Cards";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Botonera() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 10,
        }}
      >
        <Image
          source={require("../assets/gradients/20x20.png")}
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            width: 320,
            height: 55,
            margin: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ margin: 10, marginLeft: 20 }}>
          <Button
            title="Recomendar"
            titleStyle={{ fontSize: 12, marginBottom: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <MaterialCommunityIcons
            name="account-group"
            color={"white"}
            size={22}
            style={{ position: "absolute", marginLeft: 40, marginTop: 22 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Enviar Mensaje"
            onPress={() =>
              RootNavigation.navigate("ChatComponent", {
                userOne: firebase.auth().currentUser.uid,
                userTwo: routeParamsToString,
              })
            }
            titleStyle={{ fontSize: 12, marginTop: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              position: "absolute",
              marginTop: -45,
              marginLeft: 30,
            }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Comentar"
            titleStyle={{ fontSize: 12, marginTop: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <MaterialCommunityIcons
            name="comment-multiple-outline"
            color={"white"}
            size={18}
            style={{ position: "absolute", marginLeft: 50, marginTop: 4 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
