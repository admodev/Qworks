import React, { state, useState, setState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-elements";
import * as RootNavigation from "../RootNavigation.js";
import * as Location from "expo-location";

export default function UbicacionPage() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  Location;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        onPress={() => Location.getCurrentPositionAsync()}
        title="Ubicar"
      />
      <Text>{text}</Text>
    </SafeAreaView>
  );
}
