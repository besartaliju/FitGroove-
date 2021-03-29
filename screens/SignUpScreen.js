import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from "../firebase";
import { color } from 'react-native-reanimated';

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
            <Text style={styles.title}>J O I N  F I T G R O O V E</Text>
            <Text style={styles.subtitle}>Lets start your fitness journey together</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.fillText}>Name</Text>
                <Input containerStyle={styles.fill}
                    autofocus
                    underlineColorAndroid="transparent"
                    type="text" 
                    underlineColorAndroid="transparent"
                    value={name} 
                    onChangeText={(text) => setName(text)}
                />
                <Text style={styles.fillText}>Email</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="email" 
                    underlineColorAndroid="transparent"
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.fillText}>Password</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="password" 
                    underlineColorAndroid="transparent"
                    secureTextEntry
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                />
                <Text style={styles.fillText}>Date of Birth</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="text" 
                    underlineColorAndroid="transparent"
                />
                <Text style={styles.fillText}>Avatar (URL)</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="text" 
                    value={avatar} 
                    onChangeText={(text) => setAvatar(text)}
                    onSubmitEditing={signUp}
                />
            </View>

            <Button type="clear" containerStyle={styles.button} raised onPress={signUp} title="Sign Up" />
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    button: {
        width: 350,
        borderRadius: 13,
        marginTop: 380,
        backgroundColor: "#ffa200",
        borderRadius: 13,
    },
    inputContainer: {
        borderRadius: 10,
        width: 350,
        height: 45,
        marginTop: 40,

    },

    fill: {
        backgroundColor: "#f6f6f6",
        borderRadius: 13,
        height: 40
    },

    subtitle: {
        paddingTop: 15,
        color: "#afb9bd"
    },
    title: {
        marginTop: 10,
        fontSize: 24,
        color: "#ffa200",
        fontWeight : 'bold' 
    },
    fillText: {
        marginBottom: 10,
        marginTop: 10,
        color: "#6d6f70"
    }
})

