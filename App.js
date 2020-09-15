import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Card, Layout } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import env from "./env/environmentVariables.js";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as Location from "expo-location";
import CardsProfesionales from "./Components/CardsProfesionales.js";
import LoginWithEmail from "./Components/LoginWithEmail.js";
import RegisterWithEmail from "./Components/RegisterWithEmail.js";
import Dashboard from "./Components/Dashboard.js";

try {
    firebase.initializeApp({
        apiKey: env.apiKey,
        authDomain: env.authDomain,
        databaseURL: env.databaseURL,
        projectId: env.projectId,
        storageBucket: env.storageBucket,
        messagingSenderId: env.messagingSenderId,
        appId: env.appId,
        measurementId: env.measurementId,
    });
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error raised", err.stack);
    }
}

export const auth = firebase.auth();

const win = Dimensions.get("window");

const Stack = createStackNavigator();

const Routes = {
    Login: { screen: 'Login' },
    Registro: { screen: 'Registro' }
}

export class LocationClass {
    render() {
        const [location, setLocation] = useState(null);
        const [errorMsg, setErrorMsg] = useState(null);

        useEffect(() => {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
        });

        let locationText = "Waiting..";
        if (errorMsg) {
            locationText = errorMsg;
        } else if (location) {
            locationText = JSON.stringify(location);
        }
    }
}

function HomeScreen({ navigation }) {
    var countServicios = [0, 1, 2];
    var elements = [];
    for (var i = 0; i < countServicios.length; i++) {
        elements.push(<CardsProfesionales value={countServicios[i]} />);
    }
    return (
        <React.Fragment>
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Layout
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <ScrollView>
                        <Text>{LocationClass.locationText}</Text>
                        <Text style={{ fontSize: 24, marginTop: 25, marginBottom: 50 }}>
                            Servicios Cerca:
                        </Text>
                        {elements}
                    </ScrollView>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: "#F4743B",
                        width: "100%",
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <Text
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Ir a mi perfil
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                </Layout>
            </ApplicationProvider>
        </React.Fragment>
    );
}

function LoginScreen({ navigation }) {
    // Login con Google

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: env.androidClientId,
                iosClientId: env.iosClientId,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    const signInWithGoogle = () => {
        signInWithGoogleAsync();
    };

    // Login con Facebook

    async function facebookLogIn() {
        try {
            await Facebook.initializeAsync(env.facebookAppIdData);
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            });
            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                );
                Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
                source={require("./assets/gradients/20x20.png")}
                style={{
                    flex: 1,
                    position: "absolute",
                    resizeMode: "stretch",
                    alignSelf: "stretch",
                    width: win.width,
                    height: win.height,
                }}
            />
            <Image
                source={require("./assets/icon.png")}
                style={{
                    width: 250,
                    height: 250,
                    marginTop: 25,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />
            <TouchableOpacity
                onPress={() => signInWithGoogle()}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 50,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    Iniciar sesión con Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => facebookLogIn()}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    Iniciar sesión con Facebook
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("LoginWithEmail")}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    Iniciar sesión con email
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Registro")}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>Registrarme</Text>
            </TouchableOpacity>
        </View>
    );
}

function LoginWithEmailScreen({ navigation }) {
    return <LoginWithEmail />;
}

function RegistroScreen({ navigation }) {
    // Login con Google

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: env.androidClientId,
                iosClientId: env.iosClientId,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    const signInWithGoogle = () => {
        signInWithGoogleAsync();
    };

    // Login con Facebook

    async function facebookLogIn() {
        try {
            await Facebook.initializeAsync(env.facebookAppIdData);
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            });
            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                );
                Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
                source={require("./assets/gradients/20x20.png")}
                style={{
                    flex: 1,
                    position: "absolute",
                    resizeMode: "stretch",
                    alignSelf: "stretch",
                    width: win.width,
                    height: win.height,
                }}
            />
            <Image
                source={require("./assets/icon.png")}
                style={{
                    width: 250,
                    height: 250,
                    marginTop: 25,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />
            <TouchableOpacity
                onPress={() => signInWithGoogle()}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 50,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    Registarme con Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => facebookLogIn()}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    Registrarme con Facebook
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('RegistroEmail')}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}

            >
                <Text style={{ color: "#fff", fontSize: 16 }}>Registrarme con mi email</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                    backgroundColor: "#F4743B",
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    marginTop: 25,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

function RegistroEmailScreen({ navigation }) {
    return(
        <RegisterWithEmail />
    );
}

function DashboardScreen({ navigation }) {
    return(
        <Dashboard />
    );
}

export function ScreenStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}

            />
            <Stack.Screen
                name="LoginWithEmail"
                component={LoginWithEmailScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}

            />
            <Stack.Screen
                name="Registro"
                component={RegistroScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}

            />
            <Stack.Screen
                name="RegistroEmail"
                component={RegistroEmailScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}

            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: "QueDeOficios!", headerStyle: {
                    backgroundColor: '#f4511e',
                },     headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    } }}
            />
        </Stack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <ScreenStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;

registerRootComponent(App);
