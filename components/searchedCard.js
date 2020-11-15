import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";

let image;
let idAnuncio;

export default class searchedCardResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      idAnuncio: "",
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("anuncios/")
      .orderByKey()
      .on("value", (snap) => {
        snap.forEach((child) => {
          image = child.val().image;
          idAnuncio = child.val().id;
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

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          margin: 25,
          marginTop: "8%",
          backgroundColor: "transparent",
        }}
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
        <Card
          style={styles.card}
          containerStyle={{
            padding: 0,
            borderRadius: 15,
            backgroundColor: "transparent",
            borderWidth: 0,
            marginTop: "2%",
            elevation: 0,
          }}
        >
          <View style={{ margin: 25, backgroundColor: "transparent" }}>
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
                <View style={{ flexDirection: "column", maxWidth: "80%" }}>
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
                    {this.props.nombre}
                  </Text>
                  <Text
                    style={{
                      marginTop: "2%",
                      textAlign: "center",
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    {this.props.actividad}
                  </Text>
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
                  {this.props.actividad}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                RootNavigation.navigate("AnuncioSeleccionado", {
                  id: idAnuncio,
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
        </Card>
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
