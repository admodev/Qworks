import React, { useState, setState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import * as Updates from 'expo-updates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CambiarNombreScreen({ navigation }) {
  let [newName, setNewName] = useState('');
  let user = firebase.auth().currentUser;
  let userId = user.uid;
  let naranjaQueDeOficios = '#fd5d13';

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
          ...Platform.select({
            android: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '15%',
              marginLeft: '5%',
            },
            ios: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '15%',
              marginLeft: '5%',
              backgroundColor: 'transparent',
            },
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            ...Platform.select({
              android: {
                backgroundColor: 'transparent',
              },
              ios: {
                backgroundColor: 'transparent',
                left: 25,
              },
            }),
          }}
        >
          <MaterialCommunityIcons
            name='arrow-left'
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
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
          backgroundColor: naranjaQueDeOficios,
          borderRadius: 25,
          width: '70%',
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
    </SafeAreaView>
  );
}
