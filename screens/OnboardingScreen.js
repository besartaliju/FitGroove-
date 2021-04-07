
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView as Kav} from 'react-native';
import { auth } from "../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from 'react-native-date-picker'

import {View, Text, Button, Image, StyleSheet, TextInput, Input} from 'react-native';
import styled from "styled-components/native";
import {Feather as Icon} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const OnboardingScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date())
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [goalWeight, setGoalWeight] = useState();

    
    

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
                    //onChange={onChange}
            />

            <Text> Height </Text>
            <TextInput 
                onChangeText={setHeight}
                value={height}
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
                onChangeText={setWeight}
                value={weight}
            >  
            
            </TextInput>


            <Text> Goal Weight</Text>
            <TextInput 
                onChangeText={setGoalWeight}
                value={goalWeight}
            >  
            </TextInput>

            {/* <BirthdayText>
                Birthday     
            </BirthdayText> */}
                
        </Container>

    );
};

export default OnboardingScreen;

//const styles = StyleSheet.create({})

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
