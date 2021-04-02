import { auth, db } from '../firebase';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components"; //new addition

const user = auth.currentUser;

const HomeScreen = ({navigation}) => {

    function email() {
        if(user) {
            console.log("User email: ", user.email );
        }
    }
    
    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Auth", {screen: 'Login'});
            });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
                
            )
        })
    })

    return (
        <SafeAreaView>
            <Text>Homie Screen</Text>
            <Button onPress={signOutUser} title="SignOut" />
            <Button onPress={() => navigation.navigate("Profile")} title="Profile" />
            <Button onPress={email} title="Email" />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
