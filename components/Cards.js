import React from 'react';
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
import * as RootNavigation from '../RootNavigation.js';

class CardsUsuarios extends React.Component {
    render() {
        return (
            <Card containerStyle={styles.card}>
                <Image
                    source={require("../assets/patron.jpg")}
                    style={{
                        flex: 1,
                        position: "absolute",
                        resizeMode: "cover",
                        width: "100%",
                        height: "100%",
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
                    }}
                />
                <Card.Image
                    source={{
                        uri:
                        "https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ",
                    }}
                    style={{
                        borderRadius: 50,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 60,
                        marginRight: 60,
                    }}
                />
                <Text
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontSize: 20,
                        color: "#fff",
                    }}
                >
                    Alejandro Rodriguez
                </Text>
                <Text
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 10,
                        fontSize: 20,
                        color: "#fff",
                    }}
                >
                    Redactor
                </Text>
                <TouchableOpacity
                    onPress={() => RootNavigation.navigate('ChatPage')}
                    style={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        backgroundColor: "transparent",
                    }}
                >
                    <Text
                        style={{ color: "#fff", marginLeft: "auto", marginRight: "auto" }}
                    >
                        Contratar
                    </Text>
                </TouchableOpacity>
            </Card>
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
