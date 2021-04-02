import { auth } from '../firebase';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, View, Button } from 'react-native';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { Card, Tile, Avatar } from 'react-native-elements'
import Divider from 'react-native-divider';

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login");
            });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <Text>Log Out</Text>
                    {/* make symbol, whatever chai downloaded */}
                </TouchableOpacity>
                
            )
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    fontWeight: 'bold',
                    width: 350
                }}>
                    <Avatar
                    size="small"
                    rounded
                    containerStyle={{ marginRight: 20, marginTop: 20}}
                    source={{
                        uri:
                        'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png',
                    }}
                    />
                    <Text h1 style={styles.title}>W E L C O M E ,  J O H N !</Text>
                </View>
            <View>
                <Text style={styles.subtitle1}>Y O U R  D A I L Y  P R O G R E S S</Text>
                <View style={{marginBottom: 30}}>
                    <CalendarHeatmap 
                        endDate={new Date("2021-03-25")}
                        numDays={113}
                        colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
                    values={[
                        { date: '2021-03-01', count: 1 },
                        { date: '2021-03-23', count: 2 },
                        { date: '2021-03-03', count: 7000 },
                        { date: '2021-03-13', count: 4 },
                        { date: '2021-01-28', count: 0 },
                        { date: '2021-02-28', count: 3 },
                    ]}
                    // classForValue={(value) => {
                    //     if (!value) {
                    //     return 'color-empty';
                    //     }
                    //     return `color-scale-${value.count}`;
                    // }}
                    />
                </View>
            </View>
            <View style={{backgroundColor: '#EBEBEB'}}>
                <Text style={styles.subtitle2}>Y O U R  B E S T  W O R K O U T S</Text>
                <View style={{marginBottom: 20, borderRadius: 13}}>
                    <ScrollView horizontal={true}>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>Lunges</Card.Title>
                            <Card.Image style={styles.workoutimages} source={require('../assets/manlunge.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>Warm Up</Card.Title>
                            <Card.Image style={styles.workoutimages} source={require('../assets/manwarmup.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.subtitle2}>F O C U S</Text>
                <View style={{marginBottom: 20, borderRadius: 13}}>
                    <ScrollView horizontal={true}>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>Jump Rope</Card.Title>
                            <Card.Image style={styles.workoutimages} source={require('../assets/womanjumprope.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>Wide Squat</Card.Title>
                            <Card.Image style={styles.workoutimages}  source={require('../assets/womanlift.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                    </ScrollView>
                </View>
            </View>
            <View style={{backgroundColor: '#EBEBEB'}}>
                <Text style={styles.subtitle2}>Y O U R  T O P  M E A L S</Text>
                <View style={{marginBottom: 20, borderRadius: 13}}>
                    <ScrollView horizontal={true}>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>food1</Card.Title>
                            <Card.Image style={styles.workoutimages} source={require('../assets/fillerbox.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                        <Card style={{flex: 1, width: 100}}>
                            <Card.Title>food2</Card.Title>
                            <Card.Image style={styles.workoutimages} source={require('../assets/fillerbox.png')}>
                                <Button type="clear"/>
                            </Card.Image>
                        </Card>
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.subtitle2}>T H E  L A T E S T</Text>
                <Text>social media start</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
        );
    }


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        color: "#ffa200",
        paddingTop: 23,
        paddingBottom: 15,
        textAlign: 'center'
    },
    subtitle1: {
        fontSize: 14,
        textAlign: 'left',
        paddingLeft: 10,
        paddingBottom: 15,
        paddingTop: 20
    },
    subtitle2: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10,
        paddingTop: 20
    },
    workoutimages: {
        width: 100, 
        height: 100
    }
})

           {/* <Plotly style={styles.chart}
        data={[
            {
            //   x: [1, 2, 3],
            //   y: [2, 6, 3],
            //   type: 'scatter',
            //   mode: 'lines+markers',
            //   marker: {color: 'red'},
            z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
            },
            {type: 'heatmap'},
          ]}
          layout={ {width: 500, height: 400, title: 'Your Progress for the Week'} }
                    /> */}

// import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { Button, Input } from "react-native-elements";
// import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
// import { auth } from "../firebase";

// const LoginScreen = ({ navigation }) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((authUser) => {
//             console.log(authUser);
//             if(authUser) {
//                 navigation.replace("Home");
//             }
//         })

//         return unsubscribe;
//     }, []);

//     const signIn = () => {
//         auth
//             .signInWithEmailAndPassword(email, password)
//             .catch((err) => alert(err))
//     };

//     return (
//         <KeyboardAvoidingView behavior="padding" style={styles.container}>
//             <Image source = {require("../assets/logo.png")}/>
//             <View style={styles.inputContainer}>
//                 <Input 
//                     placeholder="Email" 
//                     placeholderTextColor="#afb9bd"
//                     underlineColorAndroid="transparent"
//                     autofocus 
//                     type="email" 
//                     value={email} 
//                     onChangeText={(text) => setEmail(text)}
//                 />
//             </View>
//             <View style={styles.inputContainer}>
//                 <Input 
//                     placeholder="Password" 
//                     placeholderTextColor="#afb9bd"
//                     underlineColorAndroid="transparent"
//                     secureTextEntry={true}
//                     type="password" 
//                     value={password} 
//                     onChangeText={(text) => setPassword(text)}
//                     onSubmitEditing={signIn}
//                 />
//             </View>
//             <Button type="clear" color="white" containerStyle={styles.button1} onPress={signIn} title="Sign In"  color="#ec9c3f"/>
//             <Text>Don't have an account?
//                 <TouchableWithoutFeedback>
//                     <Text containerStyle={styles.button2} onPress={() => navigation.navigate('SignUp')} color="#faf1e3" type="bold"> Sign up here</Text>
//                 </TouchableWithoutFeedback>
//             </Text>
//         </KeyboardAvoidingView>
        
//     );
// }

// export default LoginScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     inputContainer: {
//         borderRadius: 15,
//         width: 350,
//         height: 45,
//         marginBottom: 20,
//         backgroundColor: "#f6f6f6"
//     },
//     button1: {
//         width: 350,
//         marginTop: 15,
//         borderRadius: 15,
//         marginBottom: 20,
//         backgroundColor: "#ec9c3f",
//         color: "white"
//         },

//     text: {
//         width: 199,
//         height: 15,
//         left: 118,
//         top: 682,
//     },

//     button2: {
//         marginTop: 600,
//         color: "#afb9bd",
//         fontWeight: 'bold'
//     },
//     Input: {
//         height: 50,
//         flex: 1,
//         padding: 10,
//         marginLeft: 20,
//       },
// })

