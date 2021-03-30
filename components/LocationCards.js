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

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#ffffff',
          width: '100%',
          height: '90%',
          alignSelf: 'center',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {this.props.nombre}
        </Text>
      </View>
    );
  }
}

export default LocationComponent;
