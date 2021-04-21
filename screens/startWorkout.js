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
    const userSavedEx = "Chest"
    const [count,setCount] = useState(0);

    count setIncrement = () =>{
        setCount(prevCount => prevCount + 1);
    }
    count setDecrement = () => {
        {(count == 0) ? setCount(0) : setCount(prevCount => prevCount - 1)};
    }
    return(
        <View style = {styles.container}>
            <Text style ={styles.pageHeader}> {userSavedEx} </Text>
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



}


)
export default startWorkout;