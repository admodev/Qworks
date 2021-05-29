import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Font from 'expo-font';
import { StackActions } from '@react-navigation/native';

export default function Qdrives({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        comfortaaLight: require('../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
        comfortaaRegular: require('../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
  }, []);

  return (
    <SafeAreaView>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '5%',
            },
            ios: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '4%',
            },
          }),
        }}
      />
      <View
        style={{
          width: '90%',
          height: '80%',
          alignSelf: 'center',
          marginTop: '25%',
          backgroundColor: '#ffffff',
          border: 1,
          borderColor: 'black',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'comfortaaLight',
            fontSize: 34,
            textAlign: 'center',
            marginTop: 25,
          }}>
          ¡Oops!
        </Text>
        <Text
          style={{
            fontFamily: 'comfortaaLight',
            fontSize: 22,
            margin: 20,
            textAlign: 'justify',
          }}>
          Estamos desarrollando mejoras para ti...prepárate!
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/shipping-truck.png')}
            style={{
              ...Platform.select({
                android: {
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                },
                ios: {
                  width: 180,
                  height: 180,
                  alignSelf: 'center',
                },
              }),
            }}
          />
          <Text
            style={{
              ...Platform.select({
                android: {
                  fontFamily: 'comfortaaLight',
                  color: '#fd5d13',
                  fontSize: 28,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  margin: 20,
                },
                ios: {
                  fontFamily: 'comfortaaLight',
                  color: '#fd5d13',
                  fontSize: 28,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  margin: 20,
                },
              }),
            }}>
            Atrás
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
