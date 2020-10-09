import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const ProfilePage = () => {
    let user = true;
    if (user) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Image
                    source={require("../assets/gradients/20x20.png")}
                    style={{
                        flex: 1,
                        position: "absolute",
                        resizeMode: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                />
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", top: 50, marginLeft: 25 }}>
                    <Image source={require("../assets/icon.png")}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={{ color: "#fff", fontSize: 14, marginLeft: 20 }}>Nombre</Text>
                    <Text style={{ color: "#fff", fontSize: 14, marginLeft: 20 }}>Correo Electrónico</Text>
                    </View>
                    <Button
                        title="Anunciarte"
                        buttonStyle={{
                            backgroundColor: "orange",
                            marginRight: 15,
                            borderRadius: 5,
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    } else {
        () => navigation.navigate('LoginPage');
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
});

export default ProfilePage;
