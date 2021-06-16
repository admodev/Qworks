import React, { useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { Button, Overlay, PricingCard } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import PlanesCard from '../components/PlanesCard';

const PlanesPage = ({ route }) => {
  const anounceData = route.params.pendingAnounce;
  const uuid = uuidv4();
  const [orangeOverlayVisible, setOrangeOverlayVisible] = useState(false);

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
      </ScrollView>
    </>
  );
};

export default PlanesPage;
