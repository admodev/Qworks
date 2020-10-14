import React, { useState } from "react";
import { Picker, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements";
import CardsUsuarios from "./Cards";

const ControlPanel = () => {
  const [selectedValue, setSelectedValue] = useState("calificacion");
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Ubicación" value="ubicacion" />
          <Picker.Item label="Calificación" value="calificacion" />
          <Picker.Item label="Favoritos" value="favoritos" />
        </Picker>
      </View>
      <ScrollView style={{ marginTop: 150 }}>
        <CardsUsuarios />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ControlPanel;
