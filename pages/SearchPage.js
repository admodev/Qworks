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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import SearchedCardResult from "../components/searchedCard";

var itm = [];
let image;

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
        {Platform.OS === "ios" ? (
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
                autoFocus={true}
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                onChangeText={(search) => this.setState({ search })}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openControlPanel}>
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
                autoFocus={true}
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                onChangeText={(search) => this.setState({ search })}
              />
            </View>
          </TouchableOpacity>
        )}
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
              ...Platform.select({
                android: {
                  padding: 0,
                  borderRadius: 15,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  marginTop: "5%",
                  elevation: 0,
                },
                ios: {
                  padding: 0,
                  borderRadius: 15,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  marginTop: "10%",
                  elevation: 0,
                },
              }),
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
                  {image == null ? (
                    <View style={{ flexDirection: "row" }}>
                      <Card.Image
                        source={require("../assets/icon.png")}
                        style={{
                          ...Platform.select({
                            android: {
                              marginTop: "10%",
                              marginBottom: "10%",
                              marginLeft: "10%",
                              marginRight: "10%",
                              width: 100,
                              height: 100,
                              borderRadius: 100,
                            },
                            ios: {
                              borderRadius: 100,
                              alignItems: "center",
                              width: 90,
                              height: 90,
                              marginTop: "10%",
                              marginLeft: "10%",
                            },
                          }),
                        }}
                      />
                      <View
                        style={{ flexDirection: "column", maxWidth: "80%" }}
                      >
                        <Text
                          style={{
                            ...Platform.select({
                              android: {
                                marginLeft: "auto",
                                marginRight: "auto",
                                textAlign: "center",
                                fontSize: 20,
                                color: "#fff",
                                marginTop: "10%",
                              },
                              ios: {
                                marginTop: "35%",
                                marginLeft: "12%",
                                textAlign: "center",
                                fontSize: 18,
                                color: "#fff",
                              },
                            }),
                          }}
                        >
                          {u.nombre}
                        </Text>
                        <Text
                          style={{
                            marginTop: "2%",
                            textAlign: "center",
                            fontSize: 18,
                            color: "#fff",
                          }}
                        >
                          {u.actividad}
                        </Text>
                        <View
                          style={{ flexDirection: "column", maxWidth: "90%" }}
                        >
                          <Text
                            style={{
                              marginTop: "10%",
                              marginLeft: "8%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            }}
                          >
                            {u.localidad}
                          </Text>
                          <Text
                            style={{
                              marginTop: "2%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            }}
                          >
                            {u.provincia}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Card.Image
                        source={{ uri: image }}
                        style={{
                          ...Platform.select({
                            android: {
                              borderRadius: 100,
                              marginTop: 10,
                              marginBottom: 20,
                              marginLeft: 60,
                              marginRight: 60,
                            },
                            ios: {
                              borderRadius: 100,
                              marginTop: 10,
                              marginBottom: 20,
                              marginLeft: 60,
                              marginRight: 60,
                            },
                          }),
                        }}
                      />
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
                    </View>
                  )}
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
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "orange",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="email"
                          color={"orange"}
                          size={20}
                        />
                        Contactar
                      </Text>
                    </View>
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
