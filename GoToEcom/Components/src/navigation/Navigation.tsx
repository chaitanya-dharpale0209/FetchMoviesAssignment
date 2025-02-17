import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListingScreen from '../screens/ListingScreen';
import ShortlistedMoviesScreen from '../screens/ShortListedMoviesScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Movies') {
              iconName = focused ? 'film' : 'film';  
            } else if (route.name === 'Shortlisted') {
              iconName = focused ? 'heart' : 'heart'; 
            }

           
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Movies" component={ListingScreen} />
        <Tab.Screen name="Shortlisted" component={ShortlistedMoviesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
