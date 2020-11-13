import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";

export default class ShopPage extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Card>
          <Text style={{ textAlign: "center", marginTop: 25 }} h3>
            ¡Hola!
          </Text>
          <Text style={{ margin: 20, textAlign: "justify" }} h3>
            En breve vas a poder disfrutar de esta sección.
          </Text>
          <TouchableOpacity
            onPress={({ navigation }) => this.props.navigation.goBack()}
          >
            <Text
              style={{
                ...Platform.select({
                  android: {
                    color: "orange",
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 20,
                  },
                  ios: {
                    color: "orange",
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 20,
                  },
                }),
              }}
            >
              Atrás
            </Text>
          </TouchableOpacity>
        </Card>
      </SafeAreaView>
    );
  }
}
