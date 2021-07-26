import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const Qsuite = () => {
  return (
    <SafeAreaView>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Qdrives!</ListItem.Title>
            <ListItem.Subtitle>Logistica y transporte</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
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
