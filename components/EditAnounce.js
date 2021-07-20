// @vendor
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import * as firebase from 'firebase';
// Providers keys & ids
import { FACEBOOK_APP_ID } from '@env';
// @components
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Button,
  CheckBox,
  Input,
  SocialIcon,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditAnounce = ({ route }) => {
  const [values, setValues] = React.useState({
    image: null,
    actividad: '',
    apellido: '',
    celular: 0,
    descripcionPersonal: '',
    desde: '',
    diasHorarios: [],
    direccionDelLocal: '',
    efectivo: false,
    emailLaboral: '',
    emailPersonal: '',
    empresa: '',
    factura: '',
    hasta: '',
    local: '',
    localidad: '',
    matricula: '',
    nombre: '',
    nombreDeLaEmpresa: '',
    numeroDeMatricula: '',
    pagosDigitales: false,
    palabraClaveUno: '',
    palabraClaveDos: '',
    palabraClaveTres: '',
    partido: '',
    provincia: '',
    telefono: 0,
  });
  const [uploading, setUploading] = React.useState(false);

  let image,
    nombre,
    apellido,
    actividad,
    contadorAnuncio,
    efectivo,
    pagosDigitales,
    emailPersonal,
    celular,
    descripcionPersonal,
    desde,
    diasHorarios,
    direccionDelLocal,
    emailLaboral,
    empresa,
    factura,
    hasta,
    local,
    localidad,
    matricula,
    nombreDeLaEmpresa,
    numeroDeMatricula,
    palabraClaveUno,
    palabraClaveDos,
    palabraClaveTres,
    partido,
    pisoDptoCasa,
    provincia,
    telefono,
    recomendacionesTotales,
    hasRecommended;

  let dbRef = firebase
    .database()
    .ref('anuncios/')
    .orderByChild('uuid')
    .equalTo(route.params.uuid);
  let dbResult = dbRef.on('value', (snap) => {
    snap.forEach((child) => {
      nombre = child.val().nombre;
      apellido = child.val().apellido;
      actividad = child.val().actividad;
      efectivo = child.val().efectivo;
      pagosDigitales = child.val().pagosDigitales;
      emailPersonal = child.val().emailPersonal;
      id = child.val().id;
      contadorAnuncio = child.val().anuncioId;
      celular = child.val().celular;
      descripcionPersonal = child.val().descripcionPersonal;
      desde = child.val().desde;
      diasHorarios = child.val().diasHorarios;
      direccionDelLocal = child.val().direccionDelLocal;
      emailLaboral = child.val().emailLaboral;
      empresa = child.val().empresa;
      factura = child.val().factura;
      hasta = child.val().hasta;
      local = child.val().local;
      localidad = child.val().localidad;
      palabraClaveUno = child.val().palabraClaveUno;
      palabraClaveDos = child.val().palabraClaveDos;
      palabraClaveTres = child.val().palabraClaveTres;
      partido = child.val().partido;
      provincia = child.val().provincia;
      nombreDeLaEmpresa = child.val().nombreDeLaEmpresa;
      recomendacionesTotales = child.val().recomendacionesTotales;
      hasRecommended = child.val().hasRecommended;
      telefono = child.val().telefono;
      matricula = child.val().matricula;
      numeroDeMatricula = child.val().numeroDeMatricula;
    });
  });

  //provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      const uri = result;
      setValues({
        ...values,
        image: uri.toString(),
      });
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);

      const task = firebase.default
        .storage()
        .ref('anunciosPictures/')
        .child(
          firebase.default.auth().currentUser.uid + contadorAnuncio + '.JPG'
        )
        .put(blob)
        .then(function () {
          console.log('Foto subida exitosamente!');
        })
        .catch((error) => {
          console.log('ERROR AL SUBIR LA FOTO', error.message);
        });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      setUploading(false);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '224428348880-r23dsomdtlivf7vgecq8485350eg57v1.apps.googleusercontent.com',
    iosClientId:
      '224428348880-r23dsomdtlivf7vgecq8485350eg57v1.apps.googleusercontent.com',
    androidClientId:
      '224428348880-r23dsomdtlivf7vgecq8485350eg57v1.apps.googleusercontent.com',
    webClientId:
      '224428348880-r23dsomdtlivf7vgecq8485350eg57v1.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          position: 'absolute',
          height: Platform.OS === 'android' ? '5%' : '3%',
        }}
      />
      <ScrollView
        style={{
          marginTop: Platform.OS === 'android' ? '10%' : '5%',
        }}>
        <View style={styles.firstView}>
          <Text>Información Personal</Text>
          {values.image && (
            <Avatar
              source={{ uri: values.image }}
              size='xlarge'
              avatarStyle={{ borderRadius: 25 }}
            />
          )}
          <Button
            buttonStyle={{
              marginTop: 10,
              marginLeft: '2%',
              backgroundColor: '#F4743B',
            }}
            title='Subir foto'
            onPress={pickImage}
          />
          <Input
            placeholder={nombre}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(nombre) =>
              setValues({
                ...values,
                nombre: nombre,
              })
            }
          />
          <Input
            placeholder={apellido}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(apellido) =>
              setValues({
                ...values,
                apellido: apellido,
              })
            }
          />
          <Text>Información Laboral</Text>
          <Input
            placeholder={actividad}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(actividad) =>
              setValues({
                ...values,
                actividad: actividad,
              })
            }
          />
          <Input
            placeholder={telefono}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            keyboardType='number-pad'
            onChangeText={(telefono) =>
              setValues({
                ...values,
                telefono: parseInt(telefono),
              })
            }
          />
          <Input
            placeholder={celular}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            keyboardType='number-pad'
            onChangeText={(celular) =>
              setValues({
                ...values,
                celular: parseInt(celular),
              })
            }
          />
          <Input
            placeholder={emailLaboral}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            keyboardType='email-address'
            onChangeText={(emailLaboral) =>
              setValues({
                ...values,
                emailLaboral: emailLaboral,
              })
            }
          />
          <Input
            placeholder={localidad}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(localidad) =>
              setValues({
                ...values,
                localidad: localidad,
              })
            }
          />
          <Input
            placeholder={partido}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(partido) =>
              setValues({
                ...values,
                partido: partido,
              })
            }
          />
          <Input
            placeholder='Local (Si / No)'
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(local) =>
              setValues({
                ...values,
                local: local,
              })
            }
          />
          <Input
            placeholder='Empresa (Si / No)'
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(empresa) =>
              setValues({
                ...values,
                empresa: empresa,
              })
            }
          />
          <Input
            placeholder={empresa ? empresa : 'Empresa'}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(nombreDeLaEmpresa) =>
              setValues({
                ...values,
                nombreDeLaEmpresa: nombreDeLaEmpresa,
              })
            }
          />
          <Input
            placeholder={factura ? factura : 'Factura (Tipo)'}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(factura) =>
              setValues({
                ...values,
                factura: factura,
              })
            }
          />
          <Input
            placeholder={matricula ? matricula : 'Matrícula (Si / No)'}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(matricula) =>
              setValues({
                ...values,
                matricula: matricula,
              })
            }
          />
          <Input
            placeholder={matricula ? numeroDeMatricula : 'Número de matrícula'}
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            onChangeText={(numeroDeMatricula) =>
              setValues({
                ...values,
                numeroDeMatricula: numeroDeMatricula,
              })
            }
          />
          <Text style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Información Adicional
          </Text>
          <Input
            placeholder={
              descripcionPersonal
                ? descripcionPersonal
                : 'Ingrese información adicional...'
            }
            style={{
              height: 200,
              width: '80%',
              borderWidth: 1,
              borderRadius: 15,
              borderColor: 'gray',
              margin: 10,
              textAlignVertical: 'top',
              textAlign: 'center',
            }}
            inputContainerStyle={{ borderBottomWidth: 0, margin: '5%' }}
            multiline={true}
            onChangeText={(descripcionPersonal) =>
              setValues({
                ...values,
                descripcionPersonal: descripcionPersonal,
              })
            }
          />
          <Text style={{ color: '#000000' }}>Palabras clave</Text>
          <View style={{ flexDirection: 'row', marginTop: '10%' }}>
            <Input
              placeholder={palabraClaveUno ? palabraClaveUno : '#Uno'}
              onChangeText={(palabraClaveUno) =>
                setValues({
                  ...values,
                  palabraClaveUno: palabraClaveUno,
                })
              }
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
              placeholder={palabraClaveDos ? palabraClaveDos : '#Dos'}
              onChangeText={(palabraClaveDos) =>
                setValues({
                  ...values,
                  palabraClaveDos: palabraClaveDos,
                })
              }
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
              placeholder={palabraClaveTres ? palabraClaveTres : '#Tres'}
              onChangeText={(palabraClaveTres) =>
                setValues({
                  ...values,
                  palabraClaveTres: palabraClaveTres,
                })
              }
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
          <Text style={{ color: '#000', textAlign: 'center', marginTop: '5%' }}>
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
              checked={values.efectivo}
            />
            <MaterialCommunityIcons
              name='credit-card-multiple-outline'
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
              checked={values.pagosDigitales}
            />
          </View>
        </View>
        <Button
          buttonStyle={{
            marginTop: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 20,
            backgroundColor: '#F4743B',
            width: '70%',
          }}
          title='Guardar'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditAnounce;
