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

export default function ProfilePage({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(null);
  const user = firebase.auth().currentUser;
  const signUserOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        alert(error);
      })
      .then(function () {
        setIsLogged(false);
      });
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
        nombre = child.val().nombre;
        image = child.val().image;
        apellido = child.val().apellido;
        actividad = child.val().actividad;
        emailPersonal = child.val().emailPersonal;
      });
    });

  const fotoDePerfil = JSON.stringify(image);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Perdón, necesitamos tu permiso para que puedas subir una foto!'
          );
        }
      }
    })();
  }, []);

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

  let defaultPhoto = firebase
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
    <SafeAreaView style={{ flex: 1 }}>
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
      {firebase.auth().currentUser ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginTop: 70,
              marginLeft: 15,
            }}>
            <Overlay
              isVisible={visible}
              onBackdropPress={toggleOverlay}
              overlayStyle={{ width: '85%', height: '85%', borderRadius: 10 }}>
              {!user.photoURL ? (
                <Image
                  source={{ uri: defaultProfilePicture }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: user.photoURL }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                />
              )}
            </Overlay>
            {user.photoURL ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('CambiarFotoPerfil')}>
                <Image
                  source={{ uri: user.photoURL }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('CambiarFotoPerfil')}>
                <Image
                  source={{ uri: defaultProfilePicture }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}>
              {!user.displayName ? (
                <TouchableOpacity
                  onPress={() =>
                    RootNavigation.navigate('CambiarNombreScreen')
                  }>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: '5%' }}>
                      <MaterialCommunityIcons
                        name='pen'
                        color={'#fd5d13'}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 14,
                        marginLeft: '2%',
                      }}>
                      Usuario
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    RootNavigation.navigate('CambiarNombreScreen')
                  }>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: '5%' }}>
                      <MaterialCommunityIcons
                        name='pen'
                        color={'#fd5d13'}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 14,
                        marginLeft: '2%',
                      }}>
                      {user.displayName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                <View style={{ marginLeft: '5%' }}>
                  <MaterialCommunityIcons
                    name='email'
                    color={'#000000'}
                    size={20}
                  />
                </View>
                <Text
                  style={{
                    ...Platform.select({
                      android: {
                        color: '#000000',
                        fontSize: 14,
                        marginLeft: '2%',
                      },
                      ios: {
                        color: '#000000',
                        fontSize: 14,
                        marginLeft: '2%',
                      },
                    }),
                  }}>
                  {user.email}
                </Text>
              </View>
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
              }}>
              <Button
                title='¡Anúnciate!'
                disabled
                onPress={() => navigation.navigate('AnunciatePage')}
                buttonStyle={{
                  backgroundColor: '#fd5d13',
                  marginRight: 15,
                  borderRadius: 5,
                  height: 60,
                  width: 120,
                }}
                titleStyle={{
                  fontSize: 18,
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
              }}>
              <Button
                title='¡Anúnciate!'
                onPress={() => navigation.navigate('AnunciatePage')}
                buttonStyle={{
                  backgroundColor: '#fd5d13',
                  borderRadius: 5,
                  height: 60,
                  width: 120,
                }}
                titleStyle={{
                  fontSize: 18,
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
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Anuncios')}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '7%',
                }}>
                <MaterialCommunityIcons
                  name='bullhorn'
                  color={'#fd5d13'}
                  size={20}
                  style={{
                    marginTop: '3.5%',
                    marginLeft: '4%',
                  }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    marginTop: '3%',
                    marginLeft: '1%',
                  }}>
                  Mis Anuncios
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MessagesScreen')}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '2%',
                }}>
                <MaterialCommunityIcons
                  name='comment-text'
                  color={'#fd5d13'}
                  size={20}
                  style={{
                    marginTop: '3.5%',
                    marginLeft: '4%',
                  }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    marginTop: '3%',
                    marginLeft: '1%',
                  }}>
                  Mensajes
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ShopPage')}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '2%',
                }}>
                <MaterialCommunityIcons
                  name='shopping'
                  color={'#fd5d13'}
                  size={20}
                  style={{
                    marginTop: '3.5%',
                    marginLeft: '4%',
                  }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    marginTop: '3%',
                    marginLeft: '1%',
                  }}>
                  Mis Compras
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RecomendacionesRenderizadas')
              }>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '2%',
                }}>
                <MaterialCommunityIcons
                  name='account-group'
                  color={'#fd5d13'}
                  size={20}
                  style={{
                    marginTop: '3.5%',
                    marginLeft: '4%',
                  }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    marginTop: '3%',
                    marginLeft: '1%',
                  }}>
                  Consultas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
