import { auth } from '../firebase';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components"; //new addition

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
                </TouchableOpacity>
                
            )
        })
    })

    return (
        <SafeAreaView>
            <Text>Homie Screen</Text>
            <Button onPress={signOutUser} title="SignOut" />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
