import { auth, db } from '../firebase';
import React, { useEffect, useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Card, Tile, Avatar, Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const HomeScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [userMacros, setUserMacros] = useState({});
    const [dailyData, setDailyData] = useState({});
    var user = auth.currentUser;

    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('Auth', {screen: 'Login'});
            });
    };

    const fetchUserData = async () => {
        try {
            const response = await db
                .collection("users")
                .doc(user.uid)
                .get();

            let data = response.data();
            // console.log(data.details)
            setUserData(data.details)
            // console.log(data.macros)
            setUserMacros(data.macros)
            // setIsLoading(false)
        } catch(err) {
            console.error(err);
        }
    }

    // const fetchDailyData = async () => {
    //     let date = new Date().toISOString().split('T')[0];
    //     try {
    //         const unsubscribe = await db
    //             .collection("users")
    //             .doc(user.uid)
    //             .collection('food')
    //             .doc(date)
    //             .onSnapshot((doc) => {
    //                 console.log(doc.data())
    //                 setDailyData(doc.data());
    //             })

    //         return unsubscribe
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }

    useLayoutEffect(() => {
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
        fetchUserData();
        // fetchDailyData();
        let date = new Date().toISOString().split('T')[0];
        const unsubscribe = db
                .collection("users")
                .doc(user.uid)
                .collection('food')
                .doc(date)
                .onSnapshot((doc) => {
                    console.log(doc.data())
                    setDailyData(doc.data());
                })

        return unsubscribe
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    fontWeight: 'bold',
                    width: 350,
                    marginBottom: 25
                }}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                    <View>
                        <Text h1 style={styles.date}>04/01/2021</Text>
                        <Text h1 style={styles.title}>Hi, {user.displayName}!</Text>
                    </View>
                    )}
                    <Avatar
                    size="medium"
                    rounded
                    containerStyle={{ marginLeft: 200, marginTop: 22}} //THIS IS TEMPORARY REMEMBER TO FIX
                    source={{
                        uri:
                        'https://templesinaidc.org/wp-content/uploads/sites/57/2019/12/gray-square.jpg',
                    }}
                    />
                </View>
                <View style={styles.weightgoal} activeOpacity={0.7}>
                    <Text h1 style={styles.subtitle1}>Goal Weight: {userData.goalWeight} lbs</Text>
                </View>
                <View style={styles.weightnow} activeOpacity={0.7}>
                    <Text h1 style={styles.subtitle1}>Current Weight: {userData.weight} lbs</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    width: 350,
                    marginBottom: 150,
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={Math.floor((dailyData.calConsumed / userMacros.calories) * 100)}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {(fill) => <Text style={styles.macros}>{userMacros.calories}</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Calories</Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={Math.floor((dailyData.protein / userMacros.protein) * 100)}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {(fill) => <Text style={styles.macros}>{userMacros.protein}</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Protein</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    height: 75,
                    width: 350,
                    marginBottom: 25,
                    alignItems: "center"
                }}>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={Math.floor((dailyData.fat / userMacros.fat) * 100)}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {(fill) => <Text style={styles.macros}>{userMacros.fat}</Text>}
                        </AnimatedCircularProgress>
                        <Text style={styles.progresstitle}>Fat</Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={Math.floor((dailyData.carbs / userMacros.carbs) * 100)}
                        tintColor="#00e0ff"
                        style={styles.circularprogress}
                        backgroundColor="#3d5875">
                            {(fill) => <Text style={styles.macros}>{userMacros.carbs}</Text>}
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
        backgroundColor: '#232224',
        alignItems: 'center'
    },

    date: {
        fontSize: 14,
        color: "white",
        paddingTop: 23,
        paddingBottom: 5,
        fontWeight: '100'
    },

    title: {
        fontSize: 24,
        color: "white",
        paddingBottom: 50,
    },
    subtitle1: {
        fontSize: 14,
        color: "white",
        textAlign: 'left',
    },
    weightgoal: {
        backgroundColor:'#0037de',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        borderRadius: 8,
        
        marginBottom: 20
    },
    weightnow: {
        backgroundColor:'#1a4adb',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        borderRadius: 8,
        
        marginBottom: 90

    },
    macros: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 40,
        fontWeight: '100',
      },
    progresstitle: {
        color: "white",
        marginTop: 7,
        fontWeight: '200',
        marginLeft: 45,
    },
    circularprogress: {
        marginRight: 70
    },
    workoutpreview: {
        backgroundColor:'#303030',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        borderRadius: 8,
        height: 500,
        marginBottom: 20,
        marginTop: 50,
    },
    workoutpreviewtitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "100"
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