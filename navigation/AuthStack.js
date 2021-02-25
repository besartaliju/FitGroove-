import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((res) => {
      if (res === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
      } else {
          setIsFirstLaunch(false);
      }
    });
  
  }, []);

  if(isFirstLaunch === null) {
    // console.log("NULL")
    return null
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen} 
            options={{header: () => null}}  
        />
        <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{header: () => null}}
        />
    </Stack.Navigator>
  );

}

export default AuthStack;