import React, { useState } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingPage from '../pages/OnboardingPage';
import LoginPage from '../pages/LoginPage';
import ChatPage from '../pages/ChatPage';
import RegisterPage from '../pages/RegisterPage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import AnunciatePage from '../pages/AnunciatePage';
import PagosPage from '../pages/PagosPage';
import ShopPage from '../pages/ShopPage';
import CardsUsuarios from '../components/Cards';
import MessagesScreen from '../pages/ChatMessages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge } from 'react-native-elements';
import { navigationRef } from '../RootNavigation';
import AnunciosPage from '../components/Anuncios.js';
import Chat from '../components/ChatComponent';
import AnuncioSeleccionado from '../components/Anuncio';
import MisComentariosPage from '../components/MisComentarios';
import CambiarNombreScreen from '../components/CambiarNombreComponent';
import FiltroDeComentarios from '../components/FiltroComentarios';
import RecomendarUsuario from '../components/RecomendarScreen';
import ComentarScreen from '../components/Comentar';
import EditarAnuncioScreen from '../components/EditarAnuncio';
import RecuperarPasswordScreen from '../components/RecuperarPassword';
import UserMessagesList from '../pages/MessagesList';
import RecomendacionesRenderizadas from '../pages/RecomendacionesPage';
import CambiarFotoPerfil from '../pages/CambiarFotoPerfil';
import EditarInformacionPersonalScreen from '../components/editarAnuncio/InformacionPersonal';
import EditarInformacionLaboralScreen from '../components/editarAnuncio/InformacionLaboral';
import EditarResumenPersonalScreen from '../components/editarAnuncio/ResumenPersonal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function MainTabNavigator({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fd5d13',
      }}
    >
      <Tab.Screen
        name="OnboardingPage"
        component={OnboardingPage}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'#fd5d13'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: 'Qdrives!',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={'#fd5d13'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={UserMessagesList}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color, size }) => (
            <View>
              {Chat.messages >= 1 && (
                <Badge
                  status="primary"
                  badgeStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    position: 'absolute',
                    backgroundColor: '#fd5d13',
                  }}
                  containerStyle={{ position: 'absolute', top: -4, left: -4 }}
                />
              )}
              <MaterialCommunityIcons
                name="comment-text"
                color={'#fd5d13'}
                size={35}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ShopPage"
        component={ShopPage}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shopping"
              color={'#fd5d13'}
              size={size}
            />
          ),
        }}
      />
      {isLogged ? (
        <Tab.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={'#fd5d13'}
                size={size}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={'#fd5d13'}
                size={size}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function MainStackNavigator({ navigation }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CardsUsuarios"
          component={CardsUsuarios}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="ChatComponent"
          component={Chat}
          options={{ title: 'QuedeOficios!', headerShown: false }}
          initialParams={{ firstUserId: null, secondUserId: null }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="AnunciatePage"
          component={AnunciatePage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="PagosPage"
          component={PagosPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="ShopPage"
          component={ShopPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="Anuncios"
          component={AnunciosPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="AnuncioSeleccionado"
          component={AnuncioSeleccionado}
          options={{ title: 'QuedeOficios!', headerShown: false }}
          initialParams={{ id: null }}
        />
        <Stack.Screen
          name="MisComentariosPage"
          component={MisComentariosPage}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="CambiarNombreScreen"
          component={CambiarNombreScreen}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="RecomendarUsuario"
          component={RecomendarUsuario}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="ComentarScreen"
          component={ComentarScreen}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="FiltroDeComentarios"
          component={FiltroDeComentarios}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="EditarAnuncioScreen"
          component={EditarAnuncioScreen}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="RecuperarPasswordScreen"
          component={RecuperarPasswordScreen}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="RecomendacionesRenderizadas"
          component={RecomendacionesRenderizadas}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="CambiarFotoPerfil"
          component={CambiarFotoPerfil}
          options={{ title: 'QuedeOficios!', headerShown: false }}
        />
        <Stack.Screen
          name="EditarInformacionPersonalScreen"
          component={EditarInformacionPersonalScreen}
          options={{ title: 'Quedeoficios!', headerShown: false }}
        />
        <Stack.Screen
          name="EditarInformacionLaboralScreen"
          component={EditarInformacionLaboralScreen}
          options={{ title: 'Quedeoficios!', headerShown: false }}
        />
        <Stack.Screen
          name="EditarResumenPersonalScreen"
          component={EditarResumenPersonalScreen}
          options={{ title: 'Quedeoficios!', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
