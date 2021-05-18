import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import FoodScreen from './screens/FoodScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import SocialScreen from './screens/SocialScreen';
import ProfileScreen from './screens/ProfileScreen';
import  MyExercise  from './screens/MyExercise';
import NewExercise from './screens/NewExercise';
import FindExercise from './screens/FindExercise';
import FoodInfoScreen from './screens/FoodInfoScreen';
import SearchFoodScreen from './screens/SearchFoodScreen';
import startWorkout from './screens/startWorkout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  function Root() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'timer' : 'timer-outline';
            }
            else if (route.name === 'Workout') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            }
            else if (route.name === 'Food') {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            }
            else if (route.name === 'Social') {
              iconName = focused ? 'people' : 'people-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions= {{
          activeBackgroundColor: "#132026",
          inactiveBackgroundColor: "#132026",
          activeTintColor: 'tomato',
          inactiveTintColor: 'white',
        }}
        >
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
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </Stack.Navigator>
    )
  }

  function HomeStack() {
    return (
      <Stack.Navigator >
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
        <Stack.Screen name="SearchFood" component={SearchFoodScreen}/>
        <Stack.Screen name="FoodInfo" component={FoodInfoScreen}/>
      </Stack.Navigator>
    )
  }

  function SocialStack() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Social" component={SocialScreen}/>
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator keyboardHandlingEnabled='true'>
        <Stack.Screen name="Fit Groove" component={Root} />
        <Stack.Screen options={{headerShown: false}} name="MyExercise" component={MyExercise}/>
        <Stack.Screen options={{headerShown: false}} name="NewExercise" component={NewExercise}/>
        <Stack.Screen options={{headerShown: false}} name="FindExercise" component={FindExercise}/>
        <Stack.Screen options={{headerShown: false}} name="startWorkout" component={startWorkout}/>
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