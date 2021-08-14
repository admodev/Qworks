import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  Input,
  ListItem,
} from 'react-native-elements';
import MessagesScreen from './ChatMessages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Timer } from 'react-native-stopwatch-timer';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

let user = firebase.auth().currentUser;
let items = [];
let usuario, ultimoMensaje;
let db = firebase.firestore();
let chatsRef = db.collection('chats/');

var itm = [];

export default function UserMessagesList({ route, navigation }) {
  let [items, setItems] = useState([]);

  async function fetchMessages() {
    let fetch = await firebase.default
      .database()
      .ref('chats/')
      .orderByKey()
      .on('value', function (snapshot) {
        let newItems = [];
        snapshot.forEach(function (child) {
          child.forEach((nestedChild) => {
            if (
              nestedChild.val().user._id ===
              firebase.default.auth().currentUser.uid
            ) {
              newItems.push({
                _id: nestedChild.val()._id,
                text: nestedChild.val().text,
                user: nestedChild.val().user,
              });
            }
          });
        });
        setItems(newItems);
      });

    try {
      await fetch;
    } catch (error) {
      return console.error(error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

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
      <ScrollView>
        {items.map((item, index) => {
          return (
            <View key={index}>
              {item.user._id === firebase.default.auth().currentUser.uid && (
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ChatComponent', {
                          userOneId: firebase.default.auth().currentUser.uid,
                          uuid: item.user.receiver,
                        })
                      }>
                      <ListItem.Title>
                        {!item.user.name ? 'Usuario' : item.user.name}
                      </ListItem.Title>
                      <ListItem.Subtitle>{item.text}</ListItem.Subtitle>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const options = {
  container: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#000000',
  },
};
