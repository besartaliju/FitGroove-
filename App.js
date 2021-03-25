import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import NewUserInfoScreen from './screens/NewUserInfoScreen';
import ProfileScreen from './screens/Profile'
import FoodScreen from './screens/FoodScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import SocialScreen from './screens/SocialScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Food" component={FoodScreen} />
        <Tab.Screen name="Social" component={SocialScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          keyboardHandlingEnabled: true
        }}
         
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="NewUserInfoScreen" component={NewUserInfoScreen} />

        <Stack.Screen options={{headerShown: false}} name="App" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})