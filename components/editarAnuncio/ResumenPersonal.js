import React, { useState, setState } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import * as Updates from 'expo-updates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { FontDisplay } from 'expo-font';

export default function EditarResumenPersonalScreen({ navigation }) {
  let [newName, setNewName] = useState('');
  let user = firebase.auth().currentUser;
  let userId = user.uid;
  let naranjaQueDeOficios = '#fd5d13';

  function updateName(newName) {
    user
      .updateProfile({
        displayName: newName,
      })
      .then(function () {
        var displayName = user.displayName;
      })
      .catch((error) => {
        alert(
          'Hubo un error al cambiar su nombre, por favor intentelo de nuevo...'
        );
      })
      .finally(() => {
        user.reload();
        navigation.navigate('ProfilePage', function () {
          user.reload();
        });
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../../assets/gradients/20x20.png')}
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '5%',
            },
            ios: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '3%',
            },
          }),
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
              marginTop: '5%',
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
                right: 10,
              },
            }),
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Input
          placeholder="Ingrese una descripción personal..."
          style={{
            height: 200,
            width: '80%',
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 15,
            color: '#000000',
            margin: 10,
            textAlignVertical: 'top',
            textAlign: 'center',
          }}
          inputStyle={{ color: '#000000' }}
          inputContainerStyle={{ borderBottomWidth: 0, margin: '5%' }}
          multiline={true}
          paddingTop={20}
          paddingRight={50}
          paddingLeft={50}
          maxLength={150}
        />
        <Text
          style={{
            color: 'gray',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: '5%',
          }}
        >
          Palabras Clave
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '5%',
            marginRight: '5%',
            alignSelf: 'center',
          }}
        >
          <Input
            placeholder="#Uno"
            paddingLeft={10}
            paddingRight={10}
            placeholderTextColor="#fd5d13"
            containerStyle={{ width: '35%' }}
            inputStyle={{
              color: '#000000',
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 25,
              padding: 15,
            }}
            style={{
              textAlign: 'center',
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
          />
          <Input
            placeholder="#Dos"
            paddingLeft={10}
            paddingRight={10}
            placeholderTextColor="#fd5d13"
            containerStyle={{ width: '35%' }}
            inputStyle={{
              color: '#000000',
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 25,
              padding: 15,
            }}
            style={{
              textAlign: 'center',
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
          />
          <Input
            placeholder="#Tres"
            paddingLeft={10}
            paddingRight={10}
            placeholderTextColor="#fd5d13"
            containerStyle={{ width: '35%' }}
            inputStyle={{
              color: '#000000',
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 25,
              padding: 15,
            }}
            style={{
              textAlign: 'center',
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
          />
        </View>
      </ScrollView>
      <Button
        title="Guardar"
        onPress={() => updateName(newName)}
        buttonStyle={{
          backgroundColor: naranjaQueDeOficios,
          borderRadius: 25,
          width: '70%',
          alignSelf: 'center',
          marginBottom: '10%',
        }}
      />
    </SafeAreaView>
  );
}
