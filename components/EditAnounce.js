// @vendor
import * as React from 'react';
import * as firebase from 'firebase';
// @components
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation.js';

const EditAnounce = ({ navigation, route }) => {
  const [uploading, setUploading] = React.useState(false);

  let nombre,
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
    hasta,
    local,
    localidad,
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

  dbRef.on('value', (snap) => {
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
      hasta = child.val().hasta;
      local = child.val().local;
      localidad = child.val().localidad;
      palabraClaveUno = child.val().palabraClaveUno;
      palabraClaveDos = child.val().palabraClaveDos;
      palabraClaveTres = child.val().palabraClaveTres;
      partido = child.val().partido;
      provincia = child.val().provincia;
      recomendacionesTotales = child.val().recomendacionesTotales;
      hasRecommended = child.val().hasRecommended;
      telefono = child.val().telefono;
    });
  });

  const [values, setValues] = React.useState({
    actividad: actividad,
    apellido: apellido,
    descripcionPersonal: descripcionPersonal,
    direccionDelLocal: direccionDelLocal,
    efectivo: efectivo,
    emailLaboral: emailLaboral,
    emailPersonal: emailPersonal,
    local: local,
    localidad: localidad,
    nombre: nombre,
    pagosDigitales: pagosDigitales,
    palabraClaveUno: palabraClaveUno,
    palabraClaveDos: palabraClaveDos,
    palabraClaveTres: palabraClaveTres,
    partido: partido,
    provincia: provincia,
  });

  const [image, setImage] = React.useState(null);

  async function updateAnounceData() {
    try {
      let update = await firebase.default
        .database()
        .ref(
          'anuncios/' +
            firebase.default.auth().currentUser.uid +
            contadorAnuncio
        )
        .update({
          nombre: values.nombre,
          apellido: values.apellido,
          actividad: values.actividad,
          emailLaboral: values.emailLaboral,
          localidad: values.localidad,
          partido: values.partido,
          local: values.local,
          direccionDelLocal:
            local.toString() === 'Si'
              ? values.direccionDelLocal
              : 'Sin Especificar',
          descripcionPersonal: values.descripcionPersonal,
          palabraClaveUno: values.palabraClaveUno,
          palabraClaveDos: values.palabraClaveDos,
          palabraClaveTres: values.palabraClaveTres,
          efectivo: values.efectivo,
          pagosDigitales: values.pagosDigitales,
        });

      let nav = RootNavigation.navigate('Anuncios');

      return { update, nav };
    } catch (error) {
      return console.error(error);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri.toString());
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          position: 'absolute',
          height: Platform.OS === 'android' ? '5%' : '3%',
        }}
      />
      <View
        style={{
          ...Platform.select({
            android: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '12%',
              marginLeft: '3%',
            },
            ios: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '3%',
              backgroundColor: 'transparent',
            },
          }),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            ...Platform.select({
              android: {
                backgroundColor: 'transparent',
              },
              ios: {
                backgroundColor: 'transparent',
                left: 12,
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
      </View>
      <ScrollView
        style={{
          marginTop: Platform.OS === 'android' ? '10%' : '5%',
        }}>
        <View style={styles.firstView}>
          <Text>Información Básica</Text>
          {image && (
            <Avatar
              source={{ uri: image }}
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
          <Text>Datos de Contacto</Text>
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
              onPress={() =>
                setValues({
                  ...values,
                  efectivo: !values.efectivo,
                })
              }
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
              onPress={() =>
                setValues({
                  ...values,
                  pagosDigitales: !values.pagosDigitales,
                })
              }
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
          onPress={() => updateAnounceData()}
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
