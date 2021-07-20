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
  let [timerStart, setTimerStart] = useState(false);
  let [totalDuration, setTotalDuration] = useState(1800000);
  let [timerReset, setTimerReset] = useState(false);
  const handleTimerComplete = () => alert('Te quedaste sin tiempo!');
  let [items, setItems] = useState([]);

  useEffect(() => {
    chatsRef
      .where('user._id', '==', firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
          items.push({
            ultimoMensaje: doc.data().text,
            nombreDelUsuario: doc.data().user.name,
            emailDelUsuario: doc.data().user.email,
            usuario: doc.data().user._id,
          });
        });
        itm = items;
        setItems((items = items));
      });
  });

  function toggleTimer() {
    setTimerStart(!timerStart);
  }

  function resetTimer() {
    setTimerReset(!timerReset);
  }

  if (timerStart == true && totalDuration == 0) {
    resetTimer();
  }

  if (timerStart === false) {
    toggleTimer();
  }

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
        {items.map((u, i) => {
          return (
            <View key={i}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ChatComponent', {
                        userOne: firebase.auth().currentUser.uid,
                        userTwo: u.usuario,
                      })
                    }>
                    <ListItem.Title>
                      {!u.nombreDelUsuario
                        ? u.emailDelUsuario
                        : u.nombreDelUsuario}
                    </ListItem.Title>
                    <ListItem.Subtitle>{u.ultimoMensaje}</ListItem.Subtitle>
                  </TouchableOpacity>
                </ListItem.Content>
              </ListItem>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <Text style={{ fontSize: 18 }}>Se productivo, te quedan: </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons name='clock' color={'orange'} size={35} />
          <Timer
            totalDuration={totalDuration}
            minutes
            start={timerStart}
            reset={timerReset}
            handleFinish={handleTimerComplete}
            // getTime={(time) =>
            //   console.log('El tiempo corre a un segundo', time)
            // }
            options={options}
          />
        </View>
      </View>
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
