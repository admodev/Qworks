import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-elements";

class ControlPanel extends React.Component {
  render() {
    const closeControlPanel = () => {
      _drawer.close();
    };
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Funciona!</Text>
        <Button title="Cerrar menú" onPress={closeControlPanel} />
      </SafeAreaView>
    );
  }
}

export default ControlPanel;
