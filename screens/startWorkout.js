import  React, {useState, useEffect} from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image, TextInput,ScrollView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements';
import CategoryCard from './CategoryCard';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';

/*
@TODO
- create user data
- Add set, reps
- Add rest timer
*/

const startWorkout =()=>{
    const userSavedEx = "Chest";
    const exName = "Bench Press";
    const [minutes, setMinutes] = useState(null);
      const [seconds, setSeconds] = useState(null);
      const [exSet, addSet] = useState(null);
      const [exReps, addReps] = useState(null);
      const [exList, addExercise] = useState([[]]);

      minTextInput = React.createRef();
      secTextInput = React.createRef();

      const startTimer = () => {
        this.clockCall = setInterval(() => {
          decrementTimer();
        }, 1000);
      };
      const stopTimer = () => {
        clearInterval(this.clockCall);
        setSeconds(null);
      };
      const decrementTimer = () => {
        setSeconds((prevState) =>
          prevState === 0 ? clearInterval(this.clockCall) : prevState - 1
        );
      };


      const onChangeTextMin = (text) => {
        let numbers = '0123456789';
        let newText = ' ';
        for (var i = 0; i < text.length; i++) {
          {
            numbers.indexOf(text[i]) > -1
              ? (newText = newText + text[i])
              : setMinutes(null);
          }
        }
        console.log('second is set');
        setMinutes(newText);
      };

      const onChangeTextSec = (text) => {
        let numbers = '0123456789';
        let newText = ' ';
        for (var i = 0; i < text.length; i++) {
          {
            numbers.indexOf(text[i]) > -1
              ? (newText = newText + text[i])
              : setSeconds(null);
          }
        }
        if (newText > 60) {
          setMinutes(Math.floor(newText / 60));
          setSeconds(newText % 60);
        } else {
          setSeconds(newText);
        }
      };
      const resetTimer = () => {
        minTextInput.clear();
        secTextInput.clear();
        setMinutes(null);
        setSeconds(null);
      };

      return (
        <View style={styles.container}>
           <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <Text style = {{color: "white", fontSize: 25}}>Rest Timer</Text>
           </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                onChangeTextSec;
              }}
              maxLength={3}
              value={minutes}
              placeholder="00"
              placeholderTextColor = "white"
              ref={(input) => {
                minTextInput = input;
              }}
            />
            <Text style={{ fontSize: 35, color: 'white' }}> : </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                onChangeTextSec(text);
              }}
              value={seconds}
              placeholder="00"
              placeholderTextColor = "white"
              maxLength={3}
              ref={(input) => {
                secTextInput = input;
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', padding:5, justifyContent:'center'}}>

              <TouchableOpacity style={{padding: 20 }} onPress={startTimer}>
                <Text style={{ fontSize: 25, color: '#2196F3' }}>Start</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={stopTimer}
                style={{ padding: 20 }}>
                <Text style={{ fontSize: 25, color: '#F52416' }}>Stop</Text>
              </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={resetTimer}>
              <Text style={{ fontSize: 25, color: 'white' }}>Reset</Text>
            </TouchableOpacity>
           </View>
           <View style={{paddingHorizontal: 20}}>
            <Text style={{fontSize:25, color: "white"}}> Workout Log </Text>
           </View>
           <View style = {{flex: 1, paddingTop: 30}}>
                <View style={{flex: 7}}>
                     <ScrollView>
                        <View style={{flexDirection: 'row'}}>
                            <View style = {{paddingHorizontal: 20}}>
                                <Text style ={{fontSize: 25, color: "white"}}> Chest Fly </Text>
                            </View>
                           <View style={{paddingHorizontal:100, flexDirection:'row'}}>
                            <TextInput
                                    style={{paddingHorizontal:10, fontSize: 25 }}
                                    onChangeText={(text) => {
                                    addSet(text);
                                 }}
                                value={exSet}
                                placeholder="sets"
                                placeholderTextColor = "white"
                                maxLength={3}
                            />
                            <TextInput
                                    style={{paddingHorizontal:20, fontSize: 25 }}
                                     onChangeText={(text) => {
                                     addReps(text);
                                     }}
                                value={exReps}
                                placeholder="reps"
                                placeholderTextColor = "white"
                                maxLength={3}
                             />
                           </View>
                        </View>
                     </ScrollView>
                </View>

           </View>
           <View style = {{flex:2}}>
                <View style={styles.AddButtonContainer}>
                                <TouchableHighlight
                                onPress={()=>console.log("Workout Saved")}
                                >
                                    <View style={styles.AddButtonStyle}>
                                        <Text style={styles.TextButtonStyle}>
                                            Save Workout
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                 <View style={styles.CancelButtonContainer}>
                                <TouchableHighlight
                                   onPress={()=>console.log("cancel workout")}
                                >
                                    <View style={styles.CancelButtonStyle}>
                                        <Text style={styles.TextButtonStyle}>
                                            Cancel Workout
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
               </View>
        </View>

    );
}
const styles = StyleSheet.create(
{
    container: {
        flex: 1,
        backgroundColor: "#060507",
        paddingTop: StatusBar.currentHeight

    },
    pageHeader: {
        color: "white",
        fontSize: 25
    },
      input: {
        height: 50,
        width: 50,
        fontSize: 45,
        color: 'white',
      },
    AddButtonStyle:{
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
                borderBottomRightRadius:10,
                borderBottomLeftRadius:10,
                backgroundColor: '#2196F3',
                width:390
         },
         CancelButtonStyle:{
                     borderTopRightRadius:10,
                     borderTopLeftRadius:10,
                     borderBottomRightRadius:10,
                     borderBottomLeftRadius:10,
                     borderColor: '#F52416',
                     borderWidth: 1,
                     width:390,
         },
       TextButtonStyle:{
                      padding:10,
                      color: 'white',
                      textAlign:'center',
                      fontSize:18
             },

}


)
export default startWorkout;