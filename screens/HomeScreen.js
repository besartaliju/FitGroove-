import { auth } from '../firebase';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Card, Tile, Avatar, Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const HomeScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    var user = auth.currentUser;

    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('Auth', {screen: 'Login'});
            });
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <Text>Log Out</Text>
                    {/* make symbol, whatever chai downloaded */}
                </TouchableOpacity>
                
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Text>Profile</Text>
                    {/* make symbol, whatever chai downloaded */}
                </TouchableOpacity>
            )
            
        })
        // const unsubscribe = auth.onAuthStateChanged(function(user) {
        //     if (user) {
        //         console.log(user.displayName)
        //         setName(user.displayName)
        //         setIsLoading(false)
        //     }
        //   });
    //    console.log(name)
        // if (user) {
        //     // console.log(user.displayName)
        //     setName(user.displayName)
        // }
        //   return () => unsubscribe();
    })
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    fontWeight: 'bold',
                    width: 350,
                    marginBottom: 35
                }}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                    <View>
                        <Text h1 style={styles.date}>05/19/2021</Text>
                        <Text h1 style={styles.title}>Hi, {user.displayName}!</Text>
                    </View>
                    )}
                    <Avatar
                    size="medium"
                    rounded
                    containerStyle={{ marginLeft: 200, marginTop: 22}}
                    source={{
                        uri:
                        'https://templesinaidc.org/wp-content/uploads/sites/57/2019/12/gray-square.jpg',
                    }}
                    />
                </View>
                <View style={styles.weightgoal} activeOpacity={0.7}>
                    <Text h1 style={styles.subtitle1}>Goal Weight: 200 lbs</Text>
                </View>
                <View style={styles.weightnow} activeOpacity={0.7}>
                    <Text h1 style={styles.subtitle1}>Current Weight: 220 lbs</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    width: 350,
                    marginBottom: 100,
                    alignSelf: "center"
                }}>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={200}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {fill => <Text style={styles.macros}>1857</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Calories</Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={200}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {fill => <Text style={styles.macros}>127</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Protein</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    width: 350,
                    marginBottom: 90,
                    alignSelf: "center"
                }}>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={200}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {fill => <Text style={styles.macros}>50</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Fat</Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={200}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {fill => <Text style={styles.macros}>70</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Carbs</Text>
                    </View>
                </View>
                <View style={styles.workoutpreview}>
                    <Text style={styles.workoutpreviewtitle}>
                        Today's Workout
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        alignContent: "center",
        alignItems: "center",
    },

    date: {
        fontSize: 14,
        color: "white",
        paddingTop: 23,
        paddingBottom: 5,
        marginLeft: 14,
        fontWeight: '300'
    },

    title: {
        fontSize:32, 
        fontWeight: "bold", 
        color:"white",
        marginLeft: 14,
        paddingBottom: 45,
    },
    subtitle1: {
        fontSize: 14,
        color: "white",
        textAlign: 'left',
    },
    weightgoal: {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: '#F52416',
        width:380,
        borderRadius:7,
        alignSelf: "center",
        marginBottom: 10
    },
    weightnow: {
        backgroundColor:'#1a4adb',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 30,
        width: 380

    },
    macros: {
        textAlign: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: '100',
      },
    progresstitle: {
        color: "white",
        marginTop: 7,
        fontWeight: '300',
        marginLeft: 45,
    },
    circularprogress: {
        marginRight: 70
    },
    workoutpreview: {
        height:300,
        width:380,
        marginLeft:10,
        marginRight:10,
        marginTop: 30,
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        backgroundColor:"#060507",
        borderWidth:3,
        borderColor:"#0F2027"
    },
    workoutpreviewtitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "100",
        paddingTop: 5,
        paddingLeft: 10,
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