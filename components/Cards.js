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
import { AirbnbRating, Avatar, Button, Card, Icon, Input } from "react-native-elements";
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

class CardsUsuarios extends React.Component {
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
            itm.actividad.toLowerCase().includes(this.state.search.toLowerCase()) ||
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

        const naranjaQueDeOficios = '#fd5d13';
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
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                placeholderTextColor="#000000"
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
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                placeholderTextColor="#000000"
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
                            width: "85%",
                            height: 356,
                            alignSelf: "center"
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
                        style={{
                            ...Platform.select({
                                android: {
                                    margin: 20,
                                    backgroundColor: "transparent",
                                },
                                ios: {
                                    margin: 20,
                                    marginTop: "8%",
                                    backgroundColor: "transparent",
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
                        {image == null ? (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Card.Image
                            source={require("../assets/icon.png")}
                            style={{
                                ...Platform.select({
                                    android: {
                                        borderRadius: 25,
                                        marginTop: "8%",
                                        marginBottom: "10%",
                                        width: 140,
                                        height: 120
                                    },
                                    ios: {
                                        borderRadius: 25,
                                        marginTop: "8%",
                                        marginBottom: "10%",
                                        width: 120,
                                        height: 90
                                    },
                                }),
                            }}
                            />
                            </View>
                        ) : (
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
                        )}
                        <View style={{ marginTop: "-8%" }}>
                        <AirbnbRating
                        size={18}
                        showRating={true}
                        reviews={[""]}
                        type="star"
                        onFinishRating={(rating) => setRating(rating)}
                        />
                        </View>
                        <View style={{ margin: "3%" }}>
                        <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 30, fontWeight: "bold" }}>Steve Jobs</Text>
                        </View>
                        <View style={{ marginTop: "-2%"}}>
                           <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 24 }}>{u.actividad}</Text>
                        </View>
                        <View style={{ marginTop: "5%" }}>
                         <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 16 }}>{u.localidad} - {u.provincia}</Text>
                        </View>
                        <TouchableOpacity
                        onPress={() => {
                            RootNavigation.navigate("AnuncioSeleccionado", {
                                id: u.idAnuncio,
                            });
                        }}
                        style={{
                            borderRadius: 25,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                marginTop: "3%",
                                backgroundColor: "transparent",
                                borderWidth: 2,
                                borderColor: "#ffffff"
                        }}
                        >
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginTop: "5%" }}>
                        <View style={{ marginLeft: "30%", marginBottom: "8%" }}>
                            <MaterialCommunityIcons
                                name="eye"
                                color={naranjaQueDeOficios}
                                size={20}
                            />
                        </View>
                        <Text
                        style={{
                            color: naranjaQueDeOficios,
                                marginLeft: "auto",
                                marginRight: "auto",
                                fontSize: 16,
                                marginLeft: "3%",
                                marginBottom: "8%"
                        }}
                        >
                        ¡Conoceme!
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

export default CardsUsuarios;
