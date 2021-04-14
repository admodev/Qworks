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
import * as Font from 'expo-font';
import * as RootNavigation from '../RootNavigation';

var itm = [];

class LocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
    this.setState.bind(this);
  }

  async loadFonts() {
    await Font.loadAsync({
      // Nombres, apellidos, títulos y subtítulos
      dmSans: require('../assets/fonts/DM_Sans/DMSans-Regular.ttf'),
      dmSansBold: require('../assets/fonts/DM_Sans/DMSans-Bold.ttf'),

      // Comunicación interna y externa
      quickSandLight: require('../assets/fonts/Quicksand/static/Quicksand-Light.ttf'),
      quickSandRegular: require('../assets/fonts/Quicksand/static/Quicksand-Regular.ttf'),

      // Para lo demás
      comfortaaLight: require('../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
      comfortaaRegular: require('../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    const naranjaQueDeOficios = '#fd5d13';

    return (
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#ffffff',
          width: '100%',
          height: '85%',
          alignSelf: 'center',
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: '102%',
          }}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{
              width: 120,
              height: '100%',
              top: -2,
              left: 0,
              position: 'absolute',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
          <View
            style={{
              marginTop: '3%',
              marginLeft: '50%',
            }}
          >
            <Text
              style={{
                fontFamily: 'dmSans',
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.nombre.split(' ').shift()}
            </Text>
            <Text
              style={{
                fontFamily: 'dmSans',
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.actividad.trim()}
            </Text>
            <Text
              style={{
                fontFamily: 'comfortaaLight',
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.local.trim()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                RootNavigation.navigate('AnuncioSeleccionado', {
                  id: this.props.idAnuncio,
                  uuid: this.props.uuid,
                  index: this.props.key,
                });
              }}
              style={{
                borderRadius: 25,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: '5%',
                marginTop: '3%',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '#ffffff',
                width: 150,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: '5%',
                }}
              >
                <View style={{ marginLeft: '10%', marginBottom: '8%' }}>
                  <MaterialCommunityIcons
                    name="hand"
                    color={naranjaQueDeOficios}
                    size={20}
                  />
                </View>
                <Text
                  style={{
                    color: naranjaQueDeOficios,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: 16,
                    marginLeft: '3%',
                    marginBottom: '8%',
                    fontWeight: 'bold',
                  }}
                >
                  ¡Conóceme!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default LocationComponent;
