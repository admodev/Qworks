import "react-native-gesture-handler";
import * as React from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import EmailRegisterPage from "./pages/EmailRegisterPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import AnunciatePage from "./pages/AnunciatePage";
import PagosPage from "./pages/PagosPage";
import ShopPage from "./pages/ShopPage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from "@env";
import * as firebase from "firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CardsUsuarios from "./components/Cards";
import { navigationRef } from "./RootNavigation";
import { Badge } from "react-native-elements";
import Messages from "./pages/ChatMessages";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const StackNav = ({ navigation }) => {
  <Stack.Navigator
    initialRouteName="OnboardingPage"
    screenOptions={{
      headerStyle: { backgroundColor: "#633689" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <Stack.Screen name="BottomNav" component={BottomNav} />
    <Stack.Screen
      name="OnboardingPage"
      component={OnboardingPage}
      options={{ title: "QueDeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="CardsUsuarios"
      component={CardsUsuarios}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="SearchPage"
      component={SearchPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="ChatPage"
      component={ChatPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="RegisterPage"
      component={RegisterPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="EmailRegisterPage"
      component={EmailRegisterPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="ProfilePage"
      component={ProfilePage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="AnunciatePage"
      component={AnunciatePage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="PagosPage"
      component={PagosPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="ShopPage"
      component={ShopPage}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{ title: "QuedeOficios!", headerShown: false }}
    />
  </Stack.Navigator>;
};

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tabs.Navigator>
        <Tabs.Screen
          name="OnboardingPage"
          component={OnboardingPage}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            tabBarLabel: "Buscar",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ChatPage"
          component={ChatPage}
          options={{
            tabBarLabel: "Mensajes",
            tabBarIcon: ({ color, size }) => (
              <View>
                <Badge
                  status="primary"
                  badgeStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    position: "absolute",
                  }}
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                />
                <MaterialCommunityIcons
                  name="message"
                  color={color}
                  size={35}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            tabBarLabel: "Mi Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="face" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="ShopPage"
          component={ShopPage}
          options={{
            tabBarLabel: "Shop",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="shopping"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs.Navigator>
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

AppRegistry.registerComponent("main", () => "App");
