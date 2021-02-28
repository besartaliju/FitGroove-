import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import {Image} from 'react-native'

const tab = createBottomTabNavigator();
const BottomNavigator = () => {
    return(
        <Tab.navigation
            tabBarOptions={{
                style: {
                    height: 65,
                    justifyContent:"center",
                    paddingVertical: 15,
                    backgroundColor: "#eff4f0",
                    elevation: 2

                }

            }}
        >
            <Tab.Screen
                name = "Home"
                component = {Home}
                options= {{
                    tabBarLabel: "",
                    tabBarIcon:({color, size}) => (
                        <Image
                            source={require("../images.1.png")}
                            style={{height:20, width:20}}
                         />
                    )
                }}
             />
             </Tab.Navigator>
    );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
        headerShown: false
}
const HomeStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions ={screenOptionStyle}>
            <Stack.Screen name = "Home" component = {BottomNavigator} />
            <Stack.Screen name = "Detail" component = {Detail} />
         </Stack.Navigator>
    )
}

export default HomeStackNavigator;