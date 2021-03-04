import { auth } from 'firebase';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
        auth()
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
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
