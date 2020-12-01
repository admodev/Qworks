import React, { useState, setState } from "react";
import {
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    ScrollView,
    SafeAreaView,
    Text,
    Platform,
} from "react-native";
import { Avatar, Button, Card, Icon, Input } from "react-native-elements";
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
            ready: false,
            where: { lat: null, lng: null },
            error: null,
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
                        latitud: child.val().latitud,
                        longitud: child.val().longitud,
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

        this.setState({ready:false, error: null })

        let geoOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60 * 60 * 24,
        }

        navigator.geolocation.getCurrentPosition( this.geoSuccess,
                                                  this.geoFailure,
                                                       geoOptions);
    }

    geoSuccess = (position) => {
        console.log(position);
        this.setState({
            ready:true,
            where: {lat: position.coords.latitude, lng: position.coords.longitude}
        });
    }

    geoFailure = (error) => {
        this.setState({error: err.message});
    }

    filterList(items) {
        return items.filter(
            (itm) =>
                itm.localidad
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                itm.provincia
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
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

        const returnCloseUsers = (latitud, longitud) => {
            let sumaLatLong = this.state.where.lat + this.state.where.lng;
            let latitudMasLongitud = latitud + longitud;

            for(i = latitudMasLongitud; i < sumaLatLong; i++) {
                console.log(i);
            }
        }
        return (
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
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
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
                            placeholder="Buscar por localidad/provincia"
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
                            placeholder="Buscar por localidad/provincia"
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
                            id={itm.idAnuncio}
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
                        {!this.state.ready && (
                            <View style={{ padding: 10, marginTop: "20%" }}>
                              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>Cargando...</Text>
                              <ActivityIndicator size="large" color="orange" />
                            </View>
                        )}
                        {this.state.error && (
                            <Text>{this.state.error}</Text>
                        )}
                        {this.state.ready && (
                            <View>
                              <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Usuarios Cercanos:</Text>
                              <ScrollView showsVerticalScrollIndicator="false">
                                <Card
              style={styles.card}
              containerStyle={{
                ...Platform.select({
                  android: {
                    padding: 0,
                    borderRadius: 15,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    marginTop: "2%",
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
                                  return(
                                      <View key={i} style={{ flexDirection: "row" }}>
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
                    {image == null || image == undefined ? (
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
                    ) : (
                      <Avatar
                          size="large"
                          rounded
                          source={{ uri: u.image }}
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
                    )}
                    <View style={{ flexDirection: "column" }}>
                      <View style={{
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
                              {u.nombre}
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
                              {u.actividad}
                            </Text>
                          </View>
                          <View style={{
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
                              {u.localidad}
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
                              {u.provincia}
                            </Text>
                          </View>
                    </View>
                                      </View>
                                  );
                              })}
                            </Card>
                              </ScrollView>
                            </View>
                        )}
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
