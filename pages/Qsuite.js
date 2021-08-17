import React from 'react';
import { Alert, Image, Platform, SafeAreaView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const Qsuite = ({ navigation }) => {
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
            marginTop: Platform.OS === 'android' ? 35 : 10,
            padding: 10,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate('Qdrives')}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Q drives!</ListItem.Title>
            <ListItem.Subtitle>Logistica y transporte</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          style={{
            padding: 10,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate('ShopPage')}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Q buyers!</ListItem.Title>
            <ListItem.Subtitle>Publicidad sobre bienes</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </SafeAreaView>
  );
};

export default Qsuite;
