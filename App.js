import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { Platform } from 'react-native';
import MainStackNavigator from './navigation/AppNavigator.js';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Location from 'expo-location';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
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
  DOTLOCATION,
} from '@env';
import { StatusBar } from 'expo-status-bar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/allReducers';

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
      console.error('Firebase initialization error raised', err.stack);
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

const store = createStore(allReducers);

export default function App() {
  let [isReady, setIsReady] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    let user = firebase.auth().currentUser;
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg(
          'Por favor permita el acceso a la ubicacion para acceder al funcionamiento completo de la app.'
        );
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync()}
        onFinish={() => setIsReady({ isReady: true })}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainStackNavigator />
      <StatusBar style='light' />
    </Provider>
  );
}

async function cacheResourcesAsync() {
  const images = [require('./assets/ScreenSplash-02.png')];

  const cacheImages = images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
  return Promise.all(cacheImages);
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'QuedeOficios!',
      body: 'Tienes nuevas notificaciones!',
      data: { data: 'Mensajes no leídos.' },
    },
    trigger: { seconds: 3 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
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
