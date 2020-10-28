import React, { useState, setState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    ScrollView,
    SafeAreaView,
    Text,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from '@react-navigation/native';
import CardsUsuarios from "./Cards";
import Botonera from "./BotoneraAnuncios";

export default class AnunciosPage extends React.Component {
    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
            <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Text>Card</Text>
<Text>Card</Text>
<Text>Card</Text>
<Text>Card</Text>
<Text>Card</Text>
            <Card.Divider/>
            </Card>
            <Botonera />
            </SafeAreaView>
        );
    }
}
