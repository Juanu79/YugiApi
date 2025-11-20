import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Tu estructura REAL (como enviaste):
import Home from '../componentes/Home';
import Perfil from '../componentes/Perfil';
import Original from '../componentes/Original';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          paddingBottom: 5,
        }
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Home}
        options={{ title: 'Inicio' }}
      />

      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{ title: 'Perfil' }}
      />

      <Tab.Screen 
        name="Original" 
        component={Original}
        options={{ title: 'Original' }}
      />

    </Tab.Navigator>
  );
}
