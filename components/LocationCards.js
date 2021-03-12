import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
import { Avatar, Button, Card, Icon, Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

var itm = [];

class LocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: '',
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      showsUserLocation: true,
      followsUserLocation: true,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('anuncios/')
      .orderByKey()
      .on('value', (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            anuncioId: child.val().anuncioId,
            nombre: child.val().nombre,
            apellido: child.val().apellido,
            actividad: child.val().actividad,
            emailPersonal: child.val().emailPersonal,
            idAnuncio: child.val().id,
            contadorAnuncio: child.val().anuncioId,
            localidad: child.val().localidad,
            provincia: child.val().provincia,
            palabraClaveUno: child.val().palabraClaveUno,
            palabraClaveDos: child.val().palabraClaveDos,
            palabraClaveTres: child.val().palabraClaveTres,
            descripcionPersonal: child.val().descripcionPersonal,
            recomendacionesTotales: child.val().recomendacionesTotales,
          });
        });
        itm = items;
        this.setState({ items: items });
        console.log(itm);
        console.log('itemstate ' + this.state.items);
        itm.forEach((itms) => {
          console.log('title*' + itms.title);
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.items.map((element) => {
          return (
            <View key={element.idAnuncio}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                {element.nombre}
              </Text>
            </View>
          );
        })}
      </SafeAreaView>
    );
  }
}

export default LocationComponent;
