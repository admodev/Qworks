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
import SearchedCardResult from "../components/searchedCard";

var itm = [];

class SearchPage extends React.Component {
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
        itm.nombre.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.apellido.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.actividad.toLowerCase().includes(this.state.search.toLowerCase())
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
        <TouchableOpacity onPress={openControlPanel}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 20,
              marginLeft: 25,
              width: "80%",
            }}
          >
            <Image
              source={require("../assets/icon.png")}
              style={{
                width: 35,
                height: 35,
                marginTop: -15,
                marginLeft: 10,
              }}
            />
            <Input
              placeholder="Buscar en  ¡QuedeOficios!"
              inputStyle={{
                justifyContent: "center",
                marginLeft: 25,
                marginTop: -10,
              }}
              containerStyle={{ marginLeft: 10, marginTop: -10 }}
              autoFocus={true}
              onChangeText={(search) => this.setState({ search })}
            />
          </View>
        </TouchableOpacity>
        {this.state.search ? (
          this.filterList(this.state.items).map((itm, index) => (
            <SearchedCardResult
              key={index}
              nombre={itm.nombre}
              apellido={itm.apellido}
              actividad={itm.actividad}
            />
          ))
        ) : (
          <Card
            style={styles.card}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              backgroundColor: "transparent",
              borderWidth: 0,
              marginTop: 50,
            }}
          >
            {this.state.items.map((u, i) => {
              let storage = firebase.storage();
              let storageRef = storage.ref();
              let defaultImageRef = storageRef
                .child("defaultUserImage/icon.png")
                .toString();
              let userProfilePic = storageRef
                .child("userProfilePics/")
                .child(u.idAnuncio).child;
              return (
                <View
                  key={i}
                  style={{ margin: 25, backgroundColor: "transparent" }}
                >
                  <Image
                    source={require("../assets/patron.jpg")}
                    style={{
                      flex: 1,
                      position: "absolute",
                      resizeMode: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                    }}
                  />
                  <Image
                    source={require("../assets/gradients/20x20.png")}
                    style={{
                      flex: 1,
                      position: "absolute",
                      resizeMode: "cover",
                      width: "100%",
                      height: "100%",
                      opacity: 0.9,
                      borderRadius: 10,
                    }}
                  />
                  {u.image == null ? (
                    <Card.Image
                      source={require("../assets/icon.png")}
                      style={{
                        borderRadius: 100,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 60,
                        marginRight: 60,
                      }}
                    />
                  ) : (
                    <Card.Image
                      source={{ uri: image }}
                      style={{
                        borderRadius: 100,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 60,
                        marginRight: 60,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {u.nombre} {u.apellido}
                  </Text>
                  <Text
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: 10,
                      textAlign: "center",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {u.actividad}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      RootNavigation.navigate("AnuncioSeleccionado", {
                        id: u.idAnuncio,
                      });
                    }}
                    style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontSize: 16,
                        marginBottom: 10,
                      }}
                    >
                      Previsualizar
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Card>
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

export default SearchPage;
