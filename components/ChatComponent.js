// @refresh reset
//
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from "@env";
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import * as RootNavigation from "../RootNavigation.js";

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
            console.error("Firebase initialization error raised", err.stack);
        }
    }
}

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function Chat() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    const currentUser = firebase.auth().currentUser;

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

    if (!user) {
        () => RootNavigation.navigate("LoginPage");
    }

    const secondUser = "CBlLQIfFijbs1Hh7jWWEhkKfIkN2";

    return <GiftedChat messages={messages} user={{
        user,
        secondUser
    }} onSend={handleSend} />
}

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
})
