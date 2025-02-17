// src/navigation/Navigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListingScreen from '../screens/ListingScreen';
import ShortlistedMoviesScreen from '../screens/ShortListedMoviesScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Movies" component={ListingScreen} />
        <Tab.Screen name="Shortlisted" component={ShortlistedMoviesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
