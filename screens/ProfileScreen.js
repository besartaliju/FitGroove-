import React, { useState, useEffect, useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Avatar, Header } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { auth, db } from "../firebase";
import { SafeAreaView, ActivityIndicator } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    // const [currentWeight, setCurrentWeight] = useState('');
    // const [goalWeight, setGoalWeight] = useState('');
    const user = auth.currentUser;
    const stateHelperFunction = (data) => {
        setUserData(data);
        console.log(userData);
    }
    const fetchUserData = async () => {
        try {
            const response = await db
                .collection("users")
                .doc(user.uid)
                .get();

            let data = response.data();
            console.log(data.details)
            setUserData(data)
            setIsLoading(false)
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (user) {
            console.log(auth.currentUser.displayName)
            // setName(auth.currentUser.displayName)
        }

        fetchUserData();
        // console.log(userData)
        
        return () => setUserData({})
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Avatar
            size="large"
            rounded
            containerStyle={{ marginTop: 35, marginBottom: 20}}
            source={{
                uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            />
        <Text style={{color: 'white', marginTop: 7, marginBottom: 35, fontSize: 24}}>{userData.name}</Text>
        {isLoading ? (
            <ActivityIndicator />
        ) : (
        <View
            style={{
                flexDirection: "row",
                height: 75,
                width: 350,
                backgroundColor: 'gray',
                borderRadius: 10,
                color: 'white'
            }}
            >
            <View style={{flex: 1, color: 'white', alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Weight
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {userData.details.weight}
                </Text>
            </View>
            <View style={{flex: 1, color: 'white', alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Goal
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {userData.details.height}
                </Text>
            </View>
            <View style={{flex: 1, color: 'white', alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Age
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {userData.details.age}
                </Text>
            </View>
        </View>
        )}
        <View style={styles.posts}>
            <Text>You have not uploaded any posts yet!</Text>
        </View>
        </SafeAreaView>
        
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
    },
    inputContainer: {
        borderRadius: 15,
        width: 350,
        height: 45,
        marginBottom: 20,
        backgroundColor: "#f6f6f6"
    },
    
    posts: {
        justifyContent: "center",
        paddingTop: 120
    },

    button1: {
        width: 350,
        marginTop: 15,
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: "#ec9c3f",
        color: "white"
        },

    text: {
        width: 199,
        height: 15,
        left: 118,
        top: 682,
        color: "#F9F9F9"
    },

    button2: {
        marginTop: 600,
        color: "#afb9bd",
        fontWeight: 'bold'
    },
    Input: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
    posts: {
        color: "white"
    }
})

