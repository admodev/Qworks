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
          </View>
        </View>
      </View>
    );
  }
}

export default LocationComponent;
