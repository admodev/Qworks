import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import RenderCards from '../components/RenderMultiple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RecomendacionesRenderizadas({ navigation }) {
  const naranjaQueDeOficios = '#fd5d13';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          flex: 1,
          position: 'absolute',
          resizeMode: 'cover',
          width: '100%',
          height: '5%',
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
              marginTop: '15%',
              marginLeft: '10%',
            },
            ios: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: '10%',
              marginLeft: 15,
              backgroundColor: 'transparent',
            },
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            ...Platform.select({
              android: {
                backgroundColor: 'transparent',
              },
              ios: {
                backgroundColor: 'transparent',
                left: 25,
              },
            }),
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            color={naranjaQueDeOficios}
            size={32}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
      <RenderCards
        image={'https://picsum.photos/200/300'}
        name={'Carlos'}
        email={'emailDeMuestra@hotmail.com'}
        idAnuncio={'PlsfYMo9kDdPKnHIuZ0uPJkTyeL2'}
      />
    </SafeAreaView>
  );
}
