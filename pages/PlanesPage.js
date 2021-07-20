import React, { useState } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button, Overlay, PricingCard } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import PlanesCard from '../components/PlanesCard';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import {
  MERCADO_PAGO_TEST_ACCESS_TOKEN,
  MERCADO_PAGO_TEST_PUBLIC_KEY,
} from '@env';
import * as Linking from 'expo-linking';

const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${MERCADO_PAGO_TEST_ACCESS_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();
  Linking.openURL(preference.init_point);

  return preference.id;
};

const PlanesPage = ({ route }) => {
  const anounceData = route.params.pendingAnounce;
  const uuid = uuidv4();
  const [orangeOverlayVisible, setOrangeOverlayVisible] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const payerEmail = firebase.default.auth().currentUser.email;

  const startCheckout = async () => {
    try {
      const preferenceId = await getPreferenceId('payerEmail@email.com', {
        title: 'Plan Orange',
        description: 'Plan Orange',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 2700,
      });

      const payment = await MercadoPagoCheckout.createPayment({
        publicKey: MERCADO_PAGO_TEST_PUBLIC_KEY,
      });

      setPaymentResult(payment);
    } catch (err) {
      Alert.alert('Something went wrong', err.message);
    }
  };

  function writeUserData(
    nombre,
    apellido,
    cuitCuil,
    dni,
    actividad,
    telefono,
    celular,
    localidad,
    localidadLatitude,
    localidadLongitude,
    partido,
    partidoLatitude,
    partidoLongitude,
    local,
    empresa,
    factura,
    direccionDelLocal,
    direccionDelLocalLatitude,
    direccionDelLocalLongitude,
    nombreDeLaEmpresa,
    matricula,
    numeroDeMatricula,
    emailLaboral,
    descripcionPersonal,
    palabraClaveUno,
    palabraClaveDos,
    palabraClaveTres,
    diasHorarios,
    dateDesdeParsed,
    dateHastaParsed,
    efectivo,
    pagosDigitales,
    terminos,
    latitud,
    longitud
  ) {
    if (!cuitCuil.trim()) {
      alert('Por favor ingrese su cuit/cuil');
      return;
    } else if (!dni.trim()) {
      alert('Por favor ingrese su DNI');
      return;
    } else if (!localidad) {
      alert('Por favor ingresa tu localidad');
      return;
    } else if (!partido) {
      alert('Por favor ingresa tu partido');
      return;
    } else if (terminos == false) {
      alert('Tiene que aceptar los terminos para continuar');
    } else {
      if (!anunciosCountResult) {
        anunciosCountResult = 0;
      } else if (anunciosCountResult === 1) {
        anunciosCountResult = 1;
      } else if (anunciosCountResult === 2) {
        anunciosCountResult = 2;
      } else if (anunciosCountResult === 3) {
        anunciosCountResult = 3;
      }
      let userRef = user.uid;

      let anunciosRef = firebase
        .database()
        .ref(
          'anuncios/' + firebase.auth().currentUser.uid + anunciosCountResult
        )
        .set({
          anuncioId: anunciosCountResult,
          id: user.uid,
          nombre: nombre,
          apellido: apellido,
          emailPersonal: firebase.auth().currentUser.email,
          cuitCuil: cuitCuil,
          dni: dni,
          actividad: actividad,
          telefono: telefono,
          celular: celular,
          localidad: localidad,
          localidadLatitude: localidadLatitude,
          localidadLongitude: localidadLongitude,
          partido: partido,
          partidoLatitude: partidoLatitude,
          partidoLongitude: partidoLongitude,
          local: local,
          empresa: empresa,
          factura: factura,
          direccionDelLocal: direccionDelLocal,
          direccionDelLocalLatitude: direccionDelLocalLatitude,
          direccionDelLocalLongitude: direccionDelLocalLongitude,
          nombreDeLaEmpresa: nombreDeLaEmpresa,
          matricula: matricula,
          numeroDeMatricula: numeroDeMatricula,
          emailLaboral: emailLaboral,
          descripcionPersonal: descripcionPersonal,
          palabraClaveUno,
          palabraClaveDos,
          palabraClaveTres,
          diasHorarios: diasHorarios,
          desde: dateDesdeParsed,
          hasta: dateHastaParsed,
          efectivo: efectivo,
          pagosDigitales: pagosDigitales,
          terminos: terminos,
          latitud: latitud,
          longitud: longitud,
          uuid: uuid,
        })
        .catch(function (error) {
          alert(
            'Hubo un error al subir su anuncio, por favor compruebe sus datos e intentelo nuevamente.'
          );
        });
    }
  }

  return (
    <>
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
      <ScrollView>
        <Text style={{ fontSize: 24 }}>{JSON.stringify(anounceData)}</Text>
        <TouchableOpacity onPress={startCheckout}>
          <Text>Iniciar pago de prueba</Text>
        </TouchableOpacity>
        <Text>Pago: {JSON.stringify(paymentResult)}</Text>
      </ScrollView>
    </>
  );
};

export default PlanesPage;
