import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView as Kav, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase";
import styled from "styled-components";
import {Feather as Icon} from "@expo/vector-icons";
//import Text from "../components/Text"; 

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
                    <Text> Onboarding </Text>
                    {/* make symbol, whatever chai downloaded */}
                </TouchableOpacity>
                
            )
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
                        weight: 0,
                        goalWeight: 0,
                        gender: '',
                        activityLevel: ''
                    }
                })

        } catch (err) {
            alert(err.message) 
        }
    }



    return (
        <Container>
            <Main>
                <Heading>Register Now!</Heading>
                <Subheading>Let's gather some information first</Subheading>
            </Main>
            <Auth>
                <AuthContainer>
                    <Icon
                        name={"mail"}
                        color={"#F52416"}
                        size={32}
                    />
                    <AuthField
                        placeholder="Name"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                        autofocus 
                        type="text" 
                        value={name} 
                        onChangeText={(text) => setName(text)}
                    />
                </AuthContainer>
                <AuthContainer>
                    <Icon
                        name={"mail"}
                        color={"#F52416"}
                        size={32}
                    />
                    <AuthField
                        placeholder="Email"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                        type="email" 
                        value={email} 
                        onChangeText={(text) => setEmail(text)}
                    />
                </AuthContainer> 
                <AuthContainer>
                    <Icon
                        name={"mail"}
                        color={"#F52416"}
                        size={32}
                    />
                    <AuthField
                        placeholder="Password"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                        type="password" 
                        secureTextEntry
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                    />
                </AuthContainer>
                <AuthContainer>
                    <Icon
                        name={"mail"}
                        color={"#F52416"}
                        size={32}
                    />
                    <AuthField 
                        placeholder="Avatar (URL)"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                        type="text" 
                        value={avatar} 
                        onChangeText={(text) => setAvatar(text)}
                        onSubmitEditing={signUp}
                    />
                </AuthContainer>
            </Auth>
            <SignInContainer raised onPress={signUp} title="SignUp">
                <Text medium bold center color="#3DD598">Sign Up</Text>
            </SignInContainer>
        </Container>
    )
}



export default SignUpScreen

const Container = styled(Platform.OS === 'ios' ? Kav : View).attrs({
    behavior: Platform.OS === 'ios' && 'position',
  })`
    flex: 1;
    background: #060507;
  `;

const Main = styled.View`
    margin: 139px 32px 48px;
`;

const Box = styled.View`
    width: 45px;
    height: 43px;
    background: #F52416;
    box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
    border-radius: 12px;
`;

const Heading = styled.Text`
    width: 300px;
    height: 53px;
    margin-top: 28px;
    font-size: 42px;
    line-height: 49px;
    font-weight: bold;

    color: #FFFFFF;
`;

const Subheading = styled.Text`
    margin-top: 8px;
    width: 350px;
    height: 29px;
    font-size: 22px;
    line-height: 28px;
    color: #96A7AF;
`;

const Auth = styled.View`
    margin: 0px 32px 32px;
`;

const AuthContainer = styled.View`
    border-bottom-color: black;
    border-bottom-width: 0px;
    margin-bottom: 16px;
    flexDirection: row;
    alignItems: center
`;


const AuthField = styled.TextInput`
    height: 48px;
    flex: 1;
    color: white
    font-size: 16px
    font-weight: 500
    padding: 10px
`;

// const SignInButton = styled.Button`
//     flex: 1;
//     flexDirection: row;
//     align-items: center;
//     justify-content: center;
// `;

const SignInContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    flexDirection: row;
    align-items: center;
    justify-content: center;
    background-color: #A9A5D5; 
    box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
    border-radius: 12px;
`;

const SignInWrapper = styled.View`
    flex: 1;
    flexDirection: row;
    align-items: center;
    justify-content: center;
`;


const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "white",
    size: "small",
}))``;

const SignUpContainer = styled.TouchableOpacity`
    margin: 30px 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #A9A5D5;
    border-radius: 12px;
`;

const ForgetPassword = styled.View`
    margin-top: 10px
    align-items: center;
    justify-content: center;
    background-color: #96A7AF;
    margin: 15px 120px 5px 120px;
    border-radius: 5px;
`;