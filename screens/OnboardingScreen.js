
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView as Kav, Platform} from 'react-native';
import { auth } from "../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from 'react-native-date-picker'

import {View, Text, Button, Image, StyleSheet, TextInput, Input, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from "styled-components/native";
import {Feather as Icon} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const OnboardingScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [goalWeight, setGoalWeight] = useState();

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback 
            onPress={() => Keyboard.dismiss()}>{children}
        </TouchableWithoutFeedback>
    );


    return(
        <Container> 
            <Main>
                <Heading>Personal Details</Heading>
                <Subheading> Let us know about you to speed up the result, get fit fast with great results! </Subheading>
            </Main>

            <View
                    style={{
                        width: 400,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingleft: 25,
                        paddingright: 25,
                        paddingbottom: 5,
                    }}
            />

            <Text style={styles.text}> Birthday </Text>
            <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    //mode={mode}
                    is24Hour={true}
                    display="default"
                    //onChange={onChange}
            />

                <View
                    style={{
                        width: 400,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingleft: 25,
                        paddingright: 25,
                        paddingbottom: 5,
                        paddingtop: 5,
                    }}
                />

                <Text style={styles.text}> Height </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                >  
                </TextInput>

                <View
                    style={{
                        width: 400,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingleft: 25,
                        paddingright: 25,
                        paddingbottom: 5,
                        paddingtop: 5,
                    }}
                />

                <View>
                    <Text style={styles.text}> Weight </Text>
                    <TextInput 
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="lbs"
                    keyboardType="numeric"
                    > 
                     
                    </TextInput>
                </View>   

                <View
                    style={{
                        width: 400,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingleft: 25,
                        paddingright: 25,
                        paddingbottom: 5,
                        paddingtop: 5,
                    }}
                />

            <Text style={styles.text}> Goal Weight</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setGoalWeight}
                value={goalWeight}
                placeholder="lbs"
                keyboardType="numeric"
            >  
            </TextInput>     

            <View
                    style={{
                        width: 400,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingleft: 25,
                        paddingright: 25,
                        paddingbottom: 5,
                        paddingtop: 5,
                    }}
                />
        </Container>

    );
};

export default OnboardingScreen;

//const styles = StyleSheet.create({})

const styles = StyleSheet.create({

    row: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 5
      },

    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#808080'
    },
    input: {
      height: 30,
      width: '66%',
      margin: 15,
      borderWidth: 1,
      backgroundColor: '#FFFFF8',
    },
  });

  //margin: 5px 25px 50px 25px;
  const Container = styled(Platform.OS === 'ios' ? Kav : View).attrs({
    behavior: Platform.OS === 'ios' && 'position',
  })`
    flex: 1;
    background: #060507;
  `;

 const Main = styled.View`
     padding: 5px 25px 50px 25px;
     background: #060507;

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
    height: 100px;
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
    fontSize: 20,
    fontWeight: "bold",
    color: '#808080'
`;

// const Section = styled.View`
//     flex: 1;
//     flexDirection: row,
// `;
