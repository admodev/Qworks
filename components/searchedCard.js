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
import { Avatar, Button, Card, Icon, Input } from "react-native-elements";
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
    /*firebase.auth().onAuthStateChanged(function (user) {*/
      //if (user) {
        //var email = user.email;
        //var uid = user.uid;
        //var providerData = user.providerData;
      //} else {
        //user == null;
      //}
    /*});*/
  }

  render() {
    return (
      <SafeAreaView
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              margin: 25,
              marginTop: "5%",
              backgroundColor: "transparent",
            },
            ios: {
              flex: 1,
              margin: 25,
              marginTop: "20%",
              backgroundColor: "transparent",
            },
          }),
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator="false"
          style={{ marginTop: "20%" }}
        >
          <Card
            style={styles.card}
            containerStyle={{
              ...Platform.select({
                android: {
                  padding: 0,
                  borderRadius: 15,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  marginTop: "20%",
                  elevation: 0,
                },
                ios: {
                  padding: 0,
                  borderRadius: 15,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  marginTop: "40%",
                  elevation: 0,
                },
              }),
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
            <View style={{ margin: 20, backgroundColor: "transparent" }}>
              {image == null ? (
                <View style={{ flexDirection: "row" }}>
                  {
                    /*<Card.Image*/
                    //source={require("../assets/icon.png")}
                    //style={{
                    //...Platform.select({
                    //android: {
                    //marginTop: "10%",
                    //marginBottom: "10%",
                    //marginLeft: "10%",
                    //marginRight: "10%",
                    //width: 100,
                    //height: 100,
                    //borderRadius: 100,
                    //},
                    //ios: {
                    //borderRadius: 100,
                    //alignItems: "center",
                    //width: 90,
                    //height: 90,
                    //marginTop: "10%",
                    //marginLeft: "10%",
                    //},
                    //}),
                    //}}
                    /*/>*/
                  }
                  <Avatar
                    size="large"
                    rounded
                    source={require("../assets/icon.png")}
                    containerStyle={{
                      marginTop: "10%",
                      marginLeft: "10%",
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                    }}
                    avatarStyle={{
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                    }}
                  />
                  <View
                    style={{
                      ...Platform.select({
                        android: {
                          flexDirection: "column",
                          maxWidth: "80%",
                        },
                        ios: {
                          flexDirection: "column",
                          maxWidth: "80%",
                          marginLeft: "12%",
                        },
                      }),
                    }}
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
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                            fontSize: 20,
                            color: "#fff",
                            marginTop: "10%",
                          },
                        }),
                      }}
                    >
                      {this.props.nombre}
                    </Text>
                    <Text
                      style={{
                        ...Platform.select({
                          android: {
                            marginTop: "2%",
                            textAlign: "center",
                            fontSize: 18,
                            color: "#fff",
                          },
                          ios: {
                            marginTop: "2%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                            fontSize: 18,
                            color: "#fff",
                          },
                        }),
                      }}
                    >
                      {this.props.actividad}
                    </Text>
                    <View
                      style={{
                        ...Platform.select({
                          android: {
                            flexDirection: "column",
                            maxWidth: "90%",
                          },
                          ios: {
                            flexDirection: "column",
                            maxWidth: "90%",
                          },
                        }),
                      }}
                    >
                      <Text
                        style={{
                          ...Platform.select({
                            android: {
                              marginTop: "10%",
                              marginLeft: "8%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                            ios: {
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "10%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                          }),
                        }}
                      >
                        {this.props.localidad}
                      </Text>
                      <Text
                        style={{
                          ...Platform.select({
                            android: {
                              marginTop: "2%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                            ios: {
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "2%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                          }),
                        }}
                      >
                        {this.props.provincia}
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
                  <View
                    style={{
                      ...Platform.select({
                        android: {
                          flexDirection: "column",
                          maxWidth: "80%",
                        },
                        ios: {
                          flexDirection: "column",
                          maxWidth: "80%",
                          left: "30%",
                        },
                      }),
                    }}
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
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                            fontSize: 20,
                            color: "#fff",
                            marginTop: "10%",
                          },
                        }),
                      }}
                    >
                      {this.props.nombre}
                    </Text>
                    <Text
                      style={{
                        ...Platform.select({
                          android: {
                            marginTop: "2%",
                            textAlign: "center",
                            fontSize: 18,
                            color: "#fff",
                          },
                          ios: {
                            marginTop: "2%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                            fontSize: 18,
                            color: "#fff",
                          },
                        }),
                      }}
                    >
                      {this.props.actividad}
                    </Text>
                    <View
                      style={{
                        ...Platform.select({
                          android: {
                            flexDirection: "column",
                            maxWidth: "90%",
                          },
                          ios: {
                            flexDirection: "column",
                            maxWidth: "90%",
                            left: "30%",
                          },
                        }),
                      }}
                    >
                      <Text
                        style={{
                          ...Platform.select({
                            android: {
                              marginTop: "10%",
                              marginLeft: "8%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                            ios: {
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "10%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                          }),
                        }}
                      >
                        {this.props.localidad}
                      </Text>
                      <Text
                        style={{
                          ...Platform.select({
                            android: {
                              marginTop: "2%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                            ios: {
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "2%",
                              textAlign: "center",
                              fontSize: 16,
                              color: "#fff",
                            },
                          }),
                        }}
                      >
                        {this.props.provincia}
                      </Text>
                    </View>
                  </View>
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
                  marginTop: "3%",
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
        </ScrollView>
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
