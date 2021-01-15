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

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class UbicacionPage extends Component {
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

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={styles.scrollview}
          >
            {!this.state.ready && (
              <View
                style={{
                  ...Platform.select({
                    android: {
                      padding: 10,
                      marginTop: '10%',
                    },
                    ios: {
                      padding: 10,
                      marginTop: '20%',
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
              >
                {
                  //<MapView.Marker
                  //title={firebase.auth().currentUser.displayName}
                  //description="A tu alrededor encontrarás profesionales cercanos."
                  //coordinate={region}
                  //>
                  //<MaterialCommunityIcons
                  //name="account"
                  //color={'#fd5d13'}
                  //size={32}
                  ///>
                  //</MapView.Marker>
                }
              </MapView>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    width: SCREEN_WIDTH,
    height: 500,
    marginTop: '5%',
  },
});

export default UbicacionPage;
