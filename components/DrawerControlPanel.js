import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import CardsUsuarios from "./Cards";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pickerValueHolder: "",
      filter: [
        {
          option: "profesion",
        },
        {
          option: "aeiou",
        },
      ],
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch(CardsUsuarios)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const closeControlPanel = () => {
      _drawer.close();
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Button
          title=">"
          buttonStyle={{
            backgroundColor: "transparent",
            justifyContent: "flex-end",
            marginTop: 15,
            marginRight: 35,
          }}
          titleStyle={{ color: "#000000", fontSize: 28 }}
          onPress={closeControlPanel}
        />
          <View style={{ maxWidth: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Button
  title="Filtrar por ubicación"
  type="outline"
  buttonStyle={{ width: "100%", marginTop: 10 }}
/>
<Button
  title="Filtrar por recomendaciones"
  type="outline"
  buttonStyle={{ width: "100%", marginTop: 10 }}
/>
<Button
  title="Filtrar por comentarios"
  type="outline"
  buttonStyle={{ width: "100%", marginTop: 10 }}
/>
<Button
  title="Mis favoritos"
  type="outline"
  buttonStyle={{ width: "100%", marginTop: 10 }}
/>
</View>
        <ScrollView style={{ marginTop: 50 }}>
          <CardsUsuarios />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ControlPanel;