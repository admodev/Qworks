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
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import FotoMapa from './FotoMapa';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1.0922;
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
            partidoLatitude: child.val().partidoLatitude,
            partidoLongitude: child.val().partidoLongitude,
            palabraClaveDos: child.val().palabraClaveDos,
            palabraClaveTres: child.val().palabraClaveTres,
            descripcionPersonal: child.val().descripcionPersonal,
            recomendacionesTotales: child.val().recomendacionesTotales,
            latitud: child.val().latitud,
            longitud: child.val().longitud,
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
        itm.actividad.toLowerCase().includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveUno
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveDos
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        itm.palabraClaveTres
          .toLowerCase()
          .includes(this.state.search.toLowerCase())
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
      <SafeAreaView style={{ flex: 35 }}>
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
              }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
                Cargando...
              </Text>
              <ActivityIndicator
                size='large'
                color='orange'
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
              ref={(ref) => {
                this.mapRef = ref;
              }}
              provider='google'
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              initialRegion={region}
              onUserLocationChange={(event) => console.log(event.nativeEvent)}
              showsUserLocation={this.state.showsUserLocation}
              fitToElements={true}>
              {this.state.search
                ? this.filterList(this.state.items).map((itm, i) => (
                    <Marker
                      coordinate={{
                        latitude: itm.partidoLatitude,
                        longitude: itm.partidoLongitude,
                      }}
                      pinColor={'#fd5d13'}
                      title={itm.nombre}
                      description={itm.actividad}
                      key={Math.max(i) + 1}
                      focusable={true}
                    />
                  ))
                : this.state.items.map((element, index) => {
                    return (
                      <Marker
                        coordinate={{
                          latitude: element.partidoLatitude,
                          longitude: element.partidoLongitude,
                        }}
                        pinColor={'#fd5d13'}
                        title={element.nombre}
                        description={element.actividad}
                        key={Math.max(index) + 1}
                        focusable={true}
                      />
                    );
                  })}
            </MapView>
          )}
          <Input
            placeholder='Buscar en Qworks!'
            containerStyle={{
              ...Platform.select({
                android: {
                  position: 'absolute',
                  top: 50,
                  left: 20,
                  maxWidth: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: 50,
                  height: 40,
                },
                ios: {
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  maxWidth: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: 50,
                  height: 40,
                },
              }),
            }}
            inputStyle={{
              justifyContent: 'center',
              marginLeft: '25%',
            }}
            inputContainerStyle={{
              borderWidth: 0,
              border: 0,
              borderBottomWidth: 0,
            }}
            placeholderTextColor='#000000'
            onChangeText={(search) => this.setState({ search })}
          />
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
        height: SCREEN_HEIGHT,
      },
      ios: {
        height: SCREEN_HEIGHT,
      },
    }),
  },
});

export default MapComponent;
