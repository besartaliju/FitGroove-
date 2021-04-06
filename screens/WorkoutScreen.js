import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Button, Input, Image } from "react-native-elements";

const WorkoutScreen = () => {
    // const [filteredExercises, setFilteredExercises] = useState([]);
    const [exercise, setExercise] = useState('');
    const [exerciseList, setExerciseList] = useState([]);
    const [equipment, setEquipment] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false)

    // Exercise Search
    const [exName, setExName] = useState('');
    const [exCategory, setExCategory] = useState('');
    const [exDescription, setExDescription] = useState('');
    const [exerciseID, setExerciseID] = useState('');
    const [exDetails, setExDetails] = useState({});

    useEffect(() => {
        getExerciseList();
        
    }, [])

    const getExerciseList = async () => {

        try{
            const uri = `https://wger.de/api/v2/exercise/?limit=100&language=2${category}${equipment}`
            // const uri2 = `https://wger.de/api/v2/exercise/?limit=500&language=2`
            console.log(uri)
            
            fetch(uri, {
            "method": "GET",
            "headers": {
                "Authorization": "664964002b4dd882f68eeca9bf8426e6082b14f5"
            }
            })
            .then(response => response.json())
            .then(data => {
                setExerciseList(data.results);
                setIsLoading(false)
                console.log(data.results);
            })
            .catch(err => {
                console.error(err);
            });
        } catch (err) {
            console.error(err);
        }
        
    }

    const getExerciseInfo = async (id) => {
        try {
            const uri = `https://wger.de/api/v2/exerciseinfo/${id}`
            console.log(uri)
            
            fetch(uri, {
            "method": "GET",
            "headers": {
                "Authorization": "664964002b4dd882f68eeca9bf8426e6082b14f5"
            }
            })
            .then(response => response.json())
            .then(data => {
                setExDetails(data);
                console.log(data);
            })
            .then(() => setIsFetched(true))
            .catch(err => {
                console.error(err);
            });
        } catch (err) {
            console.error(err)
        }
    }

    function findExercise() {
        const idx = exerciseList.findIndex((obj => obj.name === exercise));
        const foundExercise = exerciseList[idx];
        if (foundExercise){
            // setExerciseID(foundExercise.id)
            getExerciseInfo(foundExercise.id)
        } else {
            alert('No exercises found with these parameters.')
            }
    }

    function details() {
        console.log(exDetails.name)
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
                    setCategory('')
                } else {
                    setCategory(`&category=${value}`)
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
            <Button onPress={getExerciseList} title="Get Exercise" />
            <Input 
                placeholder="Find Exercise" 
                type="text" 
                value={exercise} 
                onChangeText={(text) => setExercise(text)}
            />
            <Button onPress={findExercise} title="Find" disabled={isLoading? true : false}/>
            <Button onPress={details} title="Details" />
            <View>
                <Text>Name: {isFetched ? exDetails.name : ""}</Text>
                <Text>Category: {isFetched ? exDetails.category.name : ""}</Text>
                <Text>Description: {isFetched ? exDetails.description : ""}</Text>
                <View>
                    <Image 
                        style={styles.tinyLogo}
                        source={isFetched ? (exDetails.images.length ? exDetails.images[0].image : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg") : ""}
                    />
                </View>
                
            </View>
            
            
        </View>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({})
