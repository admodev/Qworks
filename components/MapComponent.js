import React, { useEffect, useState } from 'react';
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
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var region = {};

const MapComponent = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [ready, setReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const showsUserLocation = true;
  const followsUserLocation = true;

  useEffect(() => {
    firebase
      .database()
      .ref('anuncios/')
      .orderByKey()
      .on('value', (snap) => {
        let itemsArr = [];
        snap.forEach((child) => {
          itemsArr.push({
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
        setItems(itemsArr);
      });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Cargando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    region = {
      latitude: parseFloat(location.coords.latitude),
      longitude: parseFloat(location.coords.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }

  function filterList(items) {
    return items.filter(
      (itm) =>
        itm.actividad.toLowerCase().includes(search.toLowerCase()) ||
        itm.palabraClaveUno.toLowerCase().includes(search.toLowerCase()) ||
        itm.palabraClaveDos.toLowerCase().includes(search.toLowerCase()) ||
        itm.palabraClaveTres.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <SafeAreaView style={{ flex: 35 }}>
      <View style={styles.container}>
        {items.length <= 0 && (
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
        {items.length > 0 && (
          <MapView
            provider='google'
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            initialRegion={region}
            // onUserLocationChange={(event) => console.log(event.nativeEvent)}
            showsUserLocation={showsUserLocation}
            fitToElements={true}>
            {search
              ? filterList(items).map((itm, i) => (
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
              : items.map((element, index) => {
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
          placeholder='Buscar en Q works!'
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
          onChangeText={(search) => setSearch(search)}
        />
      </View>
    </SafeAreaView>
  );
};

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
