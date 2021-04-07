import React, {useState} from 'react'
import { SafeAreaView, useEffect } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Button, Input, Image, SearchBar } from "react-native-elements";
const fetch = require('node-fetch');
import { Divider } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const SearchFoodScreen = ({navigation}) => {

    const [totalcalories, setTotalCalories] = useState('');
    const [totalfat, setTotalFat] = useState('');
    const [totalcarbs, setTotalCarbs] = useState('');
    const [totalprotein, setTotalProtein] = useState('');

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

            console.log(data.hints)
            setFoodName(data.parsed[0].food.label)
            setCalories(foodSearched.ENERC_KCAL)
            setProtein(foodSearched.PROCNT)
            setCarbs(foodSearched.CHOCDF)
            setFat(foodSearched.FAT)
            setImageURI(data.parsed[0].food.image)
            // console.log(data.parsed[0].food.nutrients.PROCNT);
            // setCalories(data.calories)
        })
        .then(() => setIsSearched(true))
        .catch(err => {
            console.error(err);
        });

    }



//     const renderItem = ({item}) => {

//         <View style={styles.foodInfo}>
//             <Text style={styles.foodName} >{item[0].food.label}</Text>
//             {/* <Text style={styles.macros}>Calories: {item.calories}</Text> */}
//         </View>
// }

const [isSearched, setIsSearched] = useState(false);
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <SearchBar 
                        placeholder="Add Food" 
                        type="text"
                        color="white"
                        round
                        value={name}
                        onSubmitEditing={getFoodInfo}
                        onChangeText={(text) => setName(text)}
                        />
                    <View>
                        <Text style={styles.mealTitle}>Search Results</Text>
                        {isSearched ? (
                                foodList.map((item) => {
                                    return (
                                        <TouchableOpacity  onPress={() => navigation.navigate('FoodInfoScreen')}>
                                            <View style={styles.foodBox}>
                                                <Text style={styles.clickFoodName}>{item.food.label}</Text>
                                                <Text style={styles.clickFoodInfo}>{item.food.nutrients.ENERC_KCAL} cals</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            ) : (
                                <ActivityIndicator/>
                            )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SearchFoodScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232224'
    },
    mealTitle: {
        fontSize: 30,
        color: "#4287f5",
        marginLeft: 15,
        marginTop: 15,
        letterSpacing: 3,
        fontWeight: "300",
        marginBottom: 15

    },
    foodName: {
        color: 'white',
        letterSpacing: 2,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 7,
        marginTop: 10
    },
    clickFoodName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#94e8ff"

    },
    clickFoodInfo: {
        fontSize: 20,
        color: "#94e8ff",
        fontWeight: "100"

    },

    foodBox: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        
    }
})