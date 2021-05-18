import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView as Kav, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase';
//import DatePicker from 'react-native-date-picker'

import {View, Text, Image, StyleSheet, TextInput, Input} from 'react-native';
import {Button} from 'react-native-elements';
import styled from "styled-components/native";
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
            await AsyncStorage.setItem('first_time', 'true').then(() => {
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
                <Subheading> Let us know about you to speed up the result, get fit fast with great results! </Subheading>
            </Main>

            <Text> Age </Text>
            {/* <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    //mode={mode}
                    is24Hour={true}
                    display="default"
                    onChangeText={(text) => setDate(text)}
            /> */}
            <TextInput 
                style={styles.input}
                value={age}
                onChangeText={(text) => setAge(text)}
            >  
            
            </TextInput>
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
            <Text> Activity Level</Text>
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
            {/* <BirthdayText>
                Birthday     
            </BirthdayText> */}
            <Button onPress={helper}>Finish</Button>
                
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
    height: 1px;
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