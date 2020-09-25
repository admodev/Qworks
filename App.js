import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import EmailLoginPage from "./pages/EmailLoginPage";
import EmailRegisterPage from "./pages/EmailRegisterPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import AnunciatePage from "./pages/AnunciatePage";
import PagosPage from "./pages/PagosPage";

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
          name="SearchPage"
          component={SearchPage}
          options={{
            tabBarLabel: "Buscar",
          }}
        />
        <Tab.Screen
          name="OnboardingPage"
          component={OnboardingPage}
          options={{
            tabBarLabel: "Inicio",
          }}
        />
        <Tab.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            tabBarLabel: "Ingresar",
          }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            tabBarLabel: "Mi Perfil",
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
          name="SearchPage"
          component={SearchPage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="EmailLoginPage"
          component={EmailLoginPage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="EmailRegisterPage"
          component={EmailRegisterPage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="AnunciatePage"
          component={AnunciatePage}
          options={{ title: "QuedeOficios!" }}
        />
        <Stack.Screen
          name="PagosPage"
          component={PagosPage}
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
