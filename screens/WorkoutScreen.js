import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, StatusBar,ScrollView, TouchableHighlight } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Card from './Card.js'
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
