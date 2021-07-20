import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

const PaymentScreen = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  const startCheckout = async () => {
    try {
      const preferenceId = await getPreferenceId(`payer@email.com`, {
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

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={startCheckout}>
        <Text>Iniciar pago de prueba</Text>
      </TouchableOpacity>
      <Text>Pago: {JSON.stringify(paymentResult)}</Text>
    </SafeAreaView>
  );
};

export default PaymentScreen;
