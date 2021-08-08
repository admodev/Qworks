import React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

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
            margin: 20,
            padding: 5,
            height: 'auto',
          }}>
          <Input
            placeholder='Que estas pensando?...'
            multiline={true}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Button
            title='Publicar'
            buttonStyle={{
              width: 120,
              marginLeft: 190,
              marginBottom: 5,
              padding: 5,
              borderRadius: 15,
              backgroundColor: '#fd5d13',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
