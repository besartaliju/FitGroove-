import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Avatar, Header } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { auth } from "../firebase";
import { SafeAreaView } from 'react-native';

const ProfileScreen = ({ navigation }) => {

    return (
        
        <SafeAreaView style={styles.container}>
            <Avatar
            size="large"
            rounded
            containerStyle={{ marginTop: 35, marginBottom: 35}}
            source={{
                uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            />
        <View
        style={{
            flexDirection: "row",
            height: 75,
            width: 350,
            backgroundColor: '#F9F9F9',
            borderRadius: 10
        }}
        >
            <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Posts
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    N/A
                </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Followers
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    N/A
                </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                <Text style={{paddingBottom: 15}}>
                    Following
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    N/A
                </Text>
            </View>
        </View>
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
        backgroundColor: '#fff',
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
})

