// import React from 'react';
// import { StyleSheet, Text, View, Image, Button } from 'react-native';
// import * as Google from 'expo-google-app-auth';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       signedIn: false,
//       name: "",
//       photoUrl: ""
//     }
//   }
//   signIn = async () => {
//     try {
//       var result = await Google.logInAsync({
//         // androidClientId: YOUR_CLIENT_ID_HERE,
//         iosClientId: "971289665924-ld93edvctneah0adqes12jrs6avt0551.apps.googleusercontent.com",
//         scopes: ['profile', 'email'],
//       });

//       if (result.type === "success") {
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: result.user.photoUrl
//         })
//       } else {
//         console.log("cancelled")
//       }
//     } catch (e) {
//       console.log("error", e)
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.signedIn ? (
//           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//         ) : (
//           <LoginPage signIn={this.signIn} />
//         )}
//       </View>
//     )
//   }
// }

// const LoginPage = props => {
//   return (
//     <View>
//       <Text style={styles.header}>Sign In With Google</Text>
//       <Button title="Sign in with Google" onPress={() => props.signIn()} />
//     </View>
//   )
// }

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   header: {
//     fontSize: 25
//   },
//   image: {
//     marginTop: 15,
//     width: 150,
//     height: 150,
//     borderColor: "rgba(0,0,0,0.2)",
//     borderWidth: 3,
//     borderRadius: 150
//   }
// })

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if(isFirstLaunch === null) {
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