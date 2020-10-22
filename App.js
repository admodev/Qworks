import "react-native-gesture-handler";
import * as React from "react";
import { AppRegistry, View } from "react-native";
import MainStackNavigator from "./navigation/AppNavigator.js";
import { Badge } from "react-native-elements";
import { navigationRef } from "./RootNavigation";

export default function App() {
    return(
      <MainStackNavigator />
      );
}

