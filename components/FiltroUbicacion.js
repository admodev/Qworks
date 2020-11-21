import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import SearchedCardResult from "./searchedCard";

var itm = [];
let image;

class UbicacionPage extends React.Component {
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
      .ref("anuncios/")
      .orderByKey()
      .on("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            image: child.val().image,
            nombre: child.val().nombre,
            apellido: child.val().apellido,
            actividad: child.val().actividad,
            emailPersonal: child.val().emailPersonal,
            idAnuncio: child.val().id,
            localidad: child.val().localidad,
            provincia: child.val().provincia,
          });
        });
        itm = items;
        this.setState({ items: items });
        console.log(itm);
        console.log("itemstate " + this.state.items);
        itm.forEach((itms) => {
          console.log("title*" + itms.title);
        });
      });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        user == null;
      }
    });
  }
  filterList(items) {
    return items.filter(
      (itm) =>
        itm.localidad.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.provincia.toLowerCase().includes(this.state.search.toLowerCase())
    );
  }

  render() {
    const closeControlPanel = () => {
      _drawer.close();
    };
    const openControlPanel = () => {
      _drawer.open();
    };
    var user = firebase.auth().currentUser;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS === "ios" ? (
          <View
            style={{
              flex: 1,
              position: "absolute",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 20,
              marginLeft: 25,
              width: "80%",
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={"black"}
                size={24}
                style={{
                  marginTop: "8%",
                  marginLeft: "5%",
                }}
              />
            </TouchableOpacity>
            <Input
              placeholder="Buscar..."
              inputStyle={{
                justifyContent: "center",
                marginLeft: 25,
                marginTop: "30%",
              }}
              containerStyle={{ marginLeft: 10, marginTop: -10 }}
              onChangeText={(search) => this.setState({ search })}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              marginTop: "10%",
              marginLeft: "8%",
              width: "80%",
            }}
          >
            <Input
              placeholder="Buscar..."
              inputStyle={{
                justifyContent: "center",
                marginLeft: 25,
                marginTop: -10,
              }}
              containerStyle={{ marginLeft: 10, marginTop: -10 }}
              onChangeText={(search) => this.setState({ search })}
            />
          </View>
        )}
        {this.state.search ? (
          this.filterList(this.state.items).map((itm, index) => (
            <SearchedCardResult
              key={index}
              nombre={itm.nombre}
              apellido={itm.apellido}
              actividad={itm.actividad}
              localidad={itm.localidad}
              provincia={itm.provincia}
            />
          ))
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50%",
            }}
          >
            <Text>Ingresa una localidad/provincia</Text>
          </View>
        )}
      </SafeAreaView>
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

export default UbicacionPage;
