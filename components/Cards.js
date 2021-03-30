import React, { Component, useState, setState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
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
import 'firebase/storage';
import 'firebase/auth';
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';
import CardSearchRender from './SearchRender';
import CardAnuncio from './CardAnuncio';

const defaultPhoto = '../assets/icon.png';
var itm = [];
var foto = [];
var fotosDePerfil = [];

class CardsUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: '',
      fotoDePerfil: [],
      userProfilePicture: null,
      anunciosFound: [],
      fotoDelAnuncio: [],
    };
    this.setState.bind(this);
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
            uuid: child.val().uuid,
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        user == null;
      }
    });
  }

  filterList(items) {
    return items.filter(
      (itm) =>
        itm.nombre.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.apellido.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.actividad.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveUno
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveDos
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveTres
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.descripcionPersonal
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.localidad.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.provincia.toLowerCase().includes(this.state.search.toLowerCase())
    );
  }

  render() {
    const closeControlPanel = () => {
      _drawer.close();
    };
    const openControlPanel = () => {
      _drawer.open();
    };
    var user = firebase.auth().currentUser;

    const naranjaQueDeOficios = '#fd5d13';

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={openControlPanel}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                position: 'absolute',
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: 20,
                width: '80%',
                alignSelf: 'center',
              }}
            >
              <Image
                source={require('../assets/icon.png')}
                style={{
                  width: 35,
                  height: 35,
                  marginTop: -15,
                  marginLeft: 10,
                }}
              />
              <Input
                placeholder="Buscar en  ¡QuedeOficios!"
                inputStyle={{
                  justifyContent: 'center',
                  marginLeft: 25,
                  marginTop: -10,
                }}
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                placeholderTextColor="#000000"
                onChangeText={(search) => this.setState({ search })}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openControlPanel}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: '8%',
                alignSelf: 'center',
                width: '80%',
              }}
            >
              <Image
                source={require('../assets/icon.png')}
                style={{
                  width: 35,
                  height: 35,
                  marginTop: -15,
                  marginLeft: 10,
                }}
              />
              <Input
                placeholder="Buscar en  ¡QuedeOficios!"
                inputStyle={{
                  justifyContent: 'center',
                  marginLeft: 25,
                  marginTop: -10,
                }}
                containerStyle={{ marginLeft: 10, marginTop: -10 }}
                placeholderTextColor="#000000"
                onChangeText={(search) => this.setState({ search })}
              />
            </View>
          </TouchableOpacity>
        )}
        {this.state.search
          ? this.filterList(this.state.items).map((itm, i) => (
              <CardSearchRender
                key={itm.uuid + i}
                image={require('../assets/icon.png')}
                name={itm.nombre}
                actividad={itm.actividad}
                idAnuncio={itm.idAnuncio}
                uuid={itm.uuid}
              />
            ))
          : this.state.items.map((element, index) => {
              return (
                <CardAnuncio
                  image={{ uri: 'https://picsum.photos/200/300' }}
                  nombre={element.nombre}
                  actividad={element.actividad}
                  recomendacionesTotales={element.recomendacionesTotales}
                  localidad={element.localidad}
                  provincia={element.provincia}
                  idAnuncio={element.idAnuncio}
                  uuid={element.uuid}
                  key={element.uuid + index}
                  rating={element.rating}
                />
              );
            })}
      </SafeAreaView>
    );
  }
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

export default CardsUsuarios;
