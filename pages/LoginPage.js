import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, CheckBox, Input, SocialIcon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/auth';
import * as RootNavigation from '../RootNavigation.js';

export default function LoginPage({ navigation }) {
  const [loginError, setLoginError] = useState(false);
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const toggle = React.useCallback(() => setChecked(!isChecked));
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = React.useCallback(() =>
    setShowPassword(!showPassword)
  );

  if (isChecked == true) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Error inesperado!');

        console.log(
          'Login error: ',
          ' code: ',
          errorCode,
          ' message: ',
          errorMessage
        );
      });
  }

  function loguearUsuarios(email, password) {
    var invalidEmailCode = 'FIRAuthErrorCodeInvalidEmail';
    var invalidPasswordCode = 'FIRAuthErrorCodeWrongPassword';
    var bannedUserCode = 'FIRAuthErrorCodeUserDisabled';
    var errorCodes = [invalidEmailCode, invalidPasswordCode, bannedUserCode];

    switch (errorCodes) {
      case errorCodes[0]:
        Alert.alert('Error al ingresar', 'Por favor verifique su email.');
        setLoginError(true);
        break;
      case errorCodes[1]:
        Alert.alert('Error al ingresar', 'Por favor verifique su clave.');
        setLoginError(true);
        break;
      case errorCodes[2]:
        Alert.alert('Error al ingresar', 'Su cuenta ha sido bloqueada.');
        setLoginError(true);
        break;
    }

    if (loginError) {
      return 'An error occurred';
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) =>
          Alert.alert('Error al ingresar', 'Por favor, compruebe sus datos.')
        );
    }
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setIsLogged(true);
      var email = user.email;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {
      setIsLogged(false);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
            height: '5%',
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/loginBackground.jpg')}
            style={{
              flex: 1,
              position: 'absolute',
              resizeMode: 'stretch',
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{ width: '80%', marginTop: 85 }}
            keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <Input
                placeholder='Correo Electrónico'
                keyboardType='email-address'
                autoCapitalize='none'
                inputContainerStyle={{
                  marginTop: 2,
                }}
                style={{ color: '#ffffff', fontSize: 16 }}
                leftIcon={<Icon name='envelope-o' size={18} color='white' />}
                onChangeText={(email) => setUserEmail(email)}
              />
              <Input
                placeholder='Contraseña'
                leftIcon={<Icon name='lock' size={20} color='white' />}
                style={{ color: '#ffffff', fontSize: 16 }}
                secureTextEntry={!showPassword}
                onChangeText={(password) => setUserPassword(password)}
              />
              <CheckBox
                title='Mostrar Contraseña'
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 2,
                  marginLeft: 0,
                }}
                textStyle={{ color: '#ffffff' }}
                checkedColor={'white'}
                onPress={togglePassword}
                checked={showPassword}
              />
              <CheckBox
                title='No cerrar sesión'
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 2,
                  marginLeft: 0,
                }}
                textStyle={{ color: '#ffffff' }}
                checkedColor={'white'}
                onPress={toggle}
                checked={isChecked}
              />
              <Button
                title='¿Olvidaste tu contraseña?'
                onPress={() =>
                  RootNavigation.navigate('RecuperarPasswordScreen')
                }
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 2,
                  marginLeft: 2,
                }}
                titleStyle={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 12,
                  fontStyle: 'italic',
                }}
              />
            </KeyboardAvoidingView>
          </View>
          <View
            style={{
              marginTop: Platform.OS === 'android' ? 2 : 10,
            }}>
            <Button
              title='Ingresar'
              onPress={() => loguearUsuarios(email, password)}
              buttonStyle={{
                height: 45,
                width: 180,
                backgroundColor: '#fd5d13',
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{ width: '70%', marginTop: 32 }}>
            <TouchableHighlight
              onPress={() => RootNavigation.navigate('RegisterPage')}>
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                No tienes cuenta? REGISTRATE
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export var user;
