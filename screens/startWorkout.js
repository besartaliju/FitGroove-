import  React, {useState, useEffect,useLayoutEffect} from 'react';
import {Text, View, SafeAreaView, StatusBar, TextInput, StyleSheet,FlatList,TouchableHighlight,Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addWorkout} from './workoutAPI';


const StartWorkout = () => {
    const [exName, addName] = useState('');
    const [currentSet, addSet] = useState(0);
    const [currentReps, addReps] = useState(0);
    const [currentWeight, addWeight] = useState(0);
    const [duration, addDuration] = useState(0);
    const [exRating, addRating] = useState(0);

    return(
        <View style = {styles.container}>
           <View style={{flexDirection:'row'}}>
             <TextInput
                style = {styles.input}
                placeholder = "Name"
                value = {exName}
                onChangeText={(text)=> addName(text)}
            />
            <TextInput
                style = {styles.input}
                placeholder = "Set"
                value = {currentSet}
                onChangeText={(text)=> addSet(text)}
            />
            <TextInput
                style = {styles.input}
                placeholder = "reps"
                value = {currentReps}
                onChangeText={(text)=> addReps(text)}
            />
            <TextInput
                style = {styles.input}
                placeholder = "duration(mins)"
                value = {duration}
                onChangeText={(text)=> addDuration(text)}
            />
           <TextInput
                style = {styles.input}
                placeholder = "Rating"
                value = {exRating}
                onChangeText={(text)=> addRating(text)}
            />
            </View>
            <View style = {styles.button}>
            <Button
                title= 'Save'
                onPress={()=>
                    addWorkout({
                        exName: exName,
                        Weight: currentWeight,
                        duration: duration,
                        numReps: currentReps,
                        numSets: currentSet,
                        rating: exRating
                     })
                }
            />
            </View>
        </View>


    );
}

export default StartWorkout;

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight

    },
    input:{
        padding: 20
    },
    button:{
        padding:20
    }
})
