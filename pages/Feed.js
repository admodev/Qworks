import React from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Avatar, Button, Card, Icon, Input, Text } from 'react-native-elements';

const Feed = () => {
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>
        <View
          style={{
            position: 'relative',
            border: 'solid',
            borderWidth: 1,
            borderColor: '#000111',
            borderRadius: 15,
            margin: Platform.OS === 'android' ? 50 : 20,
            padding: 5,
            height: 'auto',
          }}>
          <Input
            placeholder='Que estas pensando?...'
            multiline={true}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Button
            onPress={() =>
              Alert.alert(
                'Proximamente!',
                'Pronto podras disfrutar de los beneficios de Qsocial!'
              )
            }
            title='Publicar'
            buttonStyle={{
              width: 120,
              marginLeft: Platform.OS === 'android' ? 120 : 190,
              marginBottom: 5,
              padding: 5,
              borderRadius: 15,
              backgroundColor: '#fd5d13',
            }}
          />
        </View>
        <Card containerStyle={{ borderRadius: 25 }}>
          <Card.Title>Miguel Martinez</Card.Title>
          <Card.Divider />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar
              size='large'
              rounded
              icon={{ name: 'user', type: 'font-awesome' }}
              containerStyle={{ flex: 1 }}
              iconStyle={{
                backgroundColor: 'gray',
                borderRadius: 15,
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              Que buen trabajo que realizo @Ernesto
            </Text>
          </View>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: '#fd5d13',
            }}
            title='Compartir'
            onPress={() =>
              Alert.alert(
                'Proximamente!',
                'Pronto podras disfrutar de los beneficios de Qsocial!'
              )
            }
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
