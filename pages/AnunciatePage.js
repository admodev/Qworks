/*

Author: admodev (Adolfo Hector Moyano) from ExegesisBA.

*/

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  CheckBox,
  Input,
  Overlay,
  Text,
} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { DOTLOCATION } from '@env';

const AnunciatePage = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const id = user.uid;
  const uuid = uuidv4();
  const [formValues, setFormValues] = useState({
    location: null,
    errorMsg: null,
    ready: false,
    error: null,
    image: null,
    anunciosCountResult: anunciosCountResult,
    imageUrlResponse: '',
    nombre: '',
    apellido: '',
    cuitCuil: '',
    dni: '',
    actividad: '',
    telefono: '',
    celular: '',
    localidad: '',
    localidadLatitude: '',
    localidadLongitude: '',
    partido: '',
    partidoLatitude: 0,
    partidoLongitude: 0,
    local: '',
    empresa: '',
    factura: '',
    direccionDelLocal: '',
    nombreDeLaEmpresa: '',
    matricula: '',
    numeroDeMatricula: '',
    emailLaboral: '',
    descripcionPersonal: ``,
    palabraClaveUno: '',
    palabraClaveDos: '',
    palabraClaveTres: '',
    diasHorarios: [],
    desde: '',
    hasta: '',
    efectivo: false,
    pagosDigitales: false,
    uploadedImage: null,
    uploading: false,
    transferred: 0,
    visible: false,
    terminos: false,
    lunesChecked: false,
    martesChecked: false,
    miercolesChecked: false,
    juevesChecked: false,
    viernesChecked: false,
    sabadoChecked: false,
    domingoChecked: false,
    lunesViernesChecked: false,
    dateDesde: '',
    dateHasta: '',
    where: {
      lat: null,
      lng: null,
    },
  });

  const toggleEfectivo = React.useCallback(() =>
    setFormValues({
      ...formValues,
      efectivo: !formValues.efectivo,
    })
  );

  const togglePagosDigitales = React.useCallback(() =>
    setFormValues({
      ...formValues,
      pagosDigitales: !formValues.pagosDigitales,
    })
  );

  const toggleTerminos = React.useCallback(() =>
    setFormValues({
      ...formValues,
      terminos: !formValues.terminos,
    })
  );

  const toggleLunesChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      lunesChecked: !formValues.lunesChecked,
    })
  );

  const toggleMartesChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      martesChecked: !formValues.martesChecked,
    })
  );

  const toggleMiercolesChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      miercolesChecked: !formValues.miercolesChecked,
    })
  );

  const toggleJuevesChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      juevesChecked: !formValues.juevesChecked,
    })
  );

  const toggleViernesChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      viernesChecked: !formValues.viernesChecked,
    })
  );

  const toggleSabadoChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      sabadoChecked: !formValues.sabadoChecked,
    })
  );

  const toggleDomingoChecked = React.useCallback(() =>
    setFormValues({
      ...formValues,
      domingoChecked: !formValues.domingoChecked,
    })
  );

  const toggleLunesViernesChecked = React.useCallback(() => {
    setFormValues({
      ...formValues,
      lunesViernesChecked: !formValues.lunesViernesChecked,
    });
  });

  const toggleOverlay = () => {
    setFormValues({
      ...formValues,
      visible: !formValues.visible,
    });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permiso',
            '¡Perdón, necesitamos acceder a la galería para que pueda subir una foto!'
          );
        }
      }
    })();

    setFormValues({
      ...formValues,
      ready: false,
      error: null,
    });

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24,
    };

    const geoSuccess = (position) => {
      setFormValues({
        ...formValues,
        ready: true,
        where: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    };

    const geoFailure = (error) => {
      setFormValues({
        ...formValues,
        error: error.message,
      });
    };

    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  let anunciosIdsCount = [];

  const idRefAnuncios = () => {
    return firebase
      .database()
      .ref('anuncios/')
      .on('value', (snap) => {
        snap.forEach((child) => {
          anunciosIdsCount.push({
            ids: child.val().id,
          });
        });
      });
  };

  const anunciosCount = anunciosIdsCount.reduce(
    (arr, elem) => arr.concat(elem.ids),
    []
  );

  function countTrue(array) {
    var trueCounter = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === id) {
        trueCounter.push(array[i]);
      }
    }
    return trueCounter.length;
  }

  let anunciosCountResult = countTrue(anunciosCount);

  const concatLunes = () => {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Lunes'),
    });
    toggleLunesChecked();
  };

  const concatMartes = () => {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Martes'),
    });
    toggleMartesChecked();
  };

  const concatMiercoles = () => {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Miercoles'),
    });
    toggleMiercolesChecked();
  };

  function concatJueves() {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Jueves'),
    });
    toggleJuevesChecked();
  }

  function concatViernes() {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Viernes'),
    });
    toggleViernesChecked();
  }

  function concatSabado() {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Sabado'),
    });
    toggleSabadoChecked();
  }

  function concatDomingo() {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Domingo'),
    });
    toggleDomingoChecked();
  }

  function concatLunesViernes() {
    setFormValues({
      ...formValues,
      diasHorarios: formValues.diasHorarios.concat('Lunes a Viernes'),
    });
    toggleLunesViernesChecked();
  }

  const pickImage = async () => {
    var token = Cookies.get('csrftoken');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setFormValues({
        ...formValues,
        image: result.uri.toString(),
      });

      const response = await fetch(result.uri);

      const blob = new Blob([response.blob()], { type: 'image/jpeg' });

      const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);

      const uploadUri =
        Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;

      setFormValues({
        ...formValues,
        uploading: true,
        transferred: 0,
      });

      const data = new FormData();

      data.append('file', blob);

      data.append('filename', filename);

      const task = fetch('http://192.168.0.20:5000/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          setFormValues({
            ...formValues,
            imageUrlResponse: `http://192.168.0.20:5000/${body.file}`,
          });
        });
      });

      try {
        await task;
      } catch (e) {
        console.error(e);
      }

      setFormValues({
        ...formValues,
        uploading: false,
      });
    }
  };

  function writeUserData() {
    if (!formValues.cuitCuil.trim()) {
      Alert.alert('¡Atención!', 'Por favor ingrese su cuit/cuil');
      return;
    } else if (!formValues.dni.trim()) {
      Alert.alert('¡Atención!', 'Por favor ingrese su DNI');
      return;
    } else if (formValues.terminos == false) {
      Alert.alert(
        '¡Atención!',
        'Tiene que aceptar los terminos para continuar'
      );
      return;
    } else {
      setFormValues({
        ...formValues,
        anunciosCountResult: formValues.anunciosCountResult + 1,
      });

      firebase
        .database()
        .ref(
          'anuncios/' + firebase.auth().currentUser.uid + anunciosCountResult
        )
        .set({
          anuncioId: anunciosCountResult,
          id: user.uid,
          nombre: formValues.nombre,
          apellido: formValues.apellido,
          emailPersonal: firebase.auth().currentUser.email,
          cuitCuil: formValues.cuitCuil,
          dni: formValues.dni,
          actividad: formValues.actividad,
          telefono: formValues.telefono,
          celular: formValues.celular,
          localidad: formValues.localidad,
          localidadLatitude: formValues.localidadLatitude,
          localidadLongitude: formValues.localidadLongitude,
          partido: formValues.partido,
          partidoLatitude: formValues.partidoLatitude,
          partidoLongitude: formValues.partidoLongitude,
          local: formValues.local,
          empresa: formValues.empresa,
          factura: formValues.factura,
          direccionDelLocal: formValues.direccionDelLocal,
          nombreDeLaEmpresa: formValues.nombreDeLaEmpresa,
          matricula: formValues.matricula,
          numeroDeMatricula: formValues.numeroDeMatricula,
          emailLaboral: formValues.emailLaboral,
          descripcionPersonal: formValues.descripcionPersonal,
          palabraClaveUno: formValues.palabraClaveUno,
          palabraClaveDos: formValues.palabraClaveDos,
          palabraClaveTres: formValues.palabraClaveTres,
          diasHorarios: formValues.diasHorarios,
          desde: formValues.dateDesde,
          hasta: formValues.dateHasta,
          terminos: formValues.terminos,
          latitud: formValues.where.lat,
          longitud: formValues.where.lng,
          uuid: uuid,
        })
        .then(function () {
          navigation.navigate('Anuncios');
        })
        .catch(function (error) {
          Alert.alert(
            '¡Atención!',
            'Hubo un error al subir su anuncio, por favor compruebe sus datos e intentelo nuevamente.'
          );
        });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF6E6' }}>
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
              height: '3%',
            },
          }),
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          ...Platform.select({
            android: {
              backgroundColor: 'transparent',
              marginTop: '10%',
              marginLeft: '5%',
            },
            ios: {
              backgroundColor: 'transparent',
              marginTop: '10%',
              marginLeft: '5%',
            },
          }),
        }}>
        <MaterialCommunityIcons
          name='arrow-left'
          color={'#fd5d13'}
          size={32}
          style={{ backgroundColor: 'transparent' }}
        />
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps='always'>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 30, marginBottom: 25 }}>
            Foto de Perfil
          </Text>
          {formValues.image && (
            <Avatar
              source={{ uri: formValues.image }}
              size='xlarge'
              avatarStyle={{ borderRadius: 25 }}
            />
          )}
          {formValues.uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={formValues.transferred} width={300} />
            </View>
          ) : (
            <Button
              buttonStyle={{
                marginTop: 10,
                marginLeft: '2%',
                backgroundColor: '#F4743B',
              }}
              title='Subir foto'
              onPress={pickImage}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}>
            Información Personal
          </Text>
          {formValues.image ? (
            <Image
              source={{ uri: formValues.image }}
              style={{
                position: 'absolute',
                with: 300,
                height: 300,
              }}
            />
          ) : (
            <Text>No image!</Text>
          )}
          <Input
            placeholder='Nombre *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(nombre) =>
              setFormValues({
                ...formValues,
                nombre: nombre,
              })
            }
          />
          <Input
            placeholder='Apellido *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(apellido) =>
              setFormValues({
                ...formValues,
                apellido: apellido,
              })
            }
          />
          <Input
            placeholder='Email Personal'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            disabled
            value={firebase.auth().currentUser.email}
          />
          <Input
            placeholder='DNI *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='numeric'
            onChangeText={(dni) =>
              setFormValues({
                ...formValues,
                dni: dni,
              })
            }
          />
          <Input
            placeholder='CUIL / CUIT *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='numeric'
            onChangeText={(cuitCuil) =>
              setFormValues({
                ...formValues,
                cuitCuil: cuitCuil,
              })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}>
            Información Laboral
          </Text>
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Actividad *'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(actividad) =>
                setFormValues({
                  ...formValues,
                  actividad: actividad,
                })
              }
              maxLength='15'
            />
          ) : (
            <Input
              placeholder='Actividad *'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(actividad) =>
                setFormValues({
                  ...formValues,
                  actividad: actividad,
                })
              }
              maxLength={15}
            />
          )}
          <Input
            placeholder='Teléfono'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='phone-pad'
            onChangeText={(telefono) =>
              setFormValues({
                ...formValues,
                telefono: telefono,
              })
            }
          />
          <Input
            placeholder='Celular'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='phone-pad'
            onChangeText={(celular) =>
              setFormValues({
                ...formValues,
                celular: celular,
              })
            }
          />
          <Input
            placeholder='Email laboral'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(emailLaboral) =>
              setFormValues({
                ...formValues,
                emailLaboral: emailLaboral,
              })
            }
          />
          <GooglePlacesAutocomplete
            placeholder='Localidad'
            minLength={2}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details) => {
              setFormValues({
                ...formValues,
                localidad: data.description,
                localidadLatitude: details.geometry.location.lat,
                localidadLongitude: details.geometry.location.lng,
              });
            }}
            query={{
              key: DOTLOCATION,
              language: 'es-419',
            }}
            textInputProps={{ placeholderTextColor: 'black' }}
            styles={{
              textInputContainer: {
                width: '95%',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
                marginTop: '-2%',
                marginBottom: '5%',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: 'transparent',
                textAlign: 'center',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            listViewDisplayed={false}
            onFail={(error) => console.error(error)}
          />
          <GooglePlacesAutocomplete
            placeholder='Partido'
            minLength={2}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details) => {
              setFormValues({
                ...formValues,
                partido: data.description,
                partidoLatitude: details.geometry.location.lat,
                partidoLongitude: details.geometry.location.lng,
              });
            }}
            query={{
              key: DOTLOCATION,
              language: 'es-419',
            }}
            textInputProps={{ placeholderTextColor: 'black' }}
            styles={{
              textInputContainer: {
                width: '95%',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
                marginTop: '-2%',
                marginBottom: '5%',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: 'transparent',
                textAlign: 'center',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            listViewDisplayed={false}
            onFail={(error) => console.error(error)}
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Local (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(local) =>
                setFormValues({
                  ...formValues,
                  local: local,
                })
              }
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Local (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(local) =>
                setFormValues({
                  ...formValues,
                  local: local,
                })
              }
              maxLength={2}
            />
          )}
          <Input
            placeholder='Dirección del local'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(direccionDelLocal) =>
              setFormValues({
                ...formValues,
                direccionDelLocal: direccionDelLocal,
              })
            }
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Empresa (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(empresa) =>
                setFormValues({
                  ...formValues,
                  empresa: empresa,
                })
              }
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Empresa (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(empresa) =>
                setFormValues({
                  ...formValues,
                  empresa: empresa,
                })
              }
              maxLength={2}
            />
          )}
          <Input
            placeholder='Nombre de la empresa'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(nombreDeLaEmpresa) =>
              setFormValues({
                ...formValues,
                nombreDeLaEmpresa: nombreDeLaEmpresa,
              })
            }
          />
          <Input
            placeholder='Factura (Tipo)'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(factura) =>
              setFormValues({
                ...formValues,
                factura: factura,
              })
            }
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Matrícula (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(matricula) =>
                setFormValues({
                  ...formValues,
                  matricula: matricula,
                })
              }
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Matrícula (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(matricula) =>
                setFormValues({
                  ...formValues,
                  matricula: matricula,
                })
              }
              maxLength={2}
            />
          )}
          <Input
            placeholder='Número de matrícula'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='numeric'
            onChangeText={(numeroDeMatricula) =>
              setFormValues({
                ...formValues,
                numeroDeMatricula: numeroDeMatricula,
              })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text h3 style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Resumen Personal
          </Text>
          <Input
            placeholder='Ingrese una descripción personal...'
            placeholderTextColor={'black'}
            style={{
              height: 200,
              width: '80%',
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 15,
              color: '#000000',
              margin: 10,
              textAlignVertical: 'top',
              textAlign: 'center',
            }}
            inputStyle={{ color: '#000000' }}
            inputContainerStyle={{ borderBottomWidth: 0, margin: '5%' }}
            placeholderTextColor='black'
            multiline={true}
            onChangeText={(descripcionPersonal) =>
              setFormValues({
                ...formValues,
                descripcionPersonal: descripcionPersonal,
              })
            }
            paddingTop={20}
            paddingRight={50}
            paddingLeft={50}
            maxLength={150}
          />
          <Text h4 style={{ color: '#000000' }}>
            Palabras clave
          </Text>
          <View style={{ flexDirection: 'row', marginTop: '10%' }}>
            <Input
              placeholder='#Uno'
              onChangeText={(palabraClaveUno) =>
                setFormValues({
                  ...formValues,
                  palabraClaveUno: palabraClaveUno,
                })
              }
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
            <Input
              placeholder='#Dos'
              onChangeText={(palabraClaveDos) =>
                setFormValues({
                  ...formValues,
                  palabraClaveDos: palabraClaveDos,
                })
              }
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
            <Input
              placeholder='#Tres'
              onChangeText={(palabraClaveTres) =>
                setFormValues({
                  ...formValues,
                  palabraClaveTres: palabraClaveTres,
                })
              }
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text h3 style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Dias y horarios
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <CheckBox
              title='Lunes'
              onPress={() => concatLunes()}
              checked={formValues.lunesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
            <CheckBox
              title='Martes'
              onPress={() => concatMartes()}
              checked={formValues.martesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
            <CheckBox
              title='Miercoles'
              onPress={() => concatMiercoles()}
              checked={formValues.miercolesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <CheckBox
              title='Jueves'
              onPress={() => concatJueves()}
              checked={formValues.juevesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
            <CheckBox
              title='Viernes'
              onPress={() => concatViernes()}
              checked={formValues.viernesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
            <CheckBox
              title='Sábado'
              onPress={() => concatSabado()}
              checked={formValues.sabadoChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              title='Domingo'
              onPress={() => concatDomingo()}
              checked={formValues.domingoChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
            <CheckBox
              title='Lunes a Viernes'
              onPress={() => concatLunesViernes()}
              checked={formValues.lunesViernesChecked}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                marginTop: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textStyle={{ color: '#000000' }}
              checkedColor={'#fd5d13'}
            />
          </View>
          <View style={{ width: '80%' }}>
            <Input
              placeholder='Desde'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              keyboardType='numeric'
              onChangeText={(dateDesde) =>
                setFormValues({
                  ...formValues,
                  dateDesde: dateDesde,
                })
              }
            />
            <Input
              placeholder='Hasta'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              keyboardType='numeric'
              onChangeText={(dateHasta) =>
                setFormValues({
                  ...formValues,
                  dateHasta: dateHasta,
                })
              }
            />
          </View>
        </View>
        <Text
          h3
          style={{ color: '#000', textAlign: 'center', marginTop: '5%' }}>
          ¿Qué medios de pago aceptas?
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}>
          <MaterialCommunityIcons
            name='cash-usd'
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title='Efectivo'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={toggleEfectivo}
            checked={formValues.efectivo}
          />
          <MaterialCommunityIcons
            name='card-bulleted-outline'
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title='Pagos Digitales'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={togglePagosDigitales}
            checked={formValues.pagosDigitales}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text h3 style={{ color: '#000', textAlign: 'center' }}>
            Términos y Condiciones & Políticas de Privacidad
          </Text>
          <TouchableOpacity onPress={toggleOverlay}>
            <Text
              style={{
                color: '#000000',
                marginTop: '5%',
                fontSize: 24,
                fontWeight: 'bold',
                color: '#fd5d13',
              }}>
              Leer
            </Text>
          </TouchableOpacity>
          <Overlay
            isVisible={formValues.visible}
            onBackdropPress={toggleOverlay}>
            <Text>Acá van los términos.</Text>
          </Overlay>
          <CheckBox
            title='Acepto los términos y condiciones y la política de privacidad'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={toggleTerminos}
            checked={formValues.terminos}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 30,
          }}>
          <Button
            onPress={() => writeUserData()}
            title='Continuar'
            buttonStyle={{
              backgroundColor: '#F4743B',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: 20,
  },
});

export default AnunciatePage;
