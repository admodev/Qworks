import React from "react";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements";

export default function CambiarNombreScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input
        placeholder="Escribe tu nombre..."
        inputContainerStyle={{
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
    </SafeAreaView>
  );
}
