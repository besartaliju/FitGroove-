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
    const [count,setCount] = useState(0);
    const [minutes, setMinutes] = useState(null) ;
      const [seconds, setSeconds] = useState(null);
      minTextInput = React.createRef();
      secTextInput = React.createRef();
      const onChangeTextMin=(text)=>{
        let numbers = '0123456789';
        let newText = " ";
        for(var i=0; i < text.length; i++){
          {(numbers.indexOf(text[i]) > -1) ? newText = newText + text[i] : setMinutes(null) }
        }
        {(newText > 60) ? alert("Invalid input") : setMinutes(newText)}
      }
      const onChangeTextSec=(text)=>{
        let numbers = '0123456789';
        let newText = " ";
        for(var i=0; i < text.length; i++){
          {(numbers.indexOf(text[i]) > -1) ? newText = newText + text[i] : setSeconds(null) }
        }
        if(newText > 60) {
          setMinutes(Math.floor(newText/60))
          setSeconds((newText % 60))
        }
      }
      const resetMinSec =()=> {
        setMinutes(null);
        minTextInput.clear();
        setSeconds(null);
        secTextInput.clear();
      }

    count setIncrement = () =>{
        setCount(prevCount => prevCount + 1);
    }
    count setDecrement = () => {
        {(count == 0) ? setCount(0) : setCount(prevCount => prevCount - 1)};
    }

    return(
        <View style = {styles.container}>
            <View>
                <Text style ={styles.pageHeader}> {userSavedEx} </Text>
            </View>
            <Text>Create A Simple Timer </Text>
                  <View style={{flexDirection:"row"}}>
                      <TouchableOpacity>
                        <Text style={{fontSize: 25, color: "blue"}}>Start</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style ={{paddingHorizontal: 20}}>
                        <Text style={{fontSize: 25, color:"red"}}>Stop</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style ={{paddingHorizontal: 20}}
                        onPress={resetMinSec}
                      >
                        <Text style={{fontSize: 25, color:"red"}}>Reset</Text>
                      </TouchableOpacity>
                      {/*<Text style ={{fontSize: 25}}> {minute} : {second} </Text>*/}
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => onChangeTextMin(text)}
                      value={minutes}
                      placeholder="00"
                      maxLength={2}
                      ref ={input => {minTextInput = input}}
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => onChangeTextSec(text)}
                      value={seconds}
                      placeholder="00"
                      maxLength={3}
                      ref = {input => {secTextInput = input}}
                    />


                  </View>
            <View style={{flexDirection:"row", paddingHorizontal: 20}}>
                <View style={{flex: 2}}>
                    <Text style={{fontColor:"white"}}> {exName} </Text>
                </View>
                <View style = {{flex: 3, flexDirection : "row"}}>
                    <TouchableOpacity onPress={()=>{setDecrement}}>
                        <Text style={{fontColor: "white"}}>-</Text>
                    </TouchableOpacity>
                    <Text style ={{fontColor: "white"}}> {count} </Text>
                    <TouchableOpacity onPress={()=>{setIncrement}}>
                        <Text style={fontColor:"white"}>+</Text>
                    </TouchableOpacity>
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
    }
    input: {
        height:45,
        width: 45,
        margin: 12,
        borderWidth: 1,
        padding:10,
        fontSize: 20

      }


}


)
export default startWorkout;