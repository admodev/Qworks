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
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';
import SearchedCardResult from './searchedCard';
import MapView from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MapComponent from './MapComponent';
import LocationComponent from './LocationCards';
import LocationSearch from './LocationSearchBar';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var itm = [];
var funcItm = [];

class ControlPanel extends React.Component {
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
    functionalItems = [];

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
            direccionDelLocal: child.val().direccionDelLocal,
            uuid: child.val().uuid,
          });
        });
        itm = items;
        funcItm = items;
        this.setState({ items: items });
      });

    this.setState({ ready: false, error: null });

    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24,
    };
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = (position) => {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  };
  geoFailure = (error) => {
    this.setState({ error: err.message });
  };

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
    const naranjaQueDeOficios = '#fd5d13';

    const closeControlPanel = () => {
      _drawer.close();
    };
    const openControlPanel = () => {
      _drawer.open();
    };

    var latitud = parseFloat(this.state.where.lat);
    var longitud = parseFloat(this.state.where.lng);

    const region = {
      latitude: latitud,
      longitude: longitud,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <MapComponent />
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
            height: Platform.OS === 'android' ? '5%' : '4%',
          }}
        />
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.items}
          renderItem={({ item, index }) => (
            <LocationComponent
              key={Math.max(index) + 1}
              idAnuncio={item.idAnuncio}
              anuncioId={item.anuncioId}
              uuid={item.uuid}
              nombre={item.nombre}
              apellido={item.apellido}
              actividad={item.actividad}
              local={item.direccionDelLocal}
              localidad={item.localidad}
              recomendacionesTotales={
                item.recomendacionesTotales > 0
                  ? item.recomendacionesTotales
                  : '0'
              }
            />
          )}
          sliderWidth={360}
          itemWidth={310}
          layout={'default'}
        />
      </SafeAreaView>
    );
  }
}

export default ControlPanel;
