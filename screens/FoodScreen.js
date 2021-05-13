import React, {useEffect, useState} from 'react'
import { SafeAreaView, FlatList, Alert, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Button, Input, Image, withTheme } from "react-native-elements";
const fetch = require('node-fetch');
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';


const FoodScreen = ({navigation, route}) => {

    const [totalcalories, setTotalCalories] = useState('');
    const [totalfat, setTotalFat] = useState('');
    const [totalcarbs, setTotalCarbs] = useState('');
    const [totalprotein, setTotalProtein] = useState('');

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [foodName, setFoodName] = useState('')
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [chosenFoods, setChosenFoods] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        let foodName = ''
        try {
            if (route.params.fromSearch) {
                //console.log("fromSearch in FoodScreen: ", route.params.fromSearch)
                //console.log("route.params.chosenFoods in FoodScreen", route.params.chosenFoods)
                setChosenFoods(route.params.chosenFoods)
                setFoodName(route.params.foodName)
            } 
        } catch(e) {
            setFoodName('')
        } 
    }, [isFocused])

    console.log(chosenFoods)


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
            <SafeAreaView>
                <ScrollView>
                    <Text style={{color: 'white', paddingLeft: 15, fontSize: 20, paddingTop: 25, fontSize: 28, fontWeight:'100'}}>Your Daily Meal</Text>
                    <View
                    style={{
                        flexDirection: "row",
                        height: 75,
                        backgroundColor: '#3b3b3b',
                        marginTop: 25,
                        marginBottom: 2,
                        borderRadius: 10
                    }}
                    >
                        <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '500', color: "#f2b418"}}>
                                Calories
                            </Text>
                            <Text style={{fontWeight: '900', fontSize: 18, color: "#7591af"}}>
                                2,057
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '500', color: "#f2b418"}}>
                                Fat
                            </Text>
                            <Text style={{fontWeight: '900', fontSize: 18, color: "#7591af"}}>
                                50g
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '500', color: "#f2b418" }}>
                                Carbs
                            </Text>
                            <Text style={{fontWeight: '900', fontSize: 18, color: "#7591af",}}>
                                200g
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', marginTop: 7}}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '500', color: "#f2b418"}}>
                                Protein
                            </Text>
                            <Text style={{fontWeight: '900', fontSize: 18, color: "#7591af"}}>
                                180g
                            </Text>
                        </View>
                    </View>
                    <Button 
                        title="Log a meal for today"
                        style={{alignItems: 'center', justifyContent: 'center', marginleft: 50, width: 400, height: 75}}
                        onPress={() => navigation.navigate("SearchFood", {'chosenFoods': chosenFoods})}
                        />
                    <View style={styles.dailyMeals}>
                        <Text style={styles.mealTitle}>Breakfast</Text>

                        <View style={styles.inputContainer}>
                        <FlatList
                            data={chosenFoods}
                            renderItem={({item})=>(
                                <View style={{justifyContent:'center',marginBottom:10}}>
                                <Text style={{backgroundColor:'blue',color:'white',padding:10}}>
                                {/* {item} */}
                                </Text>
                                </View>
                                )}
                        />
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'grey'}} />
                    <View style={styles.dailyMeals}>
                        <Text style={styles.mealTitle}>Lunch</Text>
                        {/* <View style={styles.inputContainer}>
                            <Input 
                                placeholder="Add Food" 
                                type="text" 
                                color="white"
                                // value={name} 
                                onChangeText={(text) => setName(text)}
                                style={styles.Input}
                            />
                            <Button type="clear" style={styles.addButton} onPress={getFoodInfo} title="+" />
                        </View> */}
                    </View>
                    <Divider style={{ backgroundColor: 'grey'}} />
                    <View style={styles.dailyMeals}>
                        <Text style={styles.mealTitle}>Dinner</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'grey'}} />
                    <View style={styles.dailyMeals}>
                        <Text style={styles.mealTitle}>Snacks/Extra</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
    }

export default FoodScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        marginTop: 25,
        width: 250,
        borderRadius: 10
    },
    dailyMeals: {
        margin: 20
    },
    mealTitle: {
        fontSize: 30,
        color: "#0037de",
        letterSpacing: 3,
        fontWeight: "300",

    },
    macros: {
        color: 'white',
        marginBottom: 7,
        fontSize: 15
    },
    foodName: {
        color: 'white',
        letterSpacing: 2,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 7,
        marginTop: 10
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        fontSize: 100
    },
    input: {
        height: 75,
        width: 150
    }
})