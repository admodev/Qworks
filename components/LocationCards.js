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
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{
              width: 85,
              height: 85,
              top: 20,
              left: 20,
              bottom: 20,
              position: 'absolute',
            }}
          />
          <View
            style={{
              marginTop: '7%',
              marginLeft: '45%',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.nombre.split(' ').shift()}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.actividad.trim()}
            </Text>
            <Text
              style={{
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
