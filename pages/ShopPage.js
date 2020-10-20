import React from "react";
import {
    Alert,
    Image,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import * as RootNavigation from "../RootNavigation.js";

import { Card, Text } from "react-native-elements";

class ShopPage extends React.Component {
    render() {
        return(
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
            <Card>
            <Text h3>Esta sección se encuentra en desarrollo, pronto estará disponible!</Text>
            <TouchableOpacity onPress={() => RootNavigation.navigate('OnboardingPage')}>
                <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold", alignSelf: "center", margin: 20 }} >Atrás</Text>
            </TouchableOpacity>
            </Card>
            </SafeAreaView>
        ); 
    }
}
export default ShopPage;
