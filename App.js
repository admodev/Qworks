import "react-native-gesture-handler";
import * as React from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, Text } from "react-native-paper";
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
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from "@env";
import * as firebase from "firebase";

const Stack = createStackNavigator();

function App() {
  function TabsNav() {
    const MusicRoute = () => <Text>Music</Text>;

    const AlbumsRoute = () => <Text>Albums</Text>;

    const RecentsRoute = () => <Text>Recents</Text>;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: "music", title: "Music", icon: "queue-music" },
      { key: "albums", title: "Albums", icon: "album" },
      { key: "recents", title: "Recents", icon: "history" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
      music: MusicRoute,
      albums: AlbumsRoute,
      recents: RecentsRoute,
    });
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
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
          name="OnboardingPage"
          component={OnboardingPage}
          options={{ title: "QueDeOficios!", headerShown: false }}
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
          name="EmailLoginPage"
          component={EmailLoginPage}
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

AppRegistry.registerComponent("main", () => "App");
