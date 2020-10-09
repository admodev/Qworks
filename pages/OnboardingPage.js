import * as React from "react";
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
import { AntDesign } from "@expo/vector-icons";

const OnboardingPage = ({ navigation }) => {
    let state = {
        shows: [],
        isLoading: true,
        search: false,
        title: '',
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "beige" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ position: "relative", marginTop: 103 }}
            >
                <Card containerStyle={styles.primeraCard}>
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
                        onPress={() => navigation.navigate("ChatPage")}
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
                <Card containerStyle={styles.card}>
                    <Card.Image
                        source={{
                            uri:
                            "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk",
                        }}
                        style={{ borderRadius: 50, margin: 30 }}
                    />
                    <Text
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: 10,
                            fontSize: 20,
                            color: "#fff",
                        }}
                    >
                        Luciana Gomez
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
                        Diseñadora Gráfica
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProfilePage")}
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
                <Card containerStyle={styles.card}>
                    <Card.Image
                        source={{
                            uri:
                            "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
                        }}
                        style={{ borderRadius: 50, margin: 30 }}
                    />
                    <Text
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: 10,
                            fontSize: 20,
                            color: "#fff",
                        }}
                    >
                        Martín Alvaro
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
                        Decoración de Interiores
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EmailLoginPage")}
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
            </ScrollView>
            <View
                style={{
                    flex: 1,
                    position: "absolute",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: 25,
                    marginLeft: 5,
                    width: "95%",
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: "row", marginTop: 30 }}
                >
                    <Input
                        placeholder="Buscar en  ¡QuedeOficios!"
                        leftIcon={
                            <Image
                                source={require("../assets/icon.png")}
                                style={{
                                    width: 35,
                                    height: 35,
                                }}
                            />
                        }
                        inputStyle={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    primeraCard: {
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
    card: {
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

export default OnboardingPage;
