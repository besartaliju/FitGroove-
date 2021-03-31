import React, { useState, useEffect } from 'react'
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView as Kav, StyleSheet, Text, View, Platform } from 'react-native';
import { auth } from "../firebase";
import {Feather as Icon} from "@expo/vector-icons";
import styled from "styled-components/native";


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        // setLoading(true)
    };


    return(

        <Container>
            <Main>
                <Heading>Welcome!</Heading>
                <Subheading>Sign In to continue</Subheading>
            </Main>

            <Auth>
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
                        autoCompleteType="email"
                        autoCorrect={false}
                        autoFocus={false}
                        keyboardType="email-address"
                        clearButtonMode="while-editing"
                        value={email}
                        onChangeText={email => setEmail(email.trim())}
                        
                    />
                </AuthContainer>

                <AuthContainer>
                    <Icon
                        name={"lock"}
                        color={"#F52416"}
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
                        value={password}
                        onChangeText={password => setPassword(password.trim())}
                        onSubmitEditing={signIn}
                    />
                </AuthContainer>
            </Auth>

            <SignInContainer disabled={loading} onPress={signIn}>
                {loading ? (
                    <Loading />
                ) : (
                    <SignInWrapper> 
                        <Text medium bold center color="#ffffff" padding={"6px"}>Sign In</Text>
                        <Icon
                            name={"arrow-right"}
                            color={"white"}
                            size={18}
                        />
                    </SignInWrapper>
                    
                )}
            </SignInContainer>
            
            <ForgetPassword>
                <Text small center color="#FFFFFF" margin="15px">Forgot password?</Text>
            </ForgetPassword>
           
            <SignUpContainer onPress={() => navigation.navigate("SignUp")}>
                <Text medium bold center color="#3DD598">Create an account</Text>
            </SignUpContainer>
            
        </Container>
        
    );    
    

/*
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
*/
}

export default LoginScreen

/*
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
*/




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
    width: 209px;
    height: 53px;
    margin-top: 28px;
    font-size: 42px;
    line-height: 49px;
    font-weight: bold;

    color: #FFFFFF;
`;

const Subheading = styled.Text`
    margin-top: 8px;
    width: 190px;
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