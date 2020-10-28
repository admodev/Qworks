import "react-native-gesture-handler";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as React from "react";
import { AppRegistry, View } from "react-native";
import MainStackNavigator from "./navigation/AppNavigator.js";
import { Badge } from "react-native-elements";
import { navigationRef } from "./RootNavigation";
import * as Chat from "./components/ChatComponent";
import AuthStateHook from "./hooks/HookEstadoDeAuth";
import * as Location from 'expo-location';
import * as firebase from "firebase";
import "firebase/auth";
import {
    GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    GOOGLE_LOGIN_IOS_CLIENT_ID,
    FACEBOOK_APP_ID,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from "@env";

if (!firebase.apps.length) {
   firebase.initializeApp({
            apiKey: `${FIREBASE_API_KEY}`,
            authDomain: `${FIREBASE_AUTH_DOMAIN}`,
            databaseURL: `${FIREBASE_DATABASE_URL}`,
            projectId: `${FIREBASE_PROJECT_ID}`,
            storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
            messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
            appId: `${FIREBASE_APP_ID}`,
            measurementId: `${FIREBASE_MEASUREMENT_ID}`,
        });
}

if (firebase.apps.length === 0) {
    try {
        firebase.initializeApp({
            apiKey: `${FIREBASE_API_KEY}`,
            authDomain: `${FIREBASE_AUTH_DOMAIN}`,
            databaseURL: `${FIREBASE_DATABASE_URL}`,
            projectId: `${FIREBASE_PROJECT_ID}`,
            storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
            messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
            appId: `${FIREBASE_APP_ID}`,
            measurementId: `${FIREBASE_MEASUREMENT_ID}`,
        });
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            console.error("Firebase initialization error raised", err.stack);
        }
    }
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Por favor permita el acceso a la ubicacion para acceder al funcionamiento completo de la app.');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Cargando...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    if (Chat.messages) {
        async () => {
            await schedulePushNotification();
        }
    }
    return(
        <MainStackNavigator />
    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "QuedeOficios!",
            body: 'Tienes nuevas notificaciones!',
            data: { data: 'Mensajes no leídos.' },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

