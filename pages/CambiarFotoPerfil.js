import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Badge,
  Button,
  Overlay,
  SocialIcon,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as RootNavigation from '../RootNavigation.js';
import * as LoginPageData from './LoginPage';
import LoginPage from './LoginPage';
import * as Updates from 'expo-updates';
import { Platform } from 'react-native';

export default function ({ navigation }) {
  const [image, setImage] = useState(null);
  const user = firebase.auth().currentUser;

  async function updateImage(newImage) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      try {
        user
          .updateProfile({
            photoURL: result.uri,
          })
          .then(() => {
            navigation.navigate('ProfilePage', function () {
              user.reload();
            });
          });
      } catch (error) {
        alert(
          'Hubo un error al subir su foto, compruebe el formato de la misma y vuelva a intentarlo.'
        );
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require('../assets/gradients/20x20.png')}
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
              marginTop: '12%',
              marginLeft: '3%',
            },
            ios: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '3%',
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
                left: 12,
              },
            }),
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            color={'#fd5d13'}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
      <Button
        title="Subir Foto"
        onPress={() => updateImage()}
        buttonStyle={{
          backgroundColor: '#fd5d13',
          borderRadius: 5,
          height: 60,
          width: '60%',
          alignSelf: 'center',
          marginTop: '60%',
        }}
        titleStyle={{
          fontSize: 18,
        }}
      />
    </SafeAreaView>
  );
}
