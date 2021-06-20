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
import { Timer } from 'react-native-stopwatch-timer';

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
  let [timerStart, setTimerStart] = useState(false);
  let [totalDuration, setTotalDuration] = useState(180000000);
  let [timerReset, setTimerReset] = useState(false);

  let firstUserId = route.params.userOne;
  let secondUserId = route.params.userTwo;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(false);
  const currentUser = firebase.auth().currentUser.uid;
  const usersIds = firstUserId + secondUserId;
  const db = firebase.firestore();
  const chatsRef = db.collection('chats/');
  const chatsArray = chatsRef.doc(usersIds);
  const chat = chatsArray.collection('/chat/');
  const selectedChat = chat.where('user', '==', currentUser);
  const database = firebase.database();
  const storage = firebase.storage();
  // Estado del chat mediante la función setTimeOut().
  const [chatActivo, setChatActivo] = useState(true);
  const storageRef = storage.ref();
  const defaultImageRef = storageRef.child('/defaultUserImage/icon.png');
  let [image, setImage] = useState('');

  const handleTimerComplete = () => alert('Te quedaste sin tiempo!');

  let key;
  let nombre;
  let fotoPerfil;
  let actividad;
  let emailPersonal;

  let fetchName = firebase
    .database()
    .ref('anuncios/')
    .orderByChild('id')
    .equalTo(currentUser)
    .on('value', (snap) => {
      snap.forEach((child) => {
        key = child.key;
        nombre = child.val().nombre;
        fotoPerfil = child.val().image;
        actividad = child.val().actividad;
        emailPersonal = child.val().emailPersonal;
      });
    });

  let userTwoNombre, userTwoActividad, userTwoEmail;

  firebase.default
    .database()
    .ref('anuncios/')
    .orderByChild('uuid')
    .equalTo(route.params.uuid)
    .once('value', (snap) => {
      snap.forEach((child) => {
        userTwoNombre = child.val().nombre;
        userTwoActividad = child.val().actividad;
        userTwoEmail = child.val().emailLaboral;
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

  function getFormattedTime(time) {
    let currentTime = time;
  }

  const textoChatVacio = 'Empieza a hablar para iniciar una conversación!';

  const receiver = secondUserId;

  useEffect(() => {
    toggleTimer();

    if (chatsRef.where('user.receiver', '==', receiver)) {
      const unsubscribe = chatsRef
        .where('user.receiver', '==', receiver)
        .onSnapshot((querySnapshot) => {
          const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({ type }) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data();
              return { ...message, createdAt: message.createdAt.toDate() };
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          appendMessages(messagesFirestore);
        });
      return () => unsubscribe();
    } else if (chatsRef.where('user.receiver', '==', currentUser)) {
      const unsubscribe = chatsRef
        .where('user.receiver', '==', receiver)
        .onSnapshot((querySnapshot) => {
          const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({ type }) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data();
              return { ...message, createdAt: message.createdAt.toDate() };
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          appendMessages(messagesFirestore);
        });
      return () => unsubscribe();
    }

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Perdón, necesitamos tu permiso para que puedas subir una foto!'
          );
        }
      }
    })();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.prepend(previousMessages, messages, image)
      );
    },
    [messages]
  );

  async function handleSend(messages) {
    const data = {
      senderId: firebase.auth().currentUser && currentUser,
      receiverType: 'user',
      messageType: 'text',
      receiver: receiver,
      content: messages,
    };
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all([writes, data]);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri.toString());
      const response = await fetch(uri);
      const blob = await response.blob();
      var photoRef = firebase
        .storage()
        .ref()
        .child('profilePictures/' + user.uid + '-' + ++anunciosCountResult);
      return photoRef.put(blob);
    }
  };

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
      {currentUser ? (
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
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
          {totalDuration > 0 ? (
            <>
              <Text
                style={{
                  margin: '2%',
                  fontSize: 16,
                }}>
                Estas chateando con: {userTwoNombre}
              </Text>
              <Text
                style={{
                  margin: '2%',
                  fontSize: 16,
                  color: '#fd5d13',
                }}>
                Email: {userTwoEmail}
              </Text>
              <Text
                style={{
                  margin: '2%',
                  fontSize: 16,
                }}>
                Profesion: {userTwoActividad}
              </Text>
              <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{
                  _id: firebase.auth().currentUser && currentUser,
                  user: 1,
                  name: nombre,
                  receiver: receiver,
                }}
                text={text}
                alwaysShowSend={text ? true : false || image ? true : false}
                renderUsernameOnMessage={true}
                onInputTextChanged={(text) => setText(text)}
                renderLoading={() => (
                  <ActivityIndicator size='large' color='#fd5d13' />
                )}
                isAnimated
                renderAvatarOnTop
                placeholder='Escribe tu mensaje...'
                receiver={{
                  receiver: receiver,
                  user: 2,
                  name: userTwoNombre,
                  actividad: userTwoActividad,
                  userTwoEmail: userTwoEmail,
                }}
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
          ) : (
            <View>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '50%',
                  marginLeft: '20%',
                  marginRight: '20%',
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                Tu tiempo se acabó, adquiere más tiempo para continuar
                conversando...
              </Text>
              <TouchableOpacity onPress={() => alert('Proximamente...')}>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10%',
                    marginLeft: '20%',
                    marginRight: '20%',
                    fontWeight: 'bold',
                    fontSize: 24,
                    color: 'orange',
                  }}>
                  Comprar más tiempo.
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      ) : (
        <LoginPage />
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
