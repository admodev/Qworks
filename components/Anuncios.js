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
import {
  Avatar,
  Button,
  Card,
  Icon,
  Input,
  Overlay,
} from 'react-native-elements';
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
import * as Notifications from 'expo-notifications';
import Dialog from 'react-native-dialog';
import RenderMisAnuncios from './RenderMisAnuncios';

var anuncioUnoItm = [];

const naranjaQueDeOficios = '#fd5d13';

const AnunciosPage = ({ route, navigation }) => {
  const [anuncioArr, setAnuncioArr] = useState([]);
  const [visible, setVisible] = useState(false);
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
            emailPersonal: childSnapshot.val().emailPersonal,
            idAnuncio: childSnapshot.val().id,
            anuncioId: childSnapshot.val().anuncioId,
          });
          setAnuncioArr(anuncioArr);
        });
      });
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

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
        }}
      >
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
        {anuncioArr.map((element, index) => {
          return (
            <View key={index}>
              <RenderMisAnuncios
                image={'https://picsum.photos/200/300'}
                name={element.nombre}
                email={element.emailPersonal}
                idAnuncio={firebase.auth().currentUser.uid}
                anuncioCount={element.anuncioId}
              />
            </View>
          );
        })}
      </ScrollView>
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
