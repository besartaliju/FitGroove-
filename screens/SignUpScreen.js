import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
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

        


        /*
       <Container>
       <Main>
           <Box></Box>
           <Heading>Create Account,</Heading>
           <Subheading>Sign Up to get started!</Subheading>
       </Main>
       <Auth>
           <AuthContainer>
               <Icon
                   name={"user"}
                   color={"#40DF9F"}
                   size={32}
               />
               <AuthField
                   placeholder="Name" //changed from 'Username' to "Name"
                   placeholderTextColor="#96A7AF"
                   autoCapitalize="none"
                   autoCompleteType="name" // changed from 'username' to 'name'
                   autoCorrect={false}
                   autoFocus={true}
                   keyboardType="email-address"
                   clearButtonMode="while-editing"
                   onChangeText={name => setName(name.trim())} //changed 'username' to 'name' and changed 'setUsername' to 'setName'
                   value={name} //changed from username to name
               />
           </AuthContainer>
           
           <AuthContainer>
               <Icon
                   name={"mail"}
                   color={"#FFC542"}
                   size={32}
               />
               <AuthField
                   placeholder="Email"
                   placeholderTextColor="#96A7AF"
                   autoCapitalize="none"
                   autoCompleteType="email"
                   autoCorrect={false}
                   keyboardType="email-address"
                   clearButtonMode="while-editing"
                   onChangeText={email => setEmail(email.trim())}
                   value={email}
               />
           </AuthContainer>

           <AuthContainer>
               <Icon
                   name={"lock"}
                   color={"#FF575F"}
                   size={32}
               />
               <AuthField
                   placeholder="Password"
                   placeholderTextColor="#96A7AF"
                   autoCapitalize="none"
                   autoCompleteType="password"
                   autoCorrect={false}
                   secureTextEntry={true}
                   clearButtonMode="while-editing"
                   onChangeText={password => setPassword(password.trim())}
                   value={password}
               />
           </AuthContainer>
       </Auth>

       <ButtonWrap>
           <SignIn onPress={() => navigation.navigate("SignIn")}>
               <Icon
                   name={"arrow-left"}
                   color={"#3DD598"}
                   size={18}
               />
           </SignIn>

           <SignUpContainer disabled={loading} onPress={() => navigation.navigate("AvatarSetup")}>
               {loading ? (
                   <Loading />
               ) : (
                   <SignUpWrapper>
                       <Text medium bold center color="#ffffff" padding={"6px"}>Next</Text>
                       <Icon
                           name={"arrow-right"}
                           color={"white"}
                           size={18}
                       />
                   </SignUpWrapper>
                   
               )}
           </SignUpContainer>

       </ButtonWrap>
   
   </Container>
   */
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




/*
const Container = styled.View`
    flex: 1;
    background: #22343C;
`;

const Main = styled.View`
    margin: 139px 32px 48px;
`;

const Box = styled.View`
    width: 45px;
    height: 43px;
    background: #3ED598;
    box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
    border-radius: 12px;
`;

const Heading = styled.Text`
    height: 53px;
    margin-top: 28px;
    font-size: 28px;
    line-height: 49px;
    font-weight: bold;

    color: #FFFFFF;
`;

const Subheading = styled.Text`
    margin-top: 8px;
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

const ButtonWrap = styled.View`
    height: 49px;
    margin: 0px 32px;
    flexDirection: row;
`;

const SignUpContainer = styled.TouchableOpacity`
    flex: 1;
    height: 48px;
    flexDirection: row;
    align-items: center;
    justify-content: center;
    background-color: #40DF9F;
    box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
    border-radius: 12px;
    margin-left: 10px;
`;

const SignUpWrapper = styled.View`
    flexDirection: row;
    align-items: center;
    justify-content: center;
`;

const SignIn = styled.TouchableOpacity`
    width: 48px;
    height: 49px;
    align-items: center;
    justify-content: center;
    background-color: #286053;
    border-radius: 12px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "white",
    size: "small",

}))``;
*/