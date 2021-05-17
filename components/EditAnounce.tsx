import * as React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

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

// TODO: Continuar codeando...

const EditAnounce: React.FunctionComponent<AnounceProps> = () => {
  const [values, setValues] = React.useState({
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

  React.useEffect(() => {
    let dbRef = firebase.default
      .database()
      .ref('anuncios/')
      .orderByChild('uuid')
      .equalTo('uuid');
    let dbResult = dbRef.on('value', (snap) => {
      snap.forEach((child) => {
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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          position: 'absolute',
          height: Platform.OS === 'android' ? '5%' : '3%',
        }}
      />
      <View style={styles.firstView}>
        <Input
          placeholder='Nombre'
          onChangeText={(nombre) =>
            setValues({
              ...values,
              nombre: nombre,
            })
          }
        />
        <Input
          placeholder='Apellido'
          onChangeText={(apellido) =>
            setValues({
              ...values,
              apellido: apellido,
            })
          }
        />
        <Input
          placeholder='Cuit / Cuil'
          keyboardType='number-pad'
          onChangeText={(cuitCuil) =>
            setValues({
              ...values,
              cuitCuil: parseInt(cuitCuil),
            })
          }
        />
      </View>
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
