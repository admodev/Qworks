import * as React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

type AnounceProps = {
  actividad: string;
  apellido: string;
  celular: number;
  cuitCuil: number;
  descripcionPersonal: string;
  desde: string;
  diasHorarios: number[];
  direccionDelLocal: string;
  dni: number;
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

const EditAnounce: React.FunctionComponent<AnounceProps> = () => {
  const [values, setValues] = React.useState({
    image: null,
    actividad: '',
    apellido: '',
    celular: '',
    cuitCuil: 0,
    descripcionPersonal: '',
    desde: '',
    diasHorarios: [],
    direccionDelLocal: '',
    dni: 0,
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
  let anunciosCountResult;

  React.useEffect(() => {
    let dbRef = firebase.default
      .database()
      .ref('anuncios/')
      .orderByChild('uuid')
      .equalTo('uuid');
    let dbResult = dbRef.on('value', (snap) => {
      snap.forEach((child) => {
        anunciosCountResult = child.val().anuncioId;
        values.nombre = child.val().nombre;
        values.apellido = child.val().apellido;
        values.actividad = child.val().actividad;
        values.efectivo = child.val().efectivo;
        values.pagosDigitales = child.val().pagosDigitales;
        values.emailPersonal = child.val().emailPersonal;
        values.celular = child.val().celular;
        values.descripcionPersonal = child.val().descripcionPersonal;
        values.desde = child.val().desde;
        values.diasHorarios = child.val().diasHorarios;
        values.direccionDelLocal = child.val().direccionDelLocal;
        values.emailLaboral = child.val().emailLaboral;
        values.empresa = child.val().empresa;
        values.factura = child.val().factura;
        values.hasta = child.val().hasta;
        values.local = child.val().local;
        values.localidad = child.val().localidad;
        values.provincia = child.val().provincia;
        values.nombreDeLaEmpresa = child.val().nombreDeLaEmpresa;
        values.telefono = child.val().telefono;
        values.matricula = child.val().matricula;
        values.numeroDeMatricula = child.val().numeroDeMatricula;
      });
    });
  }, []);

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
          <Input
            placeholder='DNI'
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            keyboardType='number-pad'
            onChangeText={(dni) =>
              setValues({
                ...values,
                dni: parseInt(dni),
              })
            }
          />
          <Input
            placeholder='Cuit / Cuil'
            inputContainerStyle={{
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            keyboardType='number-pad'
            onChangeText={(cuitCuil) =>
              setValues({
                ...values,
                cuitCuil: parseInt(cuitCuil),
              })
            }
          />
        </View>
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
