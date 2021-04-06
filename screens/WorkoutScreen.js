import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const WorkoutScreen = () => {
    const [exercises, setExercises] = useState([]);
    const [equipment, setEquipment] = useState('');
    const [muscle, setMuscle] = useState('');

    function getExercise() {
        const uri = `https://wger.de/api/v2/exercise/?limit=100&language=2${muscle}${equipment}`
        console.log(uri)
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
            <RNPickerSelect
                onValueChange={(value) => {
                    if(value==0){
                        setEquipment('')
                    } else {
                        setEquipment(`&equipment=${value}`)
                    }
                }}
                items={[
                    { label: 'Any', value: '0' },
                    { label: 'Barbell', value: '1' },
                    { label: 'Bench', value: '8' },
                    { label: 'Dumbbell', value: '3' },
                    { label: 'Gym Mat', value: '4' },
                    { label: 'Incline bench', value: '9' },
                    { label: 'Kettlebell', value: '10' },
                    { label: 'Bodyweight', value: '7' },
                    { label: 'Pull-up bar', value: '6' },
                    { label: 'Swiss Ball', value: '5' },
                    { label: 'SZ-Bar', value: '2' }
                ]}
            />
            <RNPickerSelect
            onValueChange={(value) => {
                if(value==0){
                    setMuscle('')
                } else {
                    setMuscle(`&muscles=${value}`)
                }
            }}
            items={[
                { label: 'Any', value: '0' },
                { label: 'Abs', value: '10' },
                { label: 'Arms', value: '8' },
                { label: 'Back', value: '12' },
                { label: 'Calves', value: '14' },
                { label: 'Chest', value: '11' },
                { label: 'Legs', value: '9' },
                { label: 'Shoulders', value: '13' }
            ]}
        />
            <Button onPress={getExercise} title="Get Exercise" />
            <Button onPress={see} title="See" />

        </View>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({})
