// @refresh reset
//
import React, { useState, setState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import * as Updates from 'expo-updates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

export default function ComentarScreen({ route, navigation }) {
  let id = route.params.id;
  let user = firebase.auth().currentUser.uid;
  let [comentario, setComentario] = useState('');
  let nombreDeReceptor;

  firebase
    .database()
    .ref('anuncios/')
    .orderByChild('id')
    .equalTo(id)
    .once('value', function (snapshot) {
      nombreDeReceptor = snapshot.val().nombre;
    });

  function comentarUsuario() {
    var emisorID = firebase.auth().currentUser.uid;
    var emisor = firebase.auth().currentUser.email;
    var receptor = id;

    if (!comentario) {
      alert('Por favor, escribe un comentario...');
    } else {
      firebase
        .database()
        .ref('comentarios/')
        .push()
        .set({
          emisorID: emisorID,
          emisorEmail: emisor,
          receptor: receptor,
          comentario: comentario,
        })
        .then(() => {
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Qworks! 📬',
              body: 'Gracias por comentar 🙋‍♀️🙋‍♂️',
              data: { data: 'El equipo de Qworks!' },
              ios: { sound: true },
              sound: true,
            },
            trigger: { seconds: 2 },
          });
          navigation.navigate('AnuncioSeleccionado', {
            id: id,
          });
        });
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          flex: 1,
          position: 'absolute',
          resizeMode: 'cover',
          width: '100%',
          height: '5%',
          top: 0,
        }}
      />
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          top: 50,
          left: 10,
          position: 'absolute',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name='arrow-left'
            color={'#fd5d13'}
            size={32}
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{
          width: '100%',
        }}>
        {Platform.os === 'ios' ? (
          <Input
            placeholder='Deja un comentario...'
            onChangeText={(comentario) => setComentario(comentario)}
            value={comentario}
            maxLength='140'
            multiline='true'
          />
        ) : (
          <Input
            placeholder='Deja un comentario...'
            onChangeText={(comentario) => setComentario(comentario)}
            value={comentario}
            maxLength={140}
            multiline={true}
          />
        )}
        <Button title='Comentar' onPress={() => comentarUsuario()} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
