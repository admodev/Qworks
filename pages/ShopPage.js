import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const ShopPage = () => {
    return(
        <View>
            <Text>Hola</Text>
        </View>
    );
}

export default ShopPage;
