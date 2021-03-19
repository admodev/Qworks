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

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var itm = [];

class MapComponent extends Component {
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
    console.log(position);
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
    var latitud = parseFloat(this.state.where.lat);
    var longitud = parseFloat(this.state.where.lng);

    const region = {
      latitude: latitud,
      longitude: longitud,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const closeControlPanel = () => {
      _drawer.close();
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {!this.state.ready && (
            <View
              style={{
                ...Platform.select({
                  android: {
                    padding: 10,
                    marginTop: '10%',
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                  ios: {
                    padding: 10,
                    marginTop: '20%',
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                }),
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}
              >
                Cargando...
              </Text>
              <ActivityIndicator
                size="large"
                color="orange"
                style={{
                  ...Platform.select({
                    android: {
                      marginBottom: '50%',
                    },
                  }),
                }}
              />
            </View>
          )}
          {this.state.error && <Text>{this.state.error}</Text>}
          {this.state.ready && (
            <MapView
              provider={this.props.provider}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              initialRegion={region}
              onUserLocationChange={(event) => console.log(event.nativeEvent)}
              showsUserLocation={this.state.showsUserLocation}
              followsUserLocation={this.state.followsUserLocation}
            ></MapView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...Platform.select({
      android: {
        marginTop: '-35%',
        height: SCREEN_HEIGHT,
      },
      ios: {
        marginTop: '-35%',
        height: SCREEN_HEIGHT,
      },
    }),
  },
});

export default MapComponent;
