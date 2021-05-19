import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView as Kav, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase';
import {View, Text, Image, StyleSheet, TextInput, Input} from 'react-native';
import {Button} from 'react-native-elements';
import styled from "styled-components/native";
import {Feather as Icon} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

// let userID = auth?.currentUser?.uid

const OnboardingScreen = ({navigation}) => {

    // const [date, setDate] = useState(new Date())
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [userID, setUserID] = useState('');

    // const [calories, setCalories] = useState(0);
    // const [protein, setProtein] = useState(0);
    // const [carbs, setCarbs] = useState(0);
    // const [fat, setFat] = useState(0);

    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login');
            });
    };
    

    const changeVisited = async () => {
        try {
            await AsyncStorage.setItem('firstTime', 'true').then(() => {
                console.log("User data saved!");
                navigation.replace("App");
            })
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                console.log(authUser.uid)
                setUserID(authUser.uid)
            }
        })

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <Text>Log Out</Text>
                    {/* make symbol, whatever chai downloaded */}
                </TouchableOpacity>
                
            )})

        return unsubscribe;
    }, []);

    // function getMacros() {
    //     if(goalWeight > weight) {
    //         setCalories(weight*12);
    //     } else {
    //         setCalories(weight*18)
    //     }
    //     setProtein((calories*0.3)/4);
    //     setCarbs((calories*0.4)/4);
    //     setFat((calories*0.3)/9);
    // }

    function saveMeasurements() {
        if(goalWeight < weight) {
            var calories = parseInt(weight)*12
        } else {
            var calories = parseInt(weight)*18
        }

        const protein = (calories*0.3)/4
        const carbs = (calories*0.4)/4
        const fat = (calories*0.3)/9

        db
            .collection("users")
            .doc(userID)
            .set({
                // age: 0,
                details: {
                    age: age,
                    height: height,
                    weight: weight,
                    goalWeight: goalWeight,
                    activityLevel: activityLevel
                }, 
                macros: {
                    calories: calories,
                    protein: protein,
                    carbs: carbs,
                    fat: fat
                }
                // gender: '',
                // activityLevel: ''
            }, { merge: true })

    }

    function setFood() {
        let date = new Date().toISOString().split('T')[0];

        db
            .collection('users')
            .doc(userID)
            .collection('food')
            .doc(date)
            .set({
                calConsumed: 0,
                protein: 0,
                fat: 0,
                carbs: 0,
                meals: {}
            })
    }

    const helper = async () => {
        await changeVisited().then(() => {
            // getMacros();
            saveMeasurements();
            setFood();
        });
    }

    return(
        <Container> 
            <Main>
                <Heading>Personal Details</Heading>
                <Subheading>Some more info for amazing results</Subheading>
            </Main>
            <Auth>
                <AuthContainer>
                    <Textt>Age</Textt>
                    <AuthField 
                        value={age}
                        onChangeText={(text) => setAge(text)}
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                    />  
                </AuthContainer>
                <AuthContainer>
                    <Textt>Height</Textt>
                    <AuthField 
                        value={height}
                        onChangeText={(text) => setHeight(text)}
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                    />  
                </AuthContainer>
                <AuthContainer>
                    <Textt>Weight</Textt>
                    <AuthField 
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                        placeholder="lbs"
                        keyboardType="numeric"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                    />
                </AuthContainer>
                <AuthContainer>
                    <Textt> Goal Weight</Textt>
                    <AuthField 
                        onChangeText={setGoalWeight}
                        value={goalWeight}
                        placeholder="lbs"
                        placeholderTextColor="#96A7AF"
                        autoCapitalize="none"
                    />
                </AuthContainer>
                <AuthContainer>
                    <Textt> Activity Level</Textt>
                    <RNPickerSelect
                        onValueChange={(value) => setActivityLevel(value)}
                        items={[
                            { label: 'Sedentary', value: '0' },
                            { label: 'Light Exercise', value: '1' },
                            { label: 'Moderate Exercise', value: '8' },
                            { label: 'Heavy Exercise', value: '3' },
                            { label: 'Athlete', value: '4' }
                        ]}
                    />
                </AuthContainer>
            </Auth>
            <SignInContainer onPress={helper} title="Finish">
                <Text medium bold center color="#3DD598">Sign Up</Text>
            </SignInContainer>
        </Container>

    );
};

export default OnboardingScreen;

//const styles = StyleSheet.create({})

const Container = styled(Platform.OS === 'ios' ? Kav : View).attrs({
    behavior: Platform.OS === 'ios' && 'position',
  })`
    flex: 1;
    background: #000;
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
    width: 320px;
    height: 53px;
    margin-top: 28px;
    font-size: 42px;
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

const Textt = styled.Text`
    height: 29px;
    margin-right: 16px;
    font-size: 16px;
    line-height: 28px;
    color: #fff;
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
