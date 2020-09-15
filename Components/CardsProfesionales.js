import * as React from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Card, Layout } from "@ui-kitten/components";
import { default as theme } from "../custom-theme.json";

export default class CardsProfesionales extends React.Component {
  render() {
    const Header = (props) => (
      <View {...props}>
        <Text category="h6">Usuario</Text>
        <Text category="s1">Albañil</Text>
      </View>
    );
    return(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
              <Card style={styles.card} header={Header}>
                <Text style={{ fontSize: 16 }}>Contratar</Text>
              </Card>
        </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 1,
    shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
})
