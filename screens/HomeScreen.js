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
                    <Text h1 style={styles.subtitle1}>Goal Weight: 200 lbs</Text>
                </View>
                <View style={styles.weightnow} activeOpacity={0.7}>
                    <Text h1 style={styles.subtitle1}>Current Weight: 220 lbs</Text>
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
                        fill={100}
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
                        fill={100}
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
                    marginBottom: 25,
                    alignItems: "center"
                }}>
                    <View>
                        <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={100}
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
                        fill={100}
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

            {/* <View>
                <Text style={styles.subtitle1}>Y O U R  D A I L Y  P R O G R E S S</Text>
                <View style={{marginBottom: 30}}>
                    
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
            </View> */}
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