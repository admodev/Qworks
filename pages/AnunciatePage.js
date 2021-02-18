import React, { useState, useEffect, setState } from 'react';
import {
  Image,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import * as Updates from 'expo-updates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import * as Progress from 'react-native-progress';

const AnunciatePage = ({ navigation }) => {
  let database = firebase.database();
  let user = firebase.auth().currentUser;
  let id = user.uid;
  let storage = firebase.storage();
  let storageRef = storage.ref();
  var userDefaultImage = storageRef.child('userDefaultImage/icon.png');
  const [photoJSONValue, setPhotoJSONValue] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [image, setImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [emailPersonal, setEmailPersonal] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [pisoDptoCasa, setPisoDptoCasa] = useState('');
  const [cuitCuil, setCuitCuil] = useState('');
  const [dni, setDni] = useState('');
  const [actividad, setActividad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [provincia, setProvincia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [local, setLocal] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [factura, setFactura] = useState('');
  const [direccionDelLocal, setDireccionDelLocal] = useState('');
  const [nombreDeLaEmpresa, setNombreDeLaEmpresa] = useState('');
  const [matricula, setMatricula] = useState('');
  const [numeroDeMatricula, setNumeroDeMatricula] = useState('');
  const [emailLaboral, setEmailLaboral] = useState('');
  const [descripcionPersonal, setDescripcionPersonal] = useState('');
  const [palabraClaveUno, setPalabraClaveUno] = useState('');
  const [palabraClaveDos, setPalabraClaveDos] = useState('');
  const [palabraClaveTres, setPalabraClaveTres] = useState('');
  const [palabrasClave, setPalabrasclave] = useState([]);
  const [diasHorarios, setDiasHorarios] = useState([]);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [efectivo, setEfectivo] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const toggleEfectivo = React.useCallback(() => setEfectivo(!efectivo));
  const [pagosDigitales, setPagosDigitales] = useState(false);
  const togglePagosDigitales = React.useCallback(() =>
    setPagosDigitales(!pagosDigitales)
  );
  const [terminos, setTerminos] = useState(false);
  const toggleTerminos = React.useCallback(() => setTerminos(!terminos));
  const [lunesChecked, setLunesChecked] = useState(false);
  const toggleLunesChecked = React.useCallback(() =>
    setLunesChecked(!lunesChecked)
  );
  const [martesChecked, setMartesChecked] = useState(false);
  const toggleMartesChecked = React.useCallback(() =>
    setMartesChecked(!martesChecked)
  );
  const [miercolesChecked, setMiercolesChecked] = useState(false);
  const toggleMiercolesChecked = React.useCallback(() =>
    setMiercolesChecked(!miercolesChecked)
  );
  const [juevesChecked, setJuevesChecked] = useState(false);
  const toggleJuevesChecked = React.useCallback(() =>
    setJuevesChecked(!juevesChecked)
  );
  const [viernesChecked, setViernesChecked] = useState(false);
  const toggleViernesChecked = React.useCallback(() =>
    setViernesChecked(!viernesChecked)
  );
  const [sabadoChecked, setSabadoChecked] = useState(false);
  const toggleSabadoChecked = React.useCallback(() =>
    setSabadoChecked(!sabadoChecked)
  );
  const [domingoChecked, setDomingoChecked] = useState(false);
  const toggleDomingoChecked = React.useCallback(() =>
    setDomingoChecked(!domingoChecked)
  );
  const [lunesViernesChecked, setLunesViernesChecked] = useState(false);
  const toggleLunesViernesChecked = React.useCallback(() => {
    setLunesViernesChecked(!lunesViernesChecked);
  });
  const [desdeAmChecked, setDesdeAmChecked] = useState(false);
  const toggleDesdeAmChecked = React.useCallback(() =>
    setDesdeAmChecked(!desdeAmChecked)
  );
  const [desdePmChecked, setDesdePmChecked] = useState(false);
  const toggleDesdePmChecked = React.useCallback(() =>
    setDesdePmChecked(!desdePmChecked)
  );
  const [hastaAmChecked, setHastaAmChecked] = useState(false);
  const toggleHastaAmChecked = React.useCallback(() =>
    setHastaAmChecked(!hastaAmChecked)
  );
  const [hastaPmChecked, setHastaPmChecked] = useState(false);
  const toggleHastaPmChecked = React.useCallback(() =>
    setHastaPmChecked(!hastaPmChecked)
  );
  const [ready, setReady] = useState(false);
  const [where, setWhere] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  let latitud = where.lat;
  let longitud = where.lng;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            '¡Perdón, necesitamos acceder a la galería para que pueda subir una foto!'
          );
        }
      }
    })();

    setReady(false);
    setError(null);

    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24,
    };

    const geoSuccess = (position) => {
      console.log(position);
      setReady(true);
      setWhere({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const geoFailure = (error) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  let anunciosIdsCount = [];
  let idRefAnuncios = firebase
    .database()
    .ref('anuncios/')
    .orderByKey()
    .on('value', (snap) => {
      snap.forEach((child) => {
        anunciosIdsCount.push({
          ids: child.val().id,
        });
      });
    });

  let anunciosCount = anunciosIdsCount.reduce(
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

  function concatPalabraClaveUno() {
    setPalabrasClave(palabrasClave.concat(palabraClaveUno));
  }

  function concatPalabraClaveDos() {
    setPalabrasClave(palabrasClave.concat(palabraClaveDos));
  }

  function concatPalabraClaveTres() {
    setPalabrasClave(palabrasClave.concat(palabraClaveTres));
  }

  function concatLunes() {
    setDiasHorarios(diasHorarios.concat('Lunes'));
    toggleLunesChecked();
  }
  function concatMartes() {
    setDiasHorarios(diasHorarios.concat('Martes'));
    toggleMartesChecked();
  }
  function concatMiercoles() {
    setDiasHorarios(diasHorarios.concat('Miercoles'));
    toggleMiercolesChecked();
  }
  function concatJueves() {
    setDiasHorarios(diasHorarios.concat('Jueves'));
    toggleJuevesChecked();
  }
  function concatViernes() {
    setDiasHorarios(diasHorarios.concat('Viernes'));
    toggleViernesChecked();
  }
  function concatSabado() {
    setDiasHorarios(diasHorarios.concat('Sabado'));
    toggleSabadoChecked();
  }
  function concatDomingo() {
    setDiasHorarios(diasHorarios.concat('Domingo'));
    toggleDomingoChecked();
  }

  function concatLunesViernes() {
    setDiasHorarios(diasHorarios.concat('Lunes a Viernes'));
    toggleLunesViernesChecked();
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
      setTransferred(0);
      const task = firebase
        .storage()
        .ref(
          'profilePictures/' +
            firebase.auth().currentUser.uid +
            anunciosCountResult
        )
        .put(blob);
      // set progress state
      task.on('state_changed', (snapshot) => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      setUploading(false);
      alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
    }
  };

  /* async function uploadImage(result) {
    const response = await fetch(result);
    const blob = await response.blob();
    var photoRef = firebase
      .storage()
      .ref()
      .child('profilePictures/' + user.uid + '-' + ++anunciosCountResult);
    return photoRef.put(blob);
  } */

  let idAnuncio;

  function writeUserData(
    nombre,
    apellido,
    emailPersonal,
    domicilio,
    pisoDptoCasa,
    cuitCuil,
    dni,
    actividad,
    telefono,
    celular,
    provincia,
    localidad,
    local,
    empresa,
    factura,
    direccionDelLocal,
    nombreDeLaEmpresa,
    matricula,
    numeroDeMatricula,
    emailLaboral,
    descripcionPersonal,
    palabraClaveUno,
    palabraClaveDos,
    palabraClaveTres,
    diasHorarios,
    desde,
    hasta,
    terminos,
    latitud,
    longitud,
    photoJSONValue
  ) {
    if (!anunciosCountResult) {
      anunciosCountResult = 0;
    } else if (anunciosCountResult < 1) {
      anunciosCountResult = 1;
    } else if (anunciosCountResult < 2) {
      anunciosCountResult = 2;
    } else if (anunciosCountResult < 3) {
      anunciosCountResult = 3;
    }

    if (!cuitCuil.trim()) {
      alert('Por favor ingrese su cuit/cuil');
      return;
    } else if (!dni.trim()) {
      alert('Por favor ingrese su DNI');
      return;
    } else if (terminos == false) {
      alert('Tiene que aceptar los terminos para continuar');
    } else {
      let userRef = user.uid;
      let anunciosRef = firebase
        .database()
        .ref(
          'anuncios/' +
            firebase.auth().currentUser.uid +
            '-' +
            anunciosCountResult
        )
        .set({
          anuncioId: anunciosCountResult,
          id: user.uid,
          imagen: image,
          nombre: nombre,
          apellido: apellido,
          emailPersonal: emailPersonal,
          domicilio: domicilio,
          pisoDptoCasa: pisoDptoCasa,
          cuitCuil: cuitCuil,
          dni: dni,
          actividad: actividad,
          telefono: telefono,
          celular: celular,
          provincia: provincia,
          localidad: localidad,
          local: local,
          empresa: empresa,
          factura: factura,
          direccionDelLocal: direccionDelLocal,
          nombreDeLaEmpresa: nombreDeLaEmpresa,
          matricula: matricula,
          numeroDeMatricula: numeroDeMatricula,
          emailLaboral: emailLaboral,
          descripcionPersonal: descripcionPersonal,
          palabraClaveUno,
          palabraClaveDos,
          palabraClaveTres,
          diasHorarios: diasHorarios,
          desde: desde,
          hasta: hasta,
          terminos: terminos,
          latitud: latitud,
          longitud: longitud,
          photoJSONValue: photoJSONValue,
        })
        .then(function () {
          navigation.navigate('Anuncios');
        })
        .catch(function (error) {
          alert(
            'Hubo un error al subir su anuncio, por favor compruebe sus datos e intentelo nuevamente.'
          );
        });
    }
  }

  const AnimatedLinearGradient = Animated.createAnimatedComponent(
    LinearGradient
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF6E6' }}>
      <AnimatedLinearGradient
        colors={[
          '135deg',
          'rgb(33, 137, 163) 0%',
          'rgb(51, 88, 143) 42%',
          'rgb(72, 29, 118) 82%',
          'rgb(72, 28, 118) 99%',
          'rgb(72, 28, 118) 100%',
        ]}
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
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          color={'#fd5d13'}
          size={32}
          style={{ backgroundColor: 'transparent' }}
        />
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <Text
            h3
            style={{ color: '#000000', marginTop: 30, marginBottom: 25 }}
          >
            Foto de Perfil
          </Text>
          {image && (
            <Avatar
              source={{ uri: image }}
              size="xlarge"
              avatarStyle={{ borderRadius: 25 }}
            />
          )}
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <Button
              buttonStyle={{
                marginTop: 10,
                marginLeft: '2%',
                backgroundColor: '#F4743B',
              }}
              title="Subir foto"
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
          }}
        >
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}
          >
            Información Personal
          </Text>
          <Input
            placeholder="Nombre *"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(nombre) => setNombre(nombre)}
            value={nombre}
          />
          <Input
            placeholder="Apellido *"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(apellido) => setApellido(apellido)}
            value={apellido}
          />
          <Input
            placeholder="Email Personal"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(emailPersonal) => setEmailPersonal(emailPersonal)}
            value={emailPersonal}
          />
          <Input
            placeholder="Domicilio"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(domicilio) => setDomicilio(domicilio)}
            value={domicilio}
          />
          <Input
            placeholder="Piso / Dpto / Casa"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(pisoDptoCasa) => setPisoDptoCasa(pisoDptoCasa)}
            value={pisoDptoCasa}
          />
          <Input
            placeholder="DNI *"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={(dni) => setDni(dni)}
            value={dni}
          />
          <Input
            placeholder="CUIL / CUIT *"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={(cuitCuil) => setCuitCuil(cuitCuil)}
            value={cuitCuil}
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
          }}
        >
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}
          >
            Información Laboral
          </Text>
          {Platform.os === 'ios' ? (
            <Input
              placeholder="Actividad *"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(actividad) => setActividad(actividad)}
              value={actividad}
              maxLength="15"
            />
          ) : (
            <Input
              placeholder="Actividad *"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(actividad) => setActividad(actividad)}
              value={actividad}
              maxLength={15}
            />
          )}
          <Input
            placeholder="Teléfono"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="phone-pad"
            onChangeText={(telefono) => setTelefono(telefono)}
            value={telefono}
          />
          <Input
            placeholder="Celular"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="phone-pad"
            onChangeText={(celular) => setCelular(celular)}
            value={celular}
          />
          <Input
            placeholder="Provincia"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(provincia) => setProvincia(provincia)}
            value={provincia}
          />
          <Input
            placeholder="Localidad"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(localidad) => setLocalidad(localidad)}
            value={localidad}
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder="Local (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(local) => setLocal(local)}
              value={local}
              maxLength="2"
            />
          ) : (
            <Input
              placeholder="Local (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(local) => setLocal(local)}
              value={local}
              maxLength={2}
            />
          )}
          {Platform.os === 'ios' ? (
            <Input
              placeholder="Empresa (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(empresa) => setEmpresa(empresa)}
              value={empresa}
              maxLength="2"
            />
          ) : (
            <Input
              placeholder="Empresa (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(empresa) => setEmpresa(empresa)}
              value={empresa}
              maxLength={2}
            />
          )}
          <Input
            placeholder="Factura (Tipo)"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(factura) => setFactura(factura)}
            value={factura}
          />
          <Input
            placeholder="Dirección del local"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(direccionDelLocal) =>
              setDireccionDelLocal(direccionDelLocal)
            }
            value={direccionDelLocal}
          />
          <Input
            placeholder="Nombre de la empresa"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            onChangeText={(nombreDeLaEmpresa) =>
              setNombreDeLaEmpresa(nombreDeLaEmpresa)
            }
            value={nombreDeLaEmpresa}
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder="Matrícula (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(matricula) => setMatricula(matricula)}
              value={matricula}
              maxLength="2"
            />
          ) : (
            <Input
              placeholder="Matrícula (Si / No)"
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor="black"
              onChangeText={(matricula) => setMatricula(matricula)}
              value={matricula}
              maxLength={2}
            />
          )}
          <Input
            placeholder="Número de matrícula"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={(numeroDeMatricula) =>
              setNumeroDeMatricula(numeroDeMatricula)
            }
            value={numeroDeMatricula}
          />
          <Input
            placeholder="Email laboral"
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor="black"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(emailLaboral) => setEmailLaboral(emailLaboral)}
            value={emailLaboral}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Resumen Personal
          </Text>
          <Input
            placeholder="Ingrese una descripción personal..."
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
            placeholderTextColor="black"
            multiline={true}
            onChangeText={(descripcionPersonal) =>
              setDescripcionPersonal(descripcionPersonal)
            }
            paddingTop={20}
            paddingRight={50}
            paddingLeft={50}
            maxLength={150}
            value={descripcionPersonal}
          />
          <Text h4 style={{ color: '#000000' }}>
            Palabras clave
          </Text>
          <View style={{ flexDirection: 'row', marginTop: '10%' }}>
            <Input
              placeholder="#Uno"
              onChangeText={(palabraClaveUno) =>
                setPalabraClaveUno(palabraClaveUno)
              }
              value={palabraClaveUno}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor="#fd5d13"
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
              placeholder="#Dos"
              onChangeText={(palabraClaveDos) =>
                setPalabraClaveDos(palabraClaveDos)
              }
              value={palabraClaveDos}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor="#fd5d13"
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
              placeholder="#Tres"
              onChangeText={(palabraClaveTres) =>
                setPalabraClaveTres(palabraClaveTres)
              }
              value={palabraClaveTres}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor="#fd5d13"
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
          }}
        >
          <Text h3 style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Dias y horarios
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <CheckBox
              title="Lunes"
              onPress={() => concatLunes()}
              checked={lunesChecked}
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
              title="Martes"
              onPress={() => concatMartes()}
              checked={martesChecked}
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
              title="Miercoles"
              onPress={() => concatMiercoles()}
              checked={miercolesChecked}
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
              title="Jueves"
              onPress={() => concatJueves()}
              checked={juevesChecked}
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
              title="Viernes"
              onPress={() => concatViernes()}
              checked={viernesChecked}
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
              title="Sábado"
              onPress={() => concatSabado()}
              checked={sabadoChecked}
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
              title="Domingo"
              onPress={() => concatDomingo()}
              checked={domingoChecked}
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
              title="Lunes a Viernes"
              onPress={() => concatLunesViernes()}
              checked={lunesViernesChecked}
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
              placeholder="Desde ... hs"
              style={{ color: '#000000', fontSize: 16 }}
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{
                borderBottomColor: '#000000',
                marginTop: 15,
              }}
              placeholderTextColor="black"
              keyboardType="numeric"
              onChangeText={(desde) => setDesde(desde)}
              value={desde}
            />
            <Input
              placeholder="Hasta ... hs"
              style={{ color: '#000000', fontSize: 16 }}
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 16, textAlign: 'center' }}
              inputContainerStyle={{
                borderBottomColor: '#000000',
                marginTop: 15,
              }}
              placeholderTextColor="black"
              keyboardType="numeric"
              onChangeText={(hasta) => setHasta(hasta)}
              value={hasta}
            />
          </View>
        </View>
        <Text
          h3
          style={{ color: '#000', textAlign: 'center', marginTop: '5%' }}
        >
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
          }}
        >
          <MaterialCommunityIcons
            name="cash-usd"
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title="Efectivo"
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
            checked={efectivo}
          />
          <MaterialCommunityIcons
            name="card-bulleted-outline"
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title="Pagos Digitales"
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
            checked={pagosDigitales}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
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
              }}
            >
              Leer
            </Text>
          </TouchableOpacity>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Acá van los términos.</Text>
          </Overlay>
          <CheckBox
            title="Acepto los términos y condiciones y la política de privacidad"
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
            checked={terminos}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 30,
          }}
        >
          <Button
            onPress={() =>
              writeUserData(
                nombre,
                apellido,
                emailPersonal,
                domicilio,
                pisoDptoCasa,
                cuitCuil,
                dni,
                actividad,
                telefono,
                celular,
                provincia,
                localidad,
                local,
                empresa,
                factura,
                direccionDelLocal,
                nombreDeLaEmpresa,
                matricula,
                numeroDeMatricula,
                emailLaboral,
                descripcionPersonal,
                palabraClaveUno,
                palabraClaveDos,
                palabraClaveTres,
                diasHorarios,
                desde,
                hasta,
                terminos,
                latitud,
                longitud,
                photoJSONValue
              )
            }
            title="Continuar"
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
