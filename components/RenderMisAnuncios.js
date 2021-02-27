import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AirbnbRating, Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation.js';

const naranjaQueDeOficios = '#fd5d13';

class RenderMisAnuncios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }
  render() {
    return (
      <Card
        style={styles.card}
        containerStyle={{
          ...Platform.select({
            android: {
              padding: 0,
              borderRadius: 15,
              backgroundColor: 'transparent',
              borderWidth: 0,
              marginTop: '2%',
              elevation: 0,
            },
            ios: {
              padding: 0,
              borderRadius: 15,
              backgroundColor: 'transparent',
              borderWidth: 0,
              marginTop: '10%',
              elevation: 0,
              width: '85%',
              alignSelf: 'center',
            },
          }),
        }}
      >
        <View
          style={{
            ...Platform.select({
              android: {
                margin: 20,
                backgroundColor: 'transparent',
              },
              ios: {
                margin: 20,
                marginTop: '8%',
                backgroundColor: 'transparent',
              },
            }),
          }}
        >
          <Image
            source={require('../assets/patron.jpg')}
            style={{
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
          />
          <Image
            source={require('../assets/gradients/20x20.png')}
            style={{
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '100%',
              opacity: 0.9,
              borderRadius: 10,
            }}
          />
          {!this.props.image ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Card.Image
                source={require('../assets/icon.png')}
                style={{
                  ...Platform.select({
                    android: {
                      borderRadius: 25,
                      marginTop: '8%',
                      marginBottom: '10%',
                      width: 140,
                      height: 120,
                    },
                    ios: {
                      borderRadius: 25,
                      marginTop: '8%',
                      marginBottom: '10%',
                      width: 120,
                      height: 90,
                    },
                  }),
                }}
              />
            </View>
          ) : (
            <Card.Image
              source={{ uri: this.props.image }}
              style={{
                ...Platform.select({
                  android: {
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 20,
                    marginLeft: 60,
                    marginRight: 60,
                  },
                  ios: {
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 20,
                    marginLeft: 60,
                    marginRight: 60,
                  },
                }),
              }}
            />
          )}
          <View style={{ margin: '3%' }}>
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {this.props.name}
            </Text>
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              {this.props.email}
            </Text>
          </View>
        </View>
      </Card>
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

export default RenderMisAnuncios;
