import React, { useState, setState, useEffect } from 'react';
import {
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
  Avatar,
  Button,
  Card,
  Overlay,
  Rating,
  AirbnbRating,
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

let calificacion = 'calificacion';
let favs = [];

const AnuncioSeleccionado = ({ route, navigation }) => {
  let id = route.params.id;
  let routeParamsToString = id.toString();
  let [fotoDePerfil, setFotoDePerfil] = useState('');
  const naranjaQueDeOficios = '#fd5d13';
  const favoritosBackground = 'transparent';
  const [favoritosTint, setFavoritosTint] = useState(false);
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
    recomendaciones;
  let dbRef = firebase
    .database()
    .ref('anuncios/')
    .orderByChild('id')
    .equalTo(id);
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
      recomendaciones = child.val().recomendaciones;
    });
  });
  !recomendaciones ? (recomendaciones = 0) : console.log(recomendaciones);
  const [count, setCount] = useState(recomendaciones);
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
          comentadoPor: item.comentadoPor,
          comentario: item.comentario,
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
        setFavoritosTint(!favoritosTint);
      });
  };

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
    setCount((prevCount) => prevCount + 1);
    alert(`Cantidad de recomendaciones: ${count}`);
  };

  var photoRef = firebase
    .storage()
    .ref('profilePictures/' + id + '-' + contadorAnuncio);
  photoRef
    .getDownloadURL()
    .then((url) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      setFotoDePerfil(url);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          flex: 1,
          position: 'absolute',
          opacity: 0.9,
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
              marginTop: '10%',
              marginLeft: '10%',
            },
            ios: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '10%',
              marginLeft: 15,
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
            name="arrow-left"
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => agregarFavorito(id)}
          style={{
            ...Platform.select({
              android: {
                backgroundColor: 'transparent',
                right: -240,
              },
              ios: {
                backgroundColor: 'transparent',
                right: -250,
              },
            }),
          }}
        >
          {favoritosTint === false ? (
            <MaterialCommunityIcons
              name="account-star"
              color={naranjaQueDeOficios}
              size={32}
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-star-outline"
              color={'white'}
              size={32}
              style={{ backgroundColor: 'transparent' }}
            />
          )}
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
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: 'transparent',
                borderWidth: 0,
                marginTop: '2%',
              },
            }),
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: '10%',
            }}
            onPress={toggleOverlay}
          >
            {!fotoDePerfil ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Card.Image
                  source={{ uri: fotoDePerfil }}
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
            )}
          </TouchableOpacity>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{ width: '85%', height: '85%', borderRadius: 10 }}
          >
            {!fotoDePerfil ? (
              <Card.Image
                source={require('../assets/icon.png')}
                style={{
                  borderRadius: 100,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Card.Image
                source={{ uri: fotoDePerfil }}
                style={{
                  borderRadius: 100,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </Overlay>
          <Rating
            size={28}
            showRating={true}
            type="custom"
            ratingColor={naranjaQueDeOficios}
            ratingBackgroundColor="#c8c7c8"
            fractions={1}
            reviews={['']}
            onFinishRating={(rating) => setRating(rating)}
            style={{
              margin: 10,
            }}
          />
          <View style={{ margin: '3%' }}>
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              {nombre} {apellido}
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
              style={{ color: '#ffffff', textAlign: 'center', fontSize: 24 }}
            >
              {actividad} -
            </Text>
            <MaterialCommunityIcons
              name="account-group"
              color={naranjaQueDeOficios}
              size={22}
              style={{ marginLeft: '3%' }}
            />
            <TouchableOpacity
              onPress={() =>
                RootNavigation.navigate('RecomendacionesRenderizadas')
              }
            >
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
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#ffffff',
              textAlign: 'center',
              fontSize: 16,
              marginTop: '5%',
            }}
          >
            {localidad}, {provincia}
          </Text>
          <Text
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              textAlign: 'center',
              fontSize: 20,
              color: '#fff',
            }}
          >
            {emailPersonal}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
              marginBottom: '3%',
            }}
          >
            <TouchableOpacity onPress={() => alert('Proximamente...')}>
              <Text
                style={{
                  ...Platform.select({
                    android: {
                      color: '#fff',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 20,
                    },
                    ios: {
                      color: '#fff',
                      marginTop: 15,
                      marginRight: 10,
                      fontSize: 20,
                    },
                  }),
                }}
              >
                <MaterialCommunityIcons
                  name="map"
                  color={naranjaQueDeOficios}
                  size={24}
                />{' '}
                Mapa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shareContent()}>
              <Text
                style={{
                  ...Platform.select({
                    android: {
                      color: '#fff',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 10,
                      fontSize: 20,
                    },
                    ios: {
                      color: '#fff',
                      marginTop: 15,
                      marginLeft: 10,
                      fontSize: 20,
                    },
                  }),
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
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
            }}
          ></View>
        </Card>
        {/* Card detalles */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 24,
            marginTop: '5%',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
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
          }}
        >
          <Text
            style={{
              color: '#fff',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            - Email laboral:
          </Text>
          <Text
            style={{
              color: '#fff',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            {emailPersonal}
          </Text>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: '#fff',
              }}
            >
              - Dias y horarios:
            </Text>
            <Text
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                textAlign: 'center',
                fontSize: 20,
                color: '#fff',
              }}
            >
              {diasHorarios.join(', ')}
            </Text>
          </View>
          {local && (
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  color: '#fff',
                }}
              >
                - Local:
              </Text>
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                {direccionDelLocal}
              </Text>
            </View>
          )}
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              color: '#fff',
            }}
          >
            - Celular:
          </Text>
          <Text
            style={{
              color: '#fff',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            {celular}
          </Text>
          {empresa.toString().toLowerCase() == 'si' && (
            <View>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                Nombre de la empresa:
              </Text>
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                {nombreDeLaEmpresa}
              </Text>
            </View>
          )}
          <Text
            style={{
              color: '#fff',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            - Factura:
          </Text>
          <Text
            style={{
              color: '#fff',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            {factura}
          </Text>
        </Card>
        {/* Card resumen personal */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 28,
            marginTop: 10,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
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
          }}
        >
          <Text
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              fontSize: 20,
              marginTop: 10,
              color: '#fff',
            }}
          ></Text>
          <Text
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              fontSize: 20,
              marginRight: 25,
              marginLeft: 25,
              marginBottom: 20,
              color: '#fff',
            }}
          >
            "{descripcionPersonal}"
          </Text>
        </Card>
        {/* Card comentarios */}
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            fontSize: 28,
            marginTop: 10,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Opiniones sobre {nombre}
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
          }}
        >
          {arr.map((u, i) => {
            return (
              <View key={i}>
                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 10,
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    color: '#fff',
                  }}
                >
                  - {JSON.stringify(u.comentario)}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    color: naranjaQueDeOficios,
                  }}
                >
                  De: emailaca@hotmail.com
                </Text>
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
        }}
      >
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
              title="Recomendar"
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
              title="Recomendar"
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
            name="account-group"
            color={'white'}
            size={22}
            style={{ position: 'absolute', marginLeft: 45, marginTop: 5 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          {user == null ? (
            <Button
              title="Enviar Mensaje"
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
              title="Enviar Mensaje"
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
            name="message-plus"
            color={'white'}
            size={24}
            style={{ position: 'absolute', marginLeft: 45, marginTop: 5 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          {user == null ? (
            <Button
              title="Comentar"
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
              title="Comentar"
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
            name="bullhorn"
            color={'white'}
            size={20}
            style={{ position: 'absolute', marginLeft: 50, marginTop: 7 }}
          />
        </View>
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

export default AnuncioSeleccionado;
