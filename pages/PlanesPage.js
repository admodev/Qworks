import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { PricingCard } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const PlanesPage = () => {
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
    </SafeAreaView>
  );
};

export default PlanesPage;
