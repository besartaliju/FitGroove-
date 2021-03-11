import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home");
            }
        })

        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => alert(err))
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source = {require("../assets/logo.png")}/>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    placeholderTextColor="#afb9bd"
                    underlineColorAndroid="transparent"
                    autofocus 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Password" 
                    placeholderTextColor="#afb9bd"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button type="solid" color="white" containerStyle={styles.button1} onPress={signIn} title="Sign In"  color="#ec9c3f"/>
            <Text>Don't have an account?
                <TouchableWithoutFeedback>
                    <Text containerStyle={styles.button2} onPress={() => navigation.navigate('SignUp')} color="#faf1e3" type="bold"> Sign up here</Text>
                </TouchableWithoutFeedback>
            </Text>
        </KeyboardAvoidingView>
        
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        borderRadius: 15,
        width: 350,
        height: 45,
        marginBottom: 20,
        backgroundColor: "#f6f6f6"
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
