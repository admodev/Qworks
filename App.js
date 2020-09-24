import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  function TabStack() {
    return (
      <Tab.Navigator
        initialRouteName="OnboardingPage"
        tabBarOptions={{
          activeTintColor: "#FFFFFF",
          inactiveTintColor: "#F8F8F8",
          style: {
            backgroundColor: "#633689",
          },
          labelStyle: {
            textAlign: "center",
          },
          indicatorStyle: {
            borderBottomColor: "#87B56A",
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen
          name="OnboardingPage"
          component={OnboardingPage}
          options={{
            tabBarLabel: "Inicio",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            tabBarLabel: "Ingresar",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="ChatPage"
          component={ChatPage}
          options={{
            tabBarLabel: "Chat",
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingPage"
        screenOptions={{
          headerStyle: { backgroundColor: "#633689" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{ title: "QuedeOficios!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
