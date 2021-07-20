import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var itm = [];

export default function FiltroDeComentarios() {
  let user = firebase.auth().currentUser;
  firebase
    .database()
    .ref('comentarios/')
    .on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          comentario: child.val().comentario,
        });
      });
      itm = items;
    });
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {itm.map((l, i) => (
        <View key={i}>
          <Text>{l.comentario}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
