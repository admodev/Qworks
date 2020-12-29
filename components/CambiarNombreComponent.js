import React, { useState, setState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import * as Updates from 'expo-updates';

export default function CambiarNombreScreen() {
  let [newName, setNewName] = useState('');
  let user = firebase.auth().currentUser;
  let userId = user.uid;

  function updateName(newName) {
    user
      .updateProfile({
        displayName: newName,
      })
      .then(
        function () {
          var displayName = user.displayName;
          Updates.reloadAsync();
        },
        function (error) {
          alert(
            'Hubo un error al cambiar su nombre, por favor intentelo de nuevo...'
          );
        }
      );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input
        placeholder='Escribe tu nombre...'
        onChangeText={(newName) => setNewName(newName)}
        value={newName}
        inputContainerStyle={{
          width: '85%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '25%',
        }}
      />
      <Button
        title='Cambiar Nombre'
        onPress={() => updateName(newName)}
        buttonStyle={{
          backgroundColor: 'orange',
          borderRadius: 25,
          width: '70%',
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
    </SafeAreaView>
  );
}
