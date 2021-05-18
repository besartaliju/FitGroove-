<<<<<<< HEAD
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, StatusBar,ScrollView, TouchableHighlight } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Card from './Card.js'
=======
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Button, Input, Image } from "react-native-elements";

>>>>>>> 908b04349ed6b16670accc944c024f1826ade57d
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

<<<<<<< HEAD
    const navigation = useNavigation();
    const numRoutines = 3;
  return (
    <View style={styles.container}>

            <ScrollView
                scrollEventThrottle={16} showsVerticalScrollIndicator={false}
            >
                  <View style={{flex: 1, backgroundColor: "#060507", marginTop:"10%"}}>
                    <Text style={{fontSize:32, fontWeight: "bold", paddingHorizontal: 20, color:"white"}}>Start Workout</Text>
                    <Text style={{fontSize:25, paddingHorizontal: 20, marginTop:30, color: "white"}}>Quick Start</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            onPress={()=>navigation.navigate("FindExercise")}

                        >
                            <View style={styles.buttonStyle}>
                                <Text style={styles.TextButtonStyle}>
                                    Start New Workout
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:25, paddingHorizontal:20, marginTop: 20, color: "white"}}>Routines ({numRoutines}) </Text>
                        <View style={{paddingHorizontal:20}}>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                onPress={()=>navigation.navigate("NewExercise")}

                                >
                                <View style={styles.RoutineButtonStyle}>
                                    <Text style={styles.TextButtonStyle}>
                                         + Routines
                                    </Text>
                                </View>

                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={()=>navigation.navigate("MyExercise")}
                                >
                                    <View style={{paddingHorizontal:20}}>
                                        <View style={styles.SeeAllButtonStyle}>
                                            <Text style={styles.TextButtonStyle}>
                                                See All
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    <View style={styles.CardStyle}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                           <Card cardHeight={150} cardWidth={250} name = "Chest" duration="10" level="Intermediate"/>
                           <Card cardHeight= {150} cardWidth={250} name = "Bench Press" duration="10" level="Intermediate"/>
                           <Card cardHeight= {150} cardWidth= {250} name = "Bench Press" duration="10" level="Intermediate"/>
                        </ScrollView>
                     </View>
                  </View>

                  <View style={{flex: 1, backgroundColor: "#060507", marginTop:"7%",}}>
                    <Text style={{fontSize:25,paddingHorizontal:20,color:"white" }}> Featured Workout </Text>

                    <View style={styles.CardStyle}>
                         <ScrollView
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                         >
                             <Card cardHeight={150} cardWidth={250} name = "Chest" duration="10" level="Intermediate"/>
                             <Card cardHeight= {150} cardWidth={250} name = "Bench Press" duration="10" level="Intermediate"/>
                             <Card cardHeight= {150} cardWidth= {250} name = "Bench Press" duration="10" level="Intermediate"/>
                         </ScrollView>
                    </View>
                  </View>


            </ScrollView>
    </View>
 )
=======
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
>>>>>>> 908b04349ed6b16670accc944c024f1826ade57d
}

export default WorkoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#060507",
        paddingTop:StatusBar.currentHeight
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    buttonContainer:{
        margin:15,
        alignItems:'center',
        flexDirection:"row"


    },
    buttonStyle:{
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        backgroundColor: '#F52416',
        width:390
    },
    RoutineButtonStyle:{
       borderTopRightRadius:10,
       borderTopLeftRadius:10,
       borderBottomRightRadius:10,
       borderBottomLeftRadius:10,
       backgroundColor: '#F52416',
       width:90
    },
    SeeAllButtonStyle:{
       borderTopRightRadius:10,
       borderTopLeftRadius:10,
       borderBottomRightRadius:10,
       borderBottomLeftRadius:10,
       backgroundColor: '#060507',
       borderWidth:1,
       borderColor:'#F52416',
       width:90
    },
    TextButtonStyle:{
        padding:12,
        color: 'white',
        textAlign:'center'
    },
    CardStyle:{
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:10
    },

})
