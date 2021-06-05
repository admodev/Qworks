// @vendor
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
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

type AnounceProps = {
  actividad: string;
  apellido: string;
  celular: number;
  descripcionPersonal: string;
  desde: string;
  diasHorarios: number[];
  direccionDelLocal: string;
  efectivo: boolean;
  emailLaboral: string;
  emailPersonal: string;
  empresa: string;
  factura: string;
  hasta: string;
  local: string;
  localidad: string;
  matricula: string;
  nombre: string;
  nombreDeLaEmpresa: string;
  numeroDeMatricula: string;
  pagosDigitales: boolean;
  palabraClaveUno: string;
  palabraClaveDos: string;
  palabraClaveTres: string;
  partido: string;
  provincia: string;
  telefono: number;
};

// Foto
declare var Blob: {
  prototype: Blob;
  new (): Blob;
  new (request: any, mime: string): Blob;
};

WebBrowser.maybeCompleteAuthSession();

const EditAnounce: React.FunctionComponent<AnounceProps> = () => {
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
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: FACEBOOK_APP_ID,
  });

  let anunciosCountResult;

  React.useEffect(() => {
    //let dbRef = firebase.default
    //.database()
    //.ref('anuncios/')
    //.orderByChild('uuid')
    //.equalTo('uuid');
    //let dbResult = dbRef.on('value', (snap) => {
    //snap.forEach((child) => {
    //anunciosCountResult = child.val().anuncioId;
    //values.nombre = child.val().nombre;
    //values.apellido = child.val().apellido;
    //values.actividad = child.val().actividad;
    //values.efectivo = child.val().efectivo;
    //values.pagosDigitales = child.val().pagosDigitales;
    //values.emailPersonal = child.val().emailPersonal;
    //values.celular = child.val().celular;
    //values.descripcionPersonal = child.val().descripcionPersonal;
    //values.desde = child.val().desde;
    //values.diasHorarios = child.val().diasHorarios;
    //values.direccionDelLocal = child.val().direccionDelLocal;
    //values.emailLaboral = child.val().emailLaboral;
    //values.empresa = child.val().empresa;
    //values.factura = child.val().factura;
    //values.hasta = child.val().hasta;
    //values.local = child.val().local;
    //values.localidad = child.val().localidad;
    //values.provincia = child.val().provincia;
    //values.nombreDeLaEmpresa = child.val().nombreDeLaEmpresa;
    //values.telefono = child.val().telefono;
    //values.matricula = child.val().matricula;
    //values.numeroDeMatricula = child.val().numeroDeMatricula;
    //});
    //});

    // Facebook auth
    if (response?.type === 'success') {
      const { access_token } = response.params;

      const credential = firebase.default.auth.FacebookAuthProvider.credential(
        access_token
      );
      // Sign in with the credential from the Facebook user.
      firebase.default.auth().signInWithCredential(credential);
    }
  }, [response]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      const { uri } = result as ImageInfo;
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
          firebase.default.auth().currentUser.uid + anunciosCountResult + '.JPG'
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
            placeholder='Nombre'
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
            placeholder='Apellido'
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
            placeholder='Actividad'
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
            placeholder='Teléfono (Línea)'
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
            placeholder='Teléfono (Móvil)'
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
            placeholder='Email Laboral'
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
            placeholder='Localidad'
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
            placeholder='Partido'
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
            placeholder='Nombre de la Empresa'
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
            placeholder='Factura (Tipo)'
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
            placeholder='Matrícula (Si / No)'
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
            placeholder='Número de matrícula'
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
            placeholder='Ingrese información adicional...'
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
              placeholder='#Uno'
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
              placeholder='#Dos'
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
              placeholder='#Tres'
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
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='facebook'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='Facebook'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='instagram'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='Instagram'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='linkedin'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='Linked-In'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='youtube'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='YouTube'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='twitch'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='Twitch'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SocialIcon
              button
              type='google'
              onPress={() => console.log('Agregar metodo')}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Input
              placeholder='Google'
              inputContainerStyle={{
                width: '75%',
                marginLeft: '2%',
                marginTop: '2%',
              }}
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
          disabled={!request}
          title='Testear Facebook'
          onPress={() => {
            promptAsync();
          }}
        />
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
