import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView as Kav, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase';
//import DatePicker from 'react-native-date-picker'

import {View, Text, Button, Image, StyleSheet, TextInput, Input} from 'react-native';
import styled from "styled-components/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// let userID = auth?.currentUser?.uid

const OnboardingScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date())
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [userID, setUserID] = useState('');

    const signOutUser = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login');
            });
    };

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

    function saveMeasurements() {
        // console.log(userID);
        // try {
        //     db
        //         .collection("users")
        //         .doc(userID)
        //         .add({
        //             // age: 0,
        //             details: {
        //                 height: height,
        //                 weight: weight,
        //                 goalWeight: goalWeight,
        //             }
        //             // gender: '',
        //             // activityLevel: ''
        //         })
                
        //         console.log("cod")
        //         AsyncStorage.setItem('first_time', 'true').then(() => {
        //             console.log("User data saved!");
        //             navigation.replace("App");
        //         })

        // } catch(err) {
        //     console.error(err);
        // }

        db
            .collection("users")
            .doc(userID)
            .set({
                // age: 0,
                details: {
                    height: height,
                    weight: weight,
                    goalWeight: goalWeight,
                }
                // gender: '',
                // activityLevel: ''
            }, { merge: true })
                
        console.log("cod")
        AsyncStorage.setItem('first_time', 'true').then(() => {
            console.log("User data saved!");
            navigation.replace("App");
        })

    }


    return(
        <Container> 
            <Main>
                <Heading>Personal Details</Heading>
                <Subheading> Let us know about you to speed up the result, get fit fast with great results! </Subheading>
            </Main>

            <Text> Birthday </Text>
            <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    //mode={mode}
                    is24Hour={true}
                    display="default"
                    onChangeText={(text) => setDate(text)}
            />

            <Text> Height </Text>
            <TextInput 
                style={styles.input}
                value={height}
                onChangeText={(text) => setHeight(text)}
            >  
            
            </TextInput>

            {/* <Picker
                    selectedValue={height}
                    onValueChange={(itemValue, itemIndex) =>
                    setHeight(itemValue)
                }>
            
                <Picker.Item label="5 ft" value="5ft" />
                <Picker.Item label="6 ft" value="6ft" />
            </Picker> */}

            <Text> Weight </Text>
            <TextInput 
                style={styles.input}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder="lbs"
                keyboardType="numeric"
            >        
            </TextInput>


            <Text> Goal Weight</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setGoalWeight}
                value={goalWeight}
                placeholder="lbs"
                
            >  
            </TextInput>

            {/* <BirthdayText>
                Birthday     
            </BirthdayText> */}
            <Button onPress={saveMeasurements}>Finish</Button>
                
        </Container>

    );
};

export default OnboardingScreen;

//const styles = StyleSheet.create({})

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  });

const Container = styled.View`
    flex: 1;
    background: #FFFFFF;    
`;

 const Main = styled.View`
     margin: 5px 25px 50px 25px;
     background: #808080;
 `;

const Heading = styled.Text`
    width: 209px;
    height: 53px;
    margin: 10px 50px 5px 50px;
    font-size: 24px;
    line-height: 49px;
    font-weight: bold;
    textAlign: center;
    color: #949397;
`;

const Subheading = styled.Text`
    margin: 10px 50px 5px 50px;
    width: 220px;
    height: px;
    font-size: 18px;
    line-height: 28px;
    textAlign: center;
    color: #949397;
`;

/*
const DividerLine = styled.View`
    width: 319px;
    height: 10px;
    color: #808080;
`;
*/

const BirthdayText = styled.Text`
    height: 30px; 
    color: #949397;
    margin: 5px 50px 10px 50px;
`;