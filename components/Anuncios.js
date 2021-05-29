import React, { useEffect, useState } from 'react';
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
import { LinearProgress } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';
import CardMisAnuncios from './CardMisAnuncios';

const AnunciosPage = ({ route, navigation }, props) => {
  const [anuncioArr, setAnuncioArr] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fotoDePerfil, setFotoDePerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anounceAvailable, setAnounceAvailable] = useState(false);
  const naranjaQueDeOficios = '#fd5d13';
  let user = firebase.auth().currentUser;
  let id = user.uid;
  let idAnuncio, anuncioId, image, nombre, apellido, actividad, emailPersonal;

  const [eliminarAnuncioIsVisible, setEliminarAnuncioIsVisible] = useState(
    false
  );
  const [eliminarCuentaIsVisible, setEliminarCuentaIsVisible] = useState(false);

  const toggleEliminarAnuncio = () => {
    setEliminarAnuncioIsVisible(!eliminarAnuncioIsVisible);
  };

  const toggleEliminarCuenta = () => {
    setEliminarCuentaIsVisible(!eliminarCuentaIsVisible);
  };

  useEffect(() => {
    setLoading(true);

    firebase
      .database()
      .ref('anuncios/')
      .orderByChild('id')
      .equalTo(firebase.auth().currentUser.uid)
      .once('value', (snapshot) => {
        let anuncioArr = [];
        snapshot.forEach((childSnapshot) => {
          anuncioArr.push({
            nombre: childSnapshot.val().nombre,
            apellido: childSnapshot.val().apellido,
            actividad: childSnapshot.val().actividad,
            localidad: childSnapshot.val().localidad,
            provincia: childSnapshot.val().provincia,
            emailPersonal: childSnapshot.val().emailPersonal,
            idAnuncio: childSnapshot.val().id,
            anuncioId: childSnapshot.val().anuncioId,
            uuid: childSnapshot.val().uuid,
          });
          setAnuncioArr(anuncioArr);
        });
      });

    setLoading(false);
  }, []);

  function eliminarCuenta() {
    user
      .delete()
      .then(function () {
        Notifications.scheduleNotificationAsync({
          content: {
            title: '¡QuedeOficios! 📬',
            body: '¡Te esperamos Pronto!',
            data: { data: 'El equipo de ¡QuedeOficios!' },
          },
          trigger: { seconds: 2 },
        });
        Updates.reloadAsync();
      })
      .catch(function (error) {
        alert(
          'Hubo un error al eliminar su cuenta! por favor cierre sesión y vuelva a ingresar antes de intentarlo nuevamente.'
        );
      });
  }

  function shareContent() {
    Share.share(
      {
        message: `Mira mi perfil en ¡QuedeOficios!`,
        url: 'http://dominioquedeoficios.com',
        title: '¡QuedeOficios!',
      },
      {
        // Android only:
        dialogTitle: `Mira mi perfil en ¡QuedeOficios!`,
      }
    );
  }

  function eliminarAnuncio(anuncioId) {
    try {
      firebase
        .database()
        .ref(
          'usuarios/' +
            firebase.auth().currentUser.uid +
            '/anuncios/' +
            anuncioId
        )
        .once('value')
        .then(function (snapshot) {
          var promises = [];
          snapshot.forEach(function (child) {
            promises.push(child.ref.remove());
          });
          Promise.all(promises).then(function () {
            console.log('All removed!');
            setVisible(false);
          });
        });
      // Updates.reloadAsync();
    } catch (error) {
      console.log(error.message);
    }
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
              height: 20,
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
              marginTop: '8%',
              backgroundColor: 'transparent',
            },
          }),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfilePage')}
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
          }}>
          <MaterialCommunityIcons
            name='arrow-left'
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {anuncioArr.map((element, index) => {
          return loading ? (
            <LinearProgress
              color='black'
              trackColor='gray'
              type='indeterminate'
              style={{
                position: 'absolute',
              }}
            />
          ) : !anounceAvailable ? (
            <View>
              <Text>Tu anuncio no esta pago...</Text>
            </View>
          ) : (
            <CardMisAnuncios
              key={Math.max(index) + 1}
              idAnuncio={element.idAnuncio}
              anuncioId={element.anuncioId}
              uuid={element.uuid}
              nombre={element.nombre}
              apellido={element.apellido}
              actividad={element.actividad}
              local={element.direccionDelLocal}
              recomendacionesTotales={
                element.recomendacionesTotales > 0
                  ? element.recomendacionesTotales
                  : '0'
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnunciosPage;
