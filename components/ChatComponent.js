// @refresh reset
//
import React, { useState, useEffect, useCallback } from 'react';
import {
  GiftedChat,
  Actions,
  ActionsProps,
  Send,
} from 'react-native-gifted-chat';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import LoginPage from '../pages/LoginPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';

if (firebase.apps.length === 0) {
  try {
    firebase.initializeApp({
      apiKey: `${FIREBASE_API_KEY}`,
      authDomain: `${FIREBASE_AUTH_DOMAIN}`,
      databaseURL: `${FIREBASE_DATABASE_URL}`,
      projectId: `${FIREBASE_PROJECT_ID}`,
      storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
      messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
      appId: `${FIREBASE_APP_ID}`,
      measurementId: `${FIREBASE_MEASUREMENT_ID}`,
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error raised', err.stack);
    }
  }
}

export default function Chat({ route, navigation }) {
  const [senderData, setSenderData] = useState({
    nombre: '',
  });

  const [receiverData, setReceiverData] = useState({
    nombre: '',
    actividad: '',
  });
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [text, setText] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchSenderData() {
    try {
      setLoading(true);

      let fetchData = await firebase.default
        .database()
        .ref('anuncios/')
        .orderByChild('id')
        .equalTo(firebase.default.auth().currentUser.uid)
        .on('value', (snap) => {
          snap.forEach((child) => {
            setSenderData({
              ...senderData,
              nombre: child.val().nombre,
            });
          });
        });

      setLoading(false);

      return fetchData;
    } catch (error) {
      Alert.alert('Error', 'Error al conseguir los datos.');

      return console.error(error);
    }
  }

  async function fetchUserData() {
    try {
      setLoading(true);

      let fetchData = await firebase.default
        .database()
        .ref('anuncios/')
        .orderByChild('uuid')
        .equalTo(route.params.uuid)
        .once('value', (snap) => {
          snap.forEach((child) => {
            setReceiverData({
              ...receiverData,
              nombre: child.val().nombre,
              actividad: child.val().actividad,
            });
          });
        });

      setLoading(false);

      return fetchData;
    } catch (error) {
      Alert.alert('Error', 'Error al conseguir los datos.');

      return console.error(error);
    }
  }

  async function fetchMessages() {
    try {
      let newMessages = [];

      let messagesData = await firebase.default
        .database()
        .ref('chats/')
        .on('value', function (snapshot) {
          snapshot.forEach(function (child) {
            child.forEach((nestedChild) => {
              if (nestedChild.val().user.receiver === route.params.uuid) {
                newMessages.push({
                  newMessages: nestedChild.val().text,
                });
                setChatMessages(newMessages);

                console.log(chatMessages);
              }
            });
          });
        });

      return messagesData;
    } catch (error) {
      return console.error(error);
    }
  }

  const pickImage = () => {
    console.log('Placeholder function.');
  };

  useEffect(() => {
    fetchSenderData();
    fetchUserData();
    fetchMessages();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.prepend(previousMessages, messages)
      );
    },
    [messages]
  );

  async function handleSend(messages) {
    try {
      let data = {
        senderId: firebase.default.auth().currentUser.uid,
        receiverType: 'user',
        messageType: 'text',
        receiver: 'receiver',
        content: messages,
      };

      let sendMessagesToDatabase = await firebase.default
        .database()
        .ref('chats/')
        .push()
        .set(messages);

      return sendMessagesToDatabase;
    } catch (error) {
      return console.error(error);
    }
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          <MaterialCommunityIcons name='send' color={'#fd5d13'} size={28} />
        </View>
      </Send>
    );
  }

  function renderActions(ActionsProps) {
    return (
      <Actions
        {...ActionsProps}
        options={{
          ['Enviar Imágen']: () => pickImage,
        }}
        icon={() => (
          <MaterialCommunityIcons
            name='camera'
            color={'#fd5d13'}
            size={24}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              marginLeft: '3%',
            }}
          />
        )}
        onSend={handleSend}
      />
    );
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
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              left: 5,
              marginTop: 25,
              marginLeft: 15,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: 'transparent' }}>
              <MaterialCommunityIcons
                name='arrow-left'
                color={'#fd5d13'}
                size={32}
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  backgroundColor: 'transparent',
                }}
              />
            </TouchableOpacity>
          </View>
          <>
            <Text
              style={{
                margin: '2%',
                fontSize: 16,
              }}>
              Estas chateando con: {receiverData.nombre}
            </Text>
            <Text
              style={{
                margin: '2%',
                fontSize: 16,
              }}>
              Profesion: {receiverData.actividad}
            </Text>
            {chatMessages.map((element, index) => {
              return (
                <View key={index}>
                  <Text>{element.newMessages}</Text>
                </View>
              );
            })}
            <GiftedChat
              messages={messages}
              onSend={handleSend}
              user={{
                _id:
                  firebase.default.auth().currentUser &&
                  firebase.default.auth().currentUser.uid,
                user: 1,
                name: senderData.nombre,
                receiver: route.params.uuid,
              }}
              text={text}
              alwaysShowSend={text ? true : false}
              renderUsernameOnMessage={true}
              onInputTextChanged={(text) => setText(text)}
              renderLoading={() => (
                <ActivityIndicator size='large' color='#fd5d13' />
              )}
              isAnimated
              renderAvatarOnTop
              placeholder='Escribe tu mensaje...'
              loadEarlier={messages.length >= 20}
              scrollToBottom
              scrollToBottomComponent={() => (
                <MaterialCommunityIcons
                  name='arrow-down'
                  color={'#fd5d13'}
                  size={20}
                />
              )}
              renderSend={renderSend}
              renderActions={() => renderActions()}
            />
          </>
        </View>
      )}
    </SafeAreaView>
  );
}

const options = {
  container: {
    display: 'none',
  },
  text: {
    display: 'none',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
});
