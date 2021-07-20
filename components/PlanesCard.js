import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const PlanesCard = (props) => {
  const planColor = props.color;

  return (
    <View
      style={{
        height: '65%',
        width: '14%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}>
      <Text
        style={{
          color: planColor,
          fontSize: 34,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>{props.price}</Text>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>{props.info}</Text>
      {props.title === 'Plan Free' && (
        <Image
          source={require('../assets/welcome.png')}
          style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
        />
      )}
      {props.title === 'Plan Orange' && (
        <Image
          source={require('../assets/target.png')}
          style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
        />
      )}
      {props.title === 'Plan Green' && (
        <Image
          source={require('../assets/start.png')}
          style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
        />
      )}
      {props.title === 'Plan Blue' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Image
            source={require('../assets/business-man.png')}
            style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
          />
          <Image
            source={require('../assets/designer.png')}
            style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
          />
        </View>
      )}
      {props.title === 'Prepago' && (
        <Image
          source={require('../assets/dollar.png')}
          style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
        />
      )}
      <Button
        title='Más Info'
        buttonStyle={{
          width: '70%',
          height: 50,
          alignSelf: 'center',
          margin: 10,
          borderRadius: 8,
          backgroundColor: planColor,
        }}
        icon={{
          name: 'info',
          size: 25,
          color: 'white',
        }}
        onPress={() => navigation.navigate('MasInfo', { planId: props.uuid })}
      />
    </View>
  );
};

export default PlanesCard;
