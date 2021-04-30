import React, { useState, setState, useEffect } from 'react';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
  Share,
} from 'react-native';
import {
  AirbnbRating,
  Avatar,
  Button,
  Card,
  Overlay,
  SocialIcon,
} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';
import CardsUsuarios from './Cards';
import { concat } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Updates from 'expo-updates';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/counterActions';

let calificacion = 'calificacion';
let favs;

export default function AnuncioSeleccionado({ route, navigation }) {
  let id = route.params.id;
  let uuid = route.params.uuid;
  let index = route.params.index;
  let routeParamsToString = id.toString();
  let hasRecommendedArray = [];
  const [fotoDePerfil, setFotoDePerfil] = useState('');
  const [isFavorite, setFavorites] = useState([]);
  const naranjaQueDeOficios = '#fd5d13';
  const favoritosBackground = 'transparent';
  const [favoritosTint, setFavoritosTint] = useState(false);
  const [foundUser, setFoundUser] = useState('');
  const [isRecommended, setIsRecommended] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  async function loadFonts() {
    await Font.loadAsync({
      // Nombres, apellidos, títulos y subtítulos
      dmSans: require('../assets/fonts/DM_Sans/DMSans-Regular.ttf'),
      dmSansBold: require('../assets/fonts/DM_Sans/DMSans-Bold.ttf'),

      // Comunicación interna y externa
      quickSandLight: require('../assets/fonts/Quicksand/static/Quicksand-Light.ttf'),
      quickSandRegular: require('../assets/fonts/Quicksand/static/Quicksand-Regular.ttf'),

      // Para lo demás
      comfortaaLight: require('../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
      comfortaaRegular: require('../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
    });
    setFontsLoaded(true);
  }

  let image,
    nombre,
    apellido,
    actividad,
    contadorAnuncio,
    emailPersonal,
    celular,
    descripcionPersonal,
    desde,
    diasHorarios,
    direccionDelLocal,
    emailLaboral,
    empresa,
    factura,
    hasta,
    local,
    localidad,
    matricula,
    nombreDeLaEmpresa,
    numeroDeMatricula,
    pisoDptoCasa,
    provincia,
    telefono,
    recomendacionesTotales,
    hasRecommended;

  let dbRef = firebase
    .database()
    .ref('anuncios/')
    .orderByChild('uuid')
    .equalTo(uuid);
  let dbResult = dbRef.on('value', (snap) => {
    snap.forEach((child) => {
      key = child.key;
      nombre = child.val().nombre;
      image = child.val().image;
      apellido = child.val().apellido;
      actividad = child.val().actividad;
      emailPersonal = child.val().emailPersonal;
      id = child.val().id;
      contadorAnuncio = child.val().anuncioId;
      celular = child.val().celular;
      descripcionPersonal = child.val().descripcionPersonal;
      desde = child.val().desde;
      diasHorarios = child.val().diasHorarios;
      direccionDelLocal = child.val().direccionDelLocal;
      emailLaboral = child.val().emailLaboral;
      empresa = child.val().empresa;
      factura = child.val().factura;
      hasta = child.val().hasta;
      local = child.val().local;
      localidad = child.val().localidad;
      provincia = child.val().provincia;
      nombreDeLaEmpresa = child.val().nombreDeLaEmpresa;
      recomendacionesTotales = child.val().recomendacionesTotales;
      hasRecommended = child.val().hasRecommended;
      telefono = child.val().telefono;
      matricula = child.val().matricula;
      numeroDeMatricula = child.val().numeroDeMatricula;
    });
  });
  if (!recomendacionesTotales) {
    recomendacionesTotales = 0;
  }
  let key, userId, comentario;
  var arr = [];
  let comentariosRef = firebase
    .database()
    .ref('comentarios/')
    .orderByKey()
    .on('value', function snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push({
          key: item.key,
          id: item.id,
          receptor: item.receptor,
          comentario: item.comentario,
          emisorEmail: item.emisorEmail,
        });
        arr = returnArr;
        console.log(arr);
      });
    });

  let storage = firebase.storage();
  let storageRef = storage.ref();
  let defaultImageRef = storageRef
    .child('defaultUserImage/icon.png')
    .toString();
  let userProfilePic = storageRef.child('userProfilePics/').child(id).child;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let user = firebase.auth().currentUser;

  useEffect(() => {
    loadFonts();

    comentariosRef;

    firebase
      .database()
      .ref('favoritos/')
      .orderByChild('favs')
      .equalTo(id)
      .on('value', (snap) => {
        let isFavorite = [];
        snap.forEach((child) => {
          isFavorite.push(child.val().favs);
        });
        setFavorites(isFavorite);
      });
  }, []);

  console.log(isFavorite);

  const agregarFavorito = (id) => {
    firebase
      .database()
      .ref('favoritos/')
      .push()
      .set({
        user: firebase.auth().currentUser.uid,
        favs: id,
      })
      .then(() => {
        Updates.reloadAsync();
      });
  };

  function quitarFavorito(id) {
    try {
      firebase
        .database()
        .ref('favoritos/')
        .orderByChild('favs')
        .equalTo(id)
        .once('value')
        .then(function (snapshot) {
          var promises = [];
          snapshot.forEach(function (child) {
            promises.push(child.ref.remove());
          });
          Promise.all(promises).then(function () {
            console.log('All removed!');
          });
          Updates.reloadAsync();
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  let [rating, setRating] = useState(0);

  function calificarUsuario(rating) {
    let ratingString = parseInt(rating);
    let ratingUserRef = firebase
      .database()
      .ref('anuncios/')
      .orderByChild('id')
      .equalTo(firebase.auth().currentUser.uid)
      .once('value')
      .then(function (snapshot) {
        var nombre = snapshot.val().nombre;
      });
    firebase
      .database()
      .ref('calificaciones/')
      .push()
      .set({
        calificacion: {
          ratingUserId: firebase.auth().currentUser.uid,
          ratingUserName: nombre,
          ratedUser: id,
          rating: ratingString,
        },
      })
      .then(function () {
        Updates.reloadAsync();
      });
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

  const handleRecommend = () => {
    if (id === firebase.auth().currentUser.uid) {
      Alert.alert('¡Atención!', 'No puedes realizar esta acción.');
    } else if (isRecommended) {
      Alert.alert('Recomendación', 'Ya has recomendado a este usuario.');
    } else {
      dispatch(increment());
      setIsRecommended(!isRecommended);
      Alert.alert('Recomendación', '¡Gracias por recomendarme!');
      hasRecommendedArray.push({
        whoRecommended: firebase.auth().currentUser.uid,
        recommendedUser: id,
        recommended: true,
      });
      firebase
        .database()
        .ref('anuncios/')
        .child(id + contadorAnuncio)
        .update({
          recomendacionesTotales: recomendacionesTotales + 1,
          hasRecommended: hasRecommendedArray,
        });
    }
  };

  firebase
    .storage()
    .ref('profilePictures/')
    .child(id + contadorAnuncio)
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      setFotoDePerfil(url);
    })
    .catch(function (error) {
      console.log('Hubo un error al cargar las fotos!', error.message);
    });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
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
        }}>
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
          }}>
          <MaterialCommunityIcons
            name='arrow-left'
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/* Card principal */}
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
                marginTop: '2%',
              },
            }),
          }}>
          <TouchableOpacity
            style={{
              marginTop: '10%',
            }}
            onPress={toggleOverlay}>
            {!fotoDePerfil ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Card.Image
                  source={require('../assets/icon.png')}
                  style={{
                    ...Platform.select({
                      android: {
                        borderRadius: 25,
                        width: 150,
                        height: 150,
                      },
                      ios: {
                        borderRadius: 25,
                        width: 150,
                        height: 150,
                      },
                    }),
                  }}
                />
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Card.Image
                  source={{ uri: fotoDePerfil }}
                  style={{
                    ...Platform.select({
                      android: {
                        borderRadius: 25,
                        width: 200,
                        height: 200,
                      },
                      ios: {
                        borderRadius: 25,
                        width: 200,
                        height: 200,
                      },
                    }),
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{ width: '85%', height: 320, borderRadius: 10 }}>
            {!fotoDePerfil ? (
              <Card.Image
                source={require('../assets/icon.png')}
                style={{
                  height: 300,
                }}
              />
            ) : (
              <Card.Image
                source={{ uri: fotoDePerfil }}
                style={{
                  height: 300,
                }}
              />
            )}
          </Overlay>
          <AirbnbRating
            size={24}
            showRating={true}
            type='custom'
            ratingColor={naranjaQueDeOficios}
            ratingBackgroundColor='#c8c7c8'
            fractions={1}
            reviews={['']}
            onFinishRating={(rating) => setRating(rating)}
            style={{
              borderWidth: 0,
            }}
          />
          <View style={{ margin: '3%' }}>
            <Text
              style={{
                fontFamily: 'dmSans',
                color: '#000000',
                textAlign: 'center',
                fontSize: 30,
              }}>
              {nombre} {apellido}
            </Text>
          </View>
          <View
            style={{
              marginTop: '-2%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{ color: '#000000', textAlign: 'center', fontSize: 24 }}>
              {actividad} -
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
              }}>
              {recomendacionesTotales}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <SocialIcon
              button
              type='facebook'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <SocialIcon
              button
              type='instagram'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <SocialIcon
              button
              type='linkedin'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <SocialIcon
              button
              type='youtube'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <SocialIcon
              button
              type='google'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='map-marker'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                color: '#000000',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>
              {localidad}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='email'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                color: '#000000',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>
              {emailLaboral}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
              marginBottom: '3%',
            }}>
            <TouchableOpacity onPress={() => shareContent()}>
              <Text
                style={{
                  ...Platform.select({
                    android: {
                      color: '#000000',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 10,
                      fontSize: 20,
                    },
                    ios: {
                      color: '#000000',
                      marginTop: 15,
                      marginLeft: 10,
                      fontSize: 20,
                    },
                  }),
                }}>
                <MaterialCommunityIcons
                  name='share-variant'
                  color={naranjaQueDeOficios}
                  size={24}
                />{' '}
                Compartir
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...Platform.select({
                android: {
                  flex: 1,
                },
                ios: {
                  flex: 1,
                },
              }),
            }}></View>
        </Card>
        {/* Card detalles */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 24,
            marginTop: '5%',
            color: '#000000',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          Información Laboral
        </Text>
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '150%',
                marginTop: '3%',
                elevation: 0,
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '200%',
                marginTop: '3%',
              },
            }),
          }}>
          <View style={{ flexDirection: 'column' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                name='calendar-clock'
                color={naranjaQueDeOficios}
                size={24}
              />
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#000000',
                  }}>
                  {diasHorarios.filter(onlyUnique).join(', ')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <MaterialCommunityIcons
                    name='clock-outline'
                    color={naranjaQueDeOficios}
                    size={24}
                  />
                  <Text
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 10,
                      textAlign: 'center',
                      fontSize: 20,
                      color: '#000000',
                    }}>
                    {desde}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 10,
                      textAlign: 'center',
                      fontSize: 20,
                      color: '#000000',
                    }}>
                    {hasta}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {local && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                name='storefront'
                color={naranjaQueDeOficios}
                size={24}
              />
              <Text
                style={{
                  color: '#000000',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}>
                {direccionDelLocal}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='cellphone-basic'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                color: '#000000',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>
              {celular}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='phone-classic'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                color: '#000000',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>
              {telefono}
            </Text>
          </View>
          {empresa.toString().toLowerCase() == 'si' && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                name='office-building'
                color={naranjaQueDeOficios}
                size={24}
              />
              <Text
                style={{
                  color: '#000000',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}>
                {nombreDeLaEmpresa}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='receipt'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                color: '#000000',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>
              {factura}
            </Text>
          </View>
          {matricula.toString().toLowerCase() === 'si' && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                name='card-account-details-star-outline'
                color={naranjaQueDeOficios}
                size={24}
              />
              <Text
                style={{
                  color: '#000000',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}>
                {numeroDeMatricula}
              </Text>
            </View>
          )}
        </Card>
        {/* Card resumen personal */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 28,
            marginTop: 10,
            color: '#000000',
            fontWeight: 'bold',
          }}>
          Resumen Personal
        </Text>
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '150%',
                marginTop: '3%',
                elevation: 0,
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '100%',
                marginTop: '3%',
              },
            }),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name='notebook'
              color={naranjaQueDeOficios}
              size={24}
            />
            <Text
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
                fontSize: 20,
                marginRight: 25,
                marginLeft: 25,
                marginBottom: 20,
                color: '#000000',
              }}>
              "{descripcionPersonal}"
            </Text>
          </View>
        </Card>
        {/* Card comentarios */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 28,
            marginTop: 10,
            color: '#000000',
            fontWeight: 'bold',
          }}>
          Comentarios
        </Text>
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '150%',
                marginTop: '3%',
                marginBottom: '35%',
                elevation: 0,
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                maxWidth: '200%',
                marginTop: '3%',
                marginBottom: '35%',
              },
            }),
          }}>
          {arr.map((u, index) => {
            return (
              <View key={index}>
                {u.receptor == id && (
                  <View>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginLeft: 10,
                        fontSize: 20,
                        marginTop: 10,
                        marginBottom: 10,
                        color: '#000000',
                      }}>
                      -{' '}
                      {u.receptor == id
                        ? JSON.stringify(u.comentario)
                        : console.log('No comments')}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 14,
                        color: naranjaQueDeOficios,
                      }}>
                      De:{' '}
                      {u.receptor == id
                        ? JSON.stringify(u.emisorEmail)
                        : console.log('No email')}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </Card>
      </ScrollView>
      <View
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              marginBottom: '-2%',
            },
            ios: {
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              marginBottom: '-2%',
            },
          }),
        }}>
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'cover',
            width: '115%',
            height: 55,
            margin: 10,
          }}
        />
        <View style={{ margin: 10, marginLeft: 15 }}>
          {!user ? (
            <Button
              title='Recomendar'
              onPress={() =>
                alert('Debes ingresar para recomendar a un usuario!')
              }
              titleStyle={{ fontSize: 12, marginBottom: -20 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <Button
              title='Recomendar'
              onPress={handleRecommend}
              titleStyle={{ fontSize: 12, marginBottom: -20 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          )}
          <MaterialCommunityIcons
            name='account-group'
            color={'white'}
            size={22}
            style={{ position: 'absolute', marginLeft: 45, marginTop: 5 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          {user == null ? (
            <Button
              title='Enviar Mensaje'
              onPress={() => alert('Debes ingresar para iniciar un chat!')}
              titleStyle={{ fontSize: 12, marginTop: 18 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <Button
              title='Enviar Mensaje'
              onPress={() =>
                RootNavigation.navigate('ChatComponent', {
                  userOne: firebase.auth().currentUser.uid,
                  userTwo: id,
                })
              }
              titleStyle={{ fontSize: 12, marginTop: 18 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          )}
          <MaterialCommunityIcons
            name='comment-text'
            color={naranjaQueDeOficios}
            size={24}
            style={{ position: 'absolute', marginLeft: 45, marginTop: 5 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          {user == null ? (
            <Button
              title='Comentar'
              onPress={() => alert('Debes ingresar para comentar!')}
              titleStyle={{ fontSize: 12, marginTop: 18 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <Button
              title='Comentar'
              onPress={() =>
                RootNavigation.navigate('ComentarScreen', { id: id })
              }
              titleStyle={{ fontSize: 12, marginTop: 18 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: 'transparent',
              }}
            />
          )}
          <MaterialCommunityIcons
            name='bullhorn'
            color={'white'}
            size={20}
            style={{ position: 'absolute', marginLeft: 50, marginTop: 7 }}
          />
        </View>
      </View>
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
  card: {
    ...Platform.select({
      ios: {
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
      android: {
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
        borderWidth: 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
    }),
  },
});
