import React, { Component, useState, setState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, CheckBox, Input, SocialIcon } from 'react-native-elements';
import * as FirebaseCore from 'expo-firebase-core';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as Location from 'expo-location';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/auth';
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
} from '@env';
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: `${GOOGLE_LOGIN_ANDROID_CLIENT_ID}`,
      iosClientId: `${GOOGLE_LOGIN_IOS_CLIENT_ID}`,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
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

async function logInWithFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: `${FACEBOOK_APP_ID}`,
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      alert('Ingresaste!', `Hola ${(await response.json()).name}!`);
    } else {
      alert(
        'Tienes que permitir el acceso a tu cuenta para que puedas iniciar sesión con Facebook.'
      );
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

const signInWithFacebook = () => {
  logInWithFacebook();
};

export default function RegisterPage({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  function registrarUsuarios(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            setIsLogged(true);
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
            navigation.navigate('OnboardingPageTab');
          } else {
            setIsLogged(false);
          }
        });

        Notifications.scheduleNotificationAsync({
          content: {
            title: '¡QuedeOficios! 📬',
            body: '¡Bienvenid@ a QuedeOficios!',
            data: { data: 'El equipo de ¡QuedeOficios!' },
          },
          trigger: { seconds: 3 },
        });
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
            height: '5%',
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/loginBackground.jpg')}
            style={{
              flex: 1,
              position: 'absolute',
              resizeMode: 'stretch',
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{ width: '80%', marginTop: 70, bottom: 0 }}
            keyboardShouldPersistTaps="handled"
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <Input
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                inputContainerStyle={{ marginTop: 100 }}
                style={{ color: '#ffffff', fontSize: 16 }}
                leftIcon={<Icon name="envelope-o" size={18} color="white" />}
                onChangeText={(email) => setUserEmail(email)}
                value={email}
              />
              <Input
                placeholder="Contraseña"
                inputContainerStyle={{}}
                leftIcon={<Icon name="lock" size={20} color="white" />}
                style={{ color: '#ffffff', fontSize: 16 }}
                secureTextEntry={true}
                onChangeText={(password) => setUserPassword(password)}
                value={password}
              />
              <Button
                title="Registrarme"
                onPress={() => registrarUsuarios(email, password)}
                buttonStyle={{
                  backgroundColor: 'orange',
                  borderRadius: 25,
                  width: '70%',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={{ marginTop: Platform.OS === 'android' ? 20 : 50 }}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
              Registrate con:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: Platform.OS === 'android' ? 20 : 30,
              bottom: 0,
            }}
          >
            <View>
              <SocialIcon
                button
                type="google"
                style={{ padding: 25 }}
                onPress={() => signInWithGoogle()}
              />
            </View>
            <View>
              <Text style={{ color: '#ffffff', marginTop: 25 }}>O</Text>
            </View>
            <View>
              <SocialIcon
                button
                type="facebook"
                style={{ padding: 30 }}
                onPress={() => signInWithFacebook()}
              />
            </View>
          </View>
          <View style={{ width: '70%', bottom: 50 }}>
            <TouchableHighlight
              onPress={() => RootNavigation.navigate('LoginPage')}
            >
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Ya tienes cuenta? INGRESA
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export var user;
