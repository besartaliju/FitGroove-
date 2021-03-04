import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from "../firebase";

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])

    const signUp = async () => {
        try {
            await auth
            .createUserWithEmailAndPassword(email,password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: avatar || "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                })
            })
            // .onAuthStateChanged((user) => {
            //     alert(user.uid);
            //     if (user) {
            //         db
            //             .collection('users')
            //             .doc(user.uid)
            //             .add({
            //                 name: name,
            //                 details: {
            //                     age: 0,
            //                     height: 0,
            //                     weight: 0
            //                 }
            //             })
            //     }
            // })
            .catch((err) => alert(err.message))
            let userID = auth?.currentUser?.uid;
            await db
                .collection('users')
                .doc(userID)
                .set({
                    name: name,
                    details: {
                        age: 0,
                        height: 0,
                        weight: 0
                    }
                })

        } catch (err) {
            alert(err.message) 
        }
    }



    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text>SignUp</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Name" 
                    autofocus 
                    type="text" 
                    value={name} 
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email" 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"  
                    type="password" 
                    secureTextEntry
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder="Avatar (URL)" 
                    type="text" 
                    value={avatar} 
                    onChangeText={(text) => setAvatar(text)}
                    onSubmitEditing={signUp}
                />
            </View>

            <Button containerStyle={styles.button} raised onPress={signUp} title="SignUp" />
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
