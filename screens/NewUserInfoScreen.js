import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from "../firebase";
import DropDownPicker from 'react-native-dropdown-picker';


const NewUserInfoScreen = ({ navigation }) => {
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [weight, setWeight] = useState('');
    const [level, setLevel] = useState('');
    const [goal, setGoal] = useState('');
    const [gender, setGender] =  useState('');


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
            <Text style={styles.title}>A L M O S T   T H E R E</Text>
            <Text style={styles.subtitle}>Tell us more about yourself</Text>
            {/* <DropDownPicker
                items={[
                    {label: 'Female', value: 'female'},
                    {label: 'Male', value: 'male'},
                    {label: 'Other', value: 'other'},
                ]}
                defaultValue="Choose Gender"
                containerStyle={{height: 40}}
                style={{backgroundColor: '#ffa200'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#ffa200'}}
                onChangeItem={(gender) => setGender(text)}
            /> */}
            <View style={styles.inputContainer}>
                <Text style={styles.fillText}>Height</Text>
                    <View style={styles.row}>
                        <View style={styles.inputWrap}>
                            <Input containerStyle={styles.height}
                                autofocus
                                placeholder="Feet" 
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                value={feet} 
                                onChangeText={(text) => setFeet(text)}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <Input containerStyle={styles.height}
                                placeholder="Inches"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                value={inches} 
                                onChangeText={(text) => setInches(text)}
                            />
                        </View>
                    </View>
                <Text style={styles.fillText}>Weight</Text>
                <Input containerStyle={styles.height}
                    placeholder="In pounds"
                    underlineColorAndroid="transparent"
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={weight} 
                    onChangeText={(text) => setWeight(text)}
                />
                <Text style={styles.fillText}>Exercise Level</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="text" 
                    underlineColorAndroid="transparent"
                    value={level} 
                    onChangeText={(text) => setLevel(text)}
                />
                <Text style={styles.fillText}>Fitness Goal</Text>
                <Input containerStyle={styles.fill}
                    underlineColorAndroid="transparent"
                    type="text" 
                    value={goal} 
                    onChangeText={(text) => setGoal(text)}
                    onSubmitEditing={signUp}
                />
            </View>

            <Button type="clear" containerStyle={styles.button} raised onPress={signUp} title="Start Your Journey" />
        </KeyboardAvoidingView>
    )
}

export default NewUserInfoScreen

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
    row: {
        
        flexDirection: "row"
      },
    inputWrap: {
        flex: 1,
        borderColor: "#FFFFFF",
        borderBottomWidth: 1,
        marginBottom: 10
      },
    inputContainer: {
        borderRadius: 10,
        width: 350,
        height: 45,
        marginTop: 40,

    },

    fill: {
        backgroundColor: "#f6f6f6",
        borderRadius: 8,
        height: 40
    },

    height: {
        backgroundColor: "#f6f6f6",
        borderRadius: 8,
        height: 40,
        width: 125,
        textAlign: 'center',
        paddingRight: 10,
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