import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const Qsuite = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <View>
        <ListItem
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 15,
          }}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Qdrives!</ListItem.Title>
            <ListItem.Subtitle>Logistica y transporte</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          style={{
            padding: 10,
            borderRadius: 15,
          }}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Qbuyers!</ListItem.Title>
            <ListItem.Subtitle>Compra y venta de bienes</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </SafeAreaView>
  );
};

export default Qsuite;
