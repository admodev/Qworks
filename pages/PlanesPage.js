import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button, PricingCard } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const PlanesPage = () => {
  const [responseData, setResponseData] = useState('');
  const uuid = uuidv4();

  const planes = [
    {
      id: uuid,
      color: 'green',
      nombre: 'Plan Green',
      descripcion: `Este plan te permite tener dos anuncios
        +2 tus anuncios van a estar donde vos estes.`,
      contenido: 'Mensajeria 40 minutos + 20 de regalo los primeros 3 meses.',
      precio: '$1560+IVA',
    },
  ];

  const fetchPong = () => {
    fetch('http://localhost:3090/ping')
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <SafeAreaView>
      {planes.map((plan) => {
        return (
          <PricingCard
            key={plan.id}
            color={plan.color}
            title={plan.nombre}
            price={plan.precio}
            info={[plan.descripcion, plan.contenido]}
            button={{ title: 'Adquirir', icon: 'flight-takeoff' }}
          />
        );
      })}
      <Button title='Ping' onPress={fetchPong} />
      <Text>{responseData}</Text>
    </SafeAreaView>
  );
};

export default PlanesPage;
