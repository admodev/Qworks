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

var itm = [];

class MisRecomendadosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      search: "",
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByKey()
      .once("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            refKey: child.val().key,
            ratedUser: child.val().ratedUser,
            rating: child.val().rating,
          });
        });
      });

    console.log(itm);
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.items.map((u, i) => {
          <View
            key={i}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ marginTop: "30%" }}>{u.ratedUser}</Text>
            <Text style={{ marginTop: "30%" }}>{u.rating}</Text>
          </View>;
        })}
      </ScrollView>
    );
  }
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

export default MisRecomendadosPage;
