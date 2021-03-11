import  React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  WorkoutScreen  from '../../screens/WorkoutScreen';

function HomeScreen() {
  return (
    <View style={{
        flex: 1,
        backgroundColor:"#FFF",
        }}>
            <View style={{
                backgroundColor:"#ff9900",
                height: "28%",
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20
            }}>
            </View>
     </View>
  );
}

function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>History!</Text>
    </View>
  );
}

function WorkoutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Workout!</Text>
    </View>
  );
}

function FoodScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Food!</Text>
    </View>
  );
}

function SocialScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Social!</Text>
    </View>
  );
}



const Tab = createBottomTabNavigator();
function MyTabs () {
    return(
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                      return (
                        <Ionicons
                          name={ focused ? 'home' : 'home-outline'}
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name === 'History') {
                      return (
                        <Ionicons
                          name={focused ? 'list' : 'list-outline'}
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name == 'Workout') {
                        return (
                            <Ionicons
                                name={focused ? 'barbell' : 'barbell-outline'}
                                size={size}
                                color={color}
                            />
                        );

                    }else if (route.name == 'Food') {
                        return (
                             <Ionicons
                                name={focused ? 'fast-food' : 'fast-food-outline'}
                                size={size}
                                color={color}
                             />
                        );

                    }else if (route.name == 'Social') {
                        return (
                             <Ionicons
                                name={focused ? 'people' : 'people-outline'}
                                size={size}
                                color={color}
                                />
                        );
                    }
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#ff9900',
                  inactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
                <Tab.Screen name="History" component={HistoryScreen} />
                <Tab.Screen name="Workout" component={WorkoutScreen} />
                <Tab.Screen name="Food" component={FoodScreen} />
                <Tab.Screen name="Social" component={SocialScreen} options={{ tabBarBadge: 5}} />
              </Tab.Navigator>

    );
}
export default function App() {
  return (
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
  );
}
