import React, { Component, useState } from 'react';
import { Image } from 'react-native';
import {
  AirbnbRating,
  Avatar,
  Button,
  Card,
  Icon,
  Input,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import { useFonts } from 'expo-font';
import * as RootNavigation from '../RootNavigation';

const naranjaQueDeOficios = '#fd5d13';

const FotoMapa = (props) => {
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(null);
  const [fotoDePerfil, setFotoDePerfil] = useState(null);

  firebase
    .storage()
    .ref('anunciosPictures/')
    .child(props.idAnuncio + props.anuncioId + '.JPG')
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
        console.log('EL BLOB', blob);
      };
      xhr.open('GET', url);
      xhr.send();
      console.log('LA FOTO', url);
      setFotoDePerfil(url);
    })
    .catch(function (error) {
      console.log('ERROR AL DESCARGAR FOTO', error.message);
    });

  firebase
    .storage()
    .ref('defaultUserImage/')
    .child('defaultProfilePictureQworks.png')
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
        console.log('EL BLOB', blob);
      };
      xhr.open('GET', url);
      xhr.send();
      console.log('LA FOTO', url);
      setDefaultProfilePicture(url);
    })
    .catch(function (error) {
      console.log('ERROR AL DESCARGAR FOTO', error.message);
    });

  return (
    <Image
      source={{
        uri: fotoDePerfil ? fotoDePerfil : defaultProfilePicture,
      }}
      style={{
        width: 60,
        height: 60,
        top: 15,
        left: 30,
        position: 'absolute',
        borderRadius: 12,
      }}
    />
  );
};

export default FotoMapa;
