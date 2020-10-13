import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-elements";

class ControlPanel extends React.Component {
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
      </SafeAreaView>
    );
  }
}

export default ControlPanel;
