import React, { useEffect, useState, setState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Share,
} from 'react-native';
import { Avatar, Button, Card, Icon, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';
import CardsUsuarios from './Cards';
import { concat } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Sharing from 'expo-sharing';
import * as Updates from 'expo-updates';

var itm = [];

const naranjaQueDeOficios = '#fd5d13';

const AnunciosPage = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  let user = firebase.auth().currentUser;
  let id = user.uid;
  let anuncioId, image, nombre, apellido, actividad, emailPersonal;

  useEffect(() => {
    firebase
      .database()
      .ref('anuncios/')
      .orderByChild('id')
      .equalTo(id)
      .on('value', (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            image: child.val().image,
            nombre: child.val().nombre,
            apellido: child.val().apellido,
            actividad: child.val().actividad,
            emailPersonal: child.val().emailPersonal,
            idAnuncio: child.val().id,
            localidad: child.val().localidad,
            provincia: child.val().provincia,
          });
        });
        itm = items;
        setItems(items);
        console.log(itm);
      });
  }, []);

  function eliminarAnuncio() {
    firebase.database().ref('anuncios/').child(id).remove();
    Updates.reloadAsync();
  }

  function eliminarCuenta() {
    console.log('placeholder');
    //    admin
    //      .auth()
    //      .deleteUser(uid)
    //      .then(function () {
    //        console.log("Successfully deleted user");
    //      })
    //      .catch(function (error) {
    //        console.log("Error deleting user:", error);
    //      });
  }

  function shareContent() {
    Share.share(
      {
        message: `Dale un vistazo al perfil de ${nombre} en QuedeOficios!`,
        url: 'http://dominioquedeoficios.com',
        title: 'QuedeOficios!',
      },
      {
        // Android only:
        dialogTitle: `Mira el perfil de ${nombre}`,
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
      <ScrollView>
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                marginTop: '2%',
                elevation: 0,
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                marginTop: '10%',
                elevation: 0,
                width: '85%',
                alignSelf: 'center',
              },
            }),
          }}
        >
          {items.map((u, i) => {
            let storage = firebase.storage();
            let storageRef = storage.ref();
            let defaultImageRef = storageRef
              .child('defaultUserImage/icon.png')
              .toString();
            let userProfilePic = storageRef
              .child('userProfilePics/')
              .child(u.idAnuncio).child;
            return (
              <View
                key={i}
                style={{
                  ...Platform.select({
                    android: {
                      margin: 20,
                      backgroundColor: 'transparent',
                    },
                    ios: {
                      margin: 20,
                      marginTop: '8%',
                      backgroundColor: 'transparent',
                    },
                  }),
                }}
              >
                <Image
                  source={require('../assets/patron.jpg')}
                  style={{
                    flex: 1,
                    position: 'absolute',
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
                <Image
                  source={require('../assets/gradients/20x20.png')}
                  style={{
                    flex: 1,
                    position: 'absolute',
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                    opacity: 0.9,
                    borderRadius: 10,
                  }}
                />
                {!image ? (
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Card.Image
                      source={require('../assets/icon.png')}
                      style={{
                        ...Platform.select({
                          android: {
                            borderRadius: 25,
                            marginTop: '8%',
                            marginBottom: '10%',
                            width: 140,
                            height: 120,
                          },
                          ios: {
                            borderRadius: 25,
                            marginTop: '8%',
                            marginBottom: '10%',
                            width: 120,
                            height: 90,
                          },
                        }),
                      }}
                    />
                  </View>
                ) : (
                  <Card.Image
                    source={{ uri: image }}
                    style={{
                      ...Platform.select({
                        android: {
                          borderRadius: 100,
                          marginTop: 10,
                          marginBottom: 20,
                          marginLeft: 60,
                          marginRight: 60,
                        },
                        ios: {
                          borderRadius: 100,
                          marginTop: 10,
                          marginBottom: 20,
                          marginLeft: 60,
                          marginRight: 60,
                        },
                      }),
                    }}
                  />
                )}
                <View style={{ margin: '3%' }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 30,
                      fontWeight: 'bold',
                    }}
                  >
                    {u.nombre}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: '-2%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 24,
                    }}
                  >
                    {u.actividad} -
                  </Text>
                  <MaterialCommunityIcons
                    name='account-group'
                    color={naranjaQueDeOficios}
                    size={22}
                    style={{ marginLeft: '3%' }}
                  />
                  <Text
                    style={{
                      color: '#8DB600',
                      textAlign: 'center',
                      fontSize: 14,
                      marginLeft: '2%',
                    }}
                  >
                    100
                  </Text>
                </View>
                <View style={{ marginTop: '5%' }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 16,
                    }}
                  >
                    {u.localidad} - {u.provincia}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => shareContent()}>
                  <Text
                    style={{
                      ...Platform.select({
                        android: {
                          color: '#fff',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                        ios: {
                          color: '#fff',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                      }),
                    }}
                  >
                    <MaterialCommunityIcons
                      name='share-variant'
                      color={'#fd5d13'}
                      size={24}
                    />{' '}
                    Compartir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => RootNavigation.navigate('EditarAnuncioScreen')}
                >
                  <Text
                    style={{
                      ...Platform.select({
                        android: {
                          color: '#fff',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                        ios: {
                          color: '#fff',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                      }),
                    }}
                  >
                    <MaterialCommunityIcons
                      name='lead-pencil'
                      color={'#fd5d13'}
                      size={24}
                    />{' '}
                    Editar Anuncio
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarAnuncio()}>
                  <Text
                    style={{
                      ...Platform.select({
                        android: {
                          color: '#fff',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                        ios: {
                          color: '#fff',
                          marginTop: 15,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          fontSize: 20,
                        },
                      }),
                    }}
                  >
                    <MaterialCommunityIcons
                      name='eraser'
                      color={'#fd5d13'}
                      size={24}
                    />{' '}
                    Eliminar Anuncio
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Card>
      </ScrollView>
      <View>
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
          }}
        />
        <TouchableOpacity onPress={() => eliminarCuenta()}>
          <Text
            style={{
              ...Platform.select({
                android: {
                  color: '#fff',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 15,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginBottom: 20,
                  fontSize: 20,
                },
                ios: {
                  color: '#fff',
                  marginTop: 15,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginBottom: 20,
                  fontSize: 20,
                },
              }),
            }}
          >
            <MaterialCommunityIcons
              name='account-off'
              color={'#fd5d13'}
              size={24}
            />{' '}
            Eliminar Cuenta
          </Text>
        </TouchableOpacity>
      </View>
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
  card: {
    marginTop: 50,
    backgroundColor: '#483D8B',
    shadowColor: '#000',
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default AnunciosPage;
