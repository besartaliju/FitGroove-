import React, {useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
const fetch = require('node-fetch');

const FoodScreen = () => {

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [foodName, setFoodName] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [foodList, setFoodList] = useState([[]]);

    function getFoodInfo() {
        const uri = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + encodeURIComponent(name)
        fetch(uri, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "85939bd673mshe3b6eabee1426dep1aacf5jsna6416fda0cb1",
            "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
        }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const foodSearched = data.parsed[0].food.nutrients
            setFoodList(data.hints)
            // console.log(data.hints)
            setFoodName(data.parsed[0].food.label)
            setCalories(foodSearched.ENERC_KCAL)
            setProtein(foodSearched.PROCNT)
            setCarbs(foodSearched.CHOCDF)
            setFat(foodSearched.FAT)
            setImageURI(data.parsed[0].food.image)
            // console.log(data.parsed[0].food.nutrients.PROCNT);
            // setCalories(data.calories)
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Search foods" 
                    type="text" 
                    // value={name} 
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <Button onPress={getFoodInfo} title="Get Info" />
            <Text>{foodName}</Text>
            <Text>Calories: {calories}</Text>
            <Text>Protein: {protein}</Text>
            <Text>Carbs: {carbs}</Text>
            <Text>Fat: {fat}</Text>
            <Image
               source={{ uri: imageURI }}
               style={{ width: 200, height: 200 }}
               PlaceholderContent={<ActivityIndicator />}
            />
        </KeyboardAvoidingView>
    )
}

export default FoodScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: 300,
    }
})
