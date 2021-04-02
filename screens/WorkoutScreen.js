import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const WorkoutScreen = () => {
    const [exercises, setExercises] = useState([]);

    function getExercise() {
        const uri = "https://wger.de/api/v2/exercise/?limit=20&language=2"
        fetch(uri, {
        "method": "GET",
        "headers": {
            "Authorization": "664964002b4dd882f68eeca9bf8426e6082b14f5"
        },
        // "body": {
        //     "language": "2"
        // }
        })
        .then(response => response.json())
        .then(data => {
            setExercises(data.results)
            console.log(data.results);
        })
        .catch(err => {
            console.error(err);
        });
    }

    function see() {
        console.log(exercises)
    }

    return (
        <View>
            <Text>Workout Screen</Text>
            <Button onPress={getExercise} title="Get Exercise" />
            <Button onPress={see} title="See" />
        </View>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({})
