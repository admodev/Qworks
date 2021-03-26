import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import {
  AirbnbRating,
  Card,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation.js';

class CardAnuncio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        }
    }

    render() {
        const naranjaQueDeOficios = '#fd5d13';

        return(
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
                    <View
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Card.Image
                        source={this.props.image}
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
                  <View style={{ marginTop: '-8%' }}>
                    <AirbnbRating
                      size={18}
                      showRating={true}
                      reviews={['']}
                      type="star"
                      // onFinishRating={this.setState({ rating: rating })}
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
                      {this.props.nombre}
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
                      {this.props.actividad} -
                    </Text>
                    <MaterialCommunityIcons
                      name="account-group"
                      color={naranjaQueDeOficios}
                      size={22}
                      style={{ marginLeft: '3%' }}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        RootNavigation.navigate('RecomendacionesRenderizadas')
                      }
                    >
                      <Text
                        style={{
                          color: '#8DB600',
                          textAlign: 'center',
                          fontSize: 14,
                          marginLeft: '2%',
                        }}
                      >
                        {!this.props.recomendacionesTotales
                          ? 0
                          : this.props.recomendacionesTotales}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                      }}
                    >
                      {this.props.localidad} - {this.props.provincia}
                    </Text>
                  </View>
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
          </Card>
        )
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

export default CardAnuncio;