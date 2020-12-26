import React, { Component, setState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
import {
  AirbnbRating,
  Avatar,
  Button,
  Card,
  Icon,
  Input,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as RootNavigation from '../RootNavigation.js';
import { StackActions } from '@react-navigation/native';

var itm = [];
var cardRender = [];

class MisFavoritosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: '',
      cardRenderizada: '',
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let favoritos, image, nombre, actividad, localidad, provincia;
    if (user) {
      firebase
        .database()
        .ref('favoritos/')
        .orderByKey()
        .equalTo(user.uid)
        .on('value', (snap) => {
          let items = [];
          snap.forEach((child) => {
            items.push({
              favoritos: child.val().favoritos,
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

      firebase
        .database()
        .ref('anuncios/')
        .orderByChild('id')
        //.equalTo(items.favoritos)
        .on('value', (snap) => {
          let cardRenderizada = [];
          snap.forEach((child) => {
            cardRenderizada.push({
              image: child.val().image,
              nombre: child.val().nombre,
              actividad: child.val().actividad,
              localidad: child.val().localidad,
              provincia: child.val().provincia,
            });
          });
          cardRender = cardRenderizada;
          this.setState({ cardRenderizada: cardRenderizada });
          console.log(cardRender);
          console.log('cardstate ' + this.state.cardRenderizada);
          itm.forEach((cardRender) => {
            console.log('title*' + cardRender.title);
          });
        });
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
          {this.state.cardRenderizada.map((u, i) => {
            return (
              <View
                key={i}
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
                {!image ? (
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
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
                    source={{ uri: image }}
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
                <View style={{ marginTop: '-8%' }}>
                  <AirbnbRating
                    size={18}
                    showRating={true}
                    reviews={['']}
                    type='star'
                    onFinishRating={(rating) => setRating(rating)}
                  />
                </View>
                <View style={{ margin: '3%' }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 30,
                      fontWeight: 'bold',
                    }}
                  >
                    {u.nombre}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: '-2%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 24,
                    }}
                  >
                    {u.actividad} -
                  </Text>
                  <MaterialCommunityIcons
                    name='account-group'
                    color={naranjaQueDeOficios}
                    size={22}
                    style={{ marginLeft: '3%' }}
                  />
                  <Text
                    style={{
                      color: '#8DB600',
                      textAlign: 'center',
                      fontSize: 14,
                      marginLeft: '2%',
                    }}
                  >
                    100
                  </Text>
                </View>
                <View style={{ marginTop: '5%' }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 16,
                    }}
                  >
                    {u.localidad} - {u.provincia}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    RootNavigation.navigate('AnuncioSeleccionado', {
                      id: u.idAnuncio,
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
                        name='hand'
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
            );
          })}
        </Card>
      </SafeAreaView>
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

export default MisFavoritosScreen;
