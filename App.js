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
import FoodScreen from './screens/FoodScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import SocialScreen from './screens/SocialScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function Root() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="History" component={HistoryStack} />
        <Tab.Screen name="Workout" component={WorkoutStack} />
        <Tab.Screen name="Food" component={FoodStack} />
        <Tab.Screen name="Social" component={SocialStack} />
      </Tab.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </Stack.Navigator>
    )
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    )
  }

  function HistoryStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="History" component={HistoryScreen}/>
      </Stack.Navigator>
    )
  }

  function WorkoutStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Workout" component={WorkoutScreen}/>
      </Stack.Navigator>
    )
  }

  function FoodStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Food" component={FoodScreen}/>
      </Stack.Navigator>
    )
  }

  function SocialStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Social" component={SocialScreen}/>
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator keyboardHandlingEnabled='true'>
        <Stack.Screen options={{headerShown: false}} name="Auth" component={AuthStack} />
        <Stack.Screen options={{headerShown: false}} name="App" component={Root} />
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