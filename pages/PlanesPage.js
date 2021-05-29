import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Overlay, PricingCard } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

const PlanesPage = () => {
  const [responseData, setResponseData] = useState('');
  const uuid = uuidv4();
  const [orangeOverlayVisible, setOrangeOverlayVisible] = useState(false);

  const planes = [
    {
      id: uuid,
      color: '#fd5d13',
      nombre: 'Plan Orange',
      descripcion: `El plan orange es el mas pedido de nuestros planes.
Con este plan vas a poder mostrar completamente el servicios que brindas y que tus clientes puedan
conocerte mucho mejor.
Con este plan vas a poder agregar tus redes sociales y tu pagina web, de esta manera te aseguras
que tu anuncio sea mucho mas completo.
Tus clientes van a poder recomendar tu anuncio y van a poder interacutar entre ellos mediante las recomendaciones
que se hagan a tu anuncio. 
Modal donde va el contrato y un check donde dice la leyenda "Lei y acepto los terminos y condiciones del servicio"`,
      contenido:
        '3 anuncios + 3 (tus anuncios te siguen donde vayas) 60 e mensajeria Instantanea Q works!(+ 30 x 3 meses)',
      precio: '$2300+IVA',
    },
    {
      id: uuid,
      color: 'green',
      nombre: 'Plan Green',
      descripcion: `Este plan te permite tener dos anuncios
        +2 tus anuncios van a estar donde vos estes.`,
      contenido: 'Mensajeria 40 minutos + 20 de regalo los primeros 3 meses.',
      precio: '$1560+IVA',
    },
    {
      id: uuid,
      color: 'blue',
      nombre: 'Plan Blue',
      descripcion: `Nuestro plan blue tiene como finalidad que los anuciantes tengan una amplia llegada a tus clientes pudiendo hacer	
que sus ambiciones puedan ser concretadas eficientemente y que sus presupuestos para publidad	
vean resultados`,
      contenido: '5 anuncios + 5 (tus anuncios te siguen donde vayas)',
      precio: '$2999,99+IVA',
    },
    {
      id: uuid,
      color: 'firebrick',
      nombre: 'Prepago',
      descripcion: `Nuestro plan blue tiene como finalidad que los `,
      contenido: 'Contenido pendiente...',
      precio: '$9999,99+IVA',
    },
    {
      id: uuid,
      color: 'gray',
      nombre: 'Plan Free',
      descripcion: `Nuestro plan blue tiene como finalidad que los `,
      contenido: 'Plan gratuito, por unos dias...',
      precio: '$0',
    },
  ];

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
      <ScrollView horizontal={true}>
        {planes.map((plan, index) => {
          return (
            <PricingCard
              key={Math.max(index) + 1}
              color={plan.color}
              title={plan.nombre}
              price={plan.precio}
              info={[plan.contenido]}
              button={{
                title: 'Mas Info',
                icon: 'info',
                onPress: function toggleOrangeOverlay() {
                  setOrangeOverlayVisible(!orangeOverlayVisible);
                },
              }}
              containerStyle={{
                height: '60%',
                width: '14%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
              wrapperStyle={{
                padding: 20,
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

export default PlanesPage;
