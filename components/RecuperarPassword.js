import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import 'firebase/auth';
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";

export default function RecuperarPasswordScreen() {
    let [email, setEmail] = useState("");

    function passwordRecovery(email) {
        if (email == null || email == '') {
            alert("Por favor ingresa tu email para enviarte el enlace de recuperación.");
        } else {
            firebase.auth().sendPasswordResetEmail(email).then(function() {
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: "QuedeOficios!",
                        body: "Revisa tu correo para cambiar tu contraseña!",
                        data: { data: "Enviamos las instrucciones por mail." },
                    },
                    trigger: null,
                });
            }).finally(function() {
                Updates.reloadAsync();
            });
        }
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
        <Image
        source={require("../assets/gradients/20x20.png")}
        style={{
            flex: 1,
                position: "absolute",
                resizeMode: "cover",
                width: "100%",
                height: "5%",
        }}
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", bottom: "10%", marginLeft: "10%", marginRight: "10%" }}>
        <Text style={{ fontSize: 20, textAlign: "justify" }}>Por favor ingresa tu email y a continuación presiona cambiar contraseña para continuar.</Text>
        <Input
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        inputContainerStyle={{ marginTop: 100 }}
        style={{ color: "#000000", fontSize: 16 }}
        leftIcon={<Icon name="envelope-o" size={18} color="black" />}
        onChangeText={(email) => setEmail(email)}
        value={email}
        />
        <Button
        title="Cambiar contraseña"
        onPress={() => passwordRecovery(email)}
        buttonStyle={{
            backgroundColor: "orange",
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 10,
                padding: 10,
        }}
        titleStyle={{
            fontWeight: "bold",
        }}
        />
        </View>
        </SafeAreaView>
    );
}
