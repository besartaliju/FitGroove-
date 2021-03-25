import React, { useState, useEffect } from 'react'
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace("App");
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
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autofocus 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('SignUp')} type="outline" title="Register" />
        </KeyboardAvoidingView>
        
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
