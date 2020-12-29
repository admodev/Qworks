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

const ProfilePage = ({ navigation }) => {
  let user = firebase.auth().currentUser;
  const signUserOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        alert(error);
      })
      .then(function () {
        navigation.replace('LoginPage');
      });
    Updates.reloadAsync();
  };

  let dbRef = firebase.database().ref('anuncios/');

  let [newImage, setNewImage] = useState(null);

  let dato = [];

  let id, image, nombre, apellido, actividad, emailPersonal;

  id = user.uid;
  firebase
    .database()
    .ref('anuncios/')
    .orderByChild('id')
    .equalTo(id)
    .on('value', (snap) => {
      snap.forEach((child) => {
        key = child.key;
        nombre = child.val().nombre;
        image = child.val().image;
        apellido = child.val().apellido;
        actividad = child.val().actividad;
        emailPersonal = child.val().emailPersonal;
      });
    });

  //!user.displayName ? (nombre = 'Usuario') : (nombre = user.displayName);

  const fotoDePerfil = JSON.stringify(image);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Perdón, necesitamos tu permiso para que puedas subir una foto!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    (newImage) => setNewImage(result.uri);
  };

  function updateImage(newImage) {
    let dbRef = firebase
      .database()
      .ref('anuncios/')
      .orderByChild('id')
      .equalTo(id);
    dbRef
      .set({
        image: newImage,
      })
      .then(function () {
        error == true ? console.log(error) : console.log('success!');
      })
      .finally(function () {
        Updates.reloadAsync();
      });
  }

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let anunciosIdsCount = [];
  let idRefAnuncios = firebase
    .database()
    .ref('anuncios/')
    .orderByKey()
    .on('value', (snap) => {
      snap.forEach((child) => {
        anunciosIdsCount.push({
          ids: child.val().id,
        });
      });
    });

  let anunciosCount = anunciosIdsCount.reduce(
    (arr, elem) => arr.concat(elem.ids),
    []
  );

  function countTrue(array) {
    var trueCounter = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === id) {
        trueCounter.push(array[i]);
      }
    }
    return trueCounter.length;
  }

  let anunciosCountResult = countTrue(anunciosCount);

  console.log(anunciosCountResult);

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
      {user ? (
        <SafeAreaView style={{ flex: 1 }}>
          <Image
            source={require('../assets/gradients/20x20.png')}
            style={{
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '3%',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginTop: 70,
              marginLeft: 15,
            }}
          >
            <Overlay
              isVisible={visible}
              onBackdropPress={toggleOverlay}
              overlayStyle={{ width: '85%', height: '85%', borderRadius: 10 }}
            >
              {!image ? (
                <Image
                  source={require('../assets/icon.png')}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: fotoDePerfil }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                />
              )}
            </Overlay>
            {image ? (
              <Image
                source={require('../assets/icon.png')}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                }}
              />
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={require('../assets/icon.png')}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}>
              {!user.displayName ? (
                <TouchableOpacity
                  onPress={() => RootNavigation.navigate('CambiarNombreScreen')}
                >
                  <Text
                    style={{ color: '#000000', fontSize: 14, marginLeft: 20 }}
                  >
                    <Badge value='Editar' status='primary' />
                    Usuario
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text
                  style={{ color: '#000000', fontSize: 14, marginLeft: 20 }}
                >
                  {user.displayName}
                </Text>
              )}
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                {user.email}
              </Text>
            </View>
          </View>
          {anunciosCountResult >= 3 ? (
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: '30%',
              }}
            >
              <Button
                title='Anunciarte'
                disabled
                onPress={() => navigation.navigate('AnunciatePage')}
                buttonStyle={{
                  backgroundColor: '#fd5d13',
                  marginRight: 15,
                  borderRadius: 5,
                  height: 60,
                  width: 120,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: '30%',
              }}
            >
              <Button
                title='Anunciarte'
                onPress={() => navigation.navigate('AnunciatePage')}
                buttonStyle={{
                  backgroundColor: '#fd5d13',
                  borderRadius: 5,
                  height: 60,
                  width: 120,
                }}
              />
            </View>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              bottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Anuncios')}>
              <Text style={{ color: '#000000', fontSize: 20, margin: 15 }}>
                <MaterialCommunityIcons
                  name='bullhorn'
                  color={'#fd5d13'}
                  size={20}
                />{' '}
                Mis Anuncios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MessagesScreen')}
            >
              <Text style={{ color: '#000000', fontSize: 20, margin: 15 }}>
                <MaterialCommunityIcons
                  name='comment-text'
                  color={'#fd5d13'}
                  size={20}
                />{' '}
                Mensajes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MisFavoritosScreen')}
            >
              <Text style={{ color: '#000000', fontSize: 20, margin: 15 }}>
                <MaterialCommunityIcons
                  name='book-open'
                  color={'#fd5d13'}
                  size={20}
                />{' '}
                Favoritos
              </Text>
            </TouchableOpacity>
            {/*
            <TouchableOpacity
            onPress={() => navigation.navigate("MisComentariosPage")}
            >
            <Text style={{ color: "#000000", fontSize: 20, margin: 15 }}>
            <MaterialCommunityIcons
            name="comment"
            color={"#fd5d13"}
            size={20}
            />{" "}
            Comentarios
            </Text>
            </TouchableOpacity>
            */}
            <TouchableOpacity
              onPress={() => navigation.navigate('MisRecomendadosPage')}
            >
              <Text style={{ color: '#000000', fontSize: 20, margin: 15 }}>
                <MaterialCommunityIcons
                  name='account-group'
                  color={'#fd5d13'}
                  size={20}
                />{' '}
                Recomendados
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              title='Cerrar Sesión'
              onPress={() => signUserOut()}
              buttonStyle={{
                backgroundColor: '#fd5d13',
                borderRadius: 12,
                fontWeight: 'bold',
                padding: 10,
                marginTop: 50,
              }}
            />
          </View>
        </SafeAreaView>
      ) : (
        <LoginPage />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default ProfilePage;
