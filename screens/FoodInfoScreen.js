import React, {useState} from 'react'
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button, Input, Image } from "react-native-elements";
const fetch = require('node-fetch');
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import DropdownMenu from 'react-native-dropdown-menu';

const FoodInfoScreen = ({navigation, route}) => {

    const [totalcalories, setTotalCalories] = useState('');
    const [totalfat, setTotalFat] = useState('');
    const [totalcarbs, setTotalCarbs] = useState('');
    const [totalprotein, setTotalProtein] = useState('');

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    
    const [foodName, setFoodName] = useState(route.params.fromSearch ? route.params.foodName : '');
    const [chosenFoods, setChosenFoods] = useState(route.params.chosenFoods)
    console.log("route.params.chosenFoods in food info screen", route.params.chosenFoods)
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [imageURI, setImageURI] = useState('');
    //const [foodList, setFoodList] = useState([[]]);

    //console.log("ROUTE.PARAMS.FOODNAME ", route.params.foodName)
    //console.log(foodName)
    function getFoodInfo() {
        const fromSearch = true;
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
            //console.log("FOOD NAME================== ", foodName)
            setCalories(foodSearched.ENERC_KCAL)
            setProtein(foodSearched.PROCNT)
            setCarbs(foodSearched.CHOCDF)
            setFat(foodSearched.FAT)
            setImageURI(data.parsed[0].food.image)
            // console.log(data.parsed[0].food.nutrients.PROCNT);
            // setCalories(data.calories)
            chosenFoods.push(foodName)
            console.log(chosenFoods)
        })
        .catch(err => {
            console.error(err);
        });
    }
    var data = [["Breakfast", "Lunch", "Dinner", "Snacks/Extra"]];
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.mealTitle} >
                        {route.params.foodName}
                    </Text> 
                    <Text style={{ marginLeft: 20, color: 'white', fontSize:18, marginBottom:20}}>4 oz.</Text>
                    <Divider style={{ backgroundColor: 'skyblue', height: 4,}} />
                    <View
                    style={{
                        flexDirection: "row",
                        height: 75,
                        marginBottom: 50,
                        marginTop: 20,
                        marginLeft: 7,
                    }}
                    >
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '600', color: "white"}}>
                                {route.params.calories}
                            </Text>
                            <Text style={{fontWeight: '400', fontSize: 18, color: "#7591af"}}>
                                Cal
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '600', color: "white"}}>
                                {route.params.carbs}
                            </Text>
                            <Text style={{fontWeight: '400', fontSize: 18, color: "#7591af"}}>
                                Carbs
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '600', color: "white" }}>
                                {route.params.fat}
                            </Text>
                            <Text style={{fontWeight: '400', fontSize: 18, color: "#7591af",}}>
                                Fats
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '600', color: "white"}}>
                                {route.params.protein}
                            </Text>
                            <Text style={{fontWeight: '400', fontSize: 18, color: "#7591af"}}>
                                Protein
                            </Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'gray'}} />
                    <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 25,
                        marginTop: 20,
                        marginLeft: 7,
                    }}
                    >
                        <Text style={styles.customServingOption}>Serving size:</Text>
                        <Text style={styles.ServingDropDown}>4 oz</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'gray'}} />
                    <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        marginLeft: 7,
                    }}
                    >
                        <Text style={styles.customServingOption}>Number of servings:</Text>
                        <Input style={styles.ServingInput} placeholder="1 serving"></Input>
                    </View>
                    <Divider style={{ backgroundColor: 'gray'}} />
                    <View             
                        style={{
                        flexDirection: "row",
                        marginTop: 20,
                        marginLeft: 7,
                    }}>
                        <Text style={styles.customServingOption}>Select category</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginLeft: 7,
                        }}>
                        <View style={{marginBottom: 216, color:"black"}} />
                        <DropdownMenu
                        style={{flex: 1, color:"black"}}
                        bgColor={'black'}
                        tintColor={'#666666'}
                        activityTintColor={'red'}
                        //handler={(selection, row) => this.setState({text: data[selection][row]})}
                        data={data}
                        >
                        </DropdownMenu>
                    </View>
                    <Button
                        title="Add to your meals"
                        onSubmitEditing={getFoodInfo}
                        onPress={() => {
                            chosenFoods.push(foodName)
                            navigation.navigate('Food', {
                                'fromSearch': true,
                                'foodName': foodName, 
                                'chosenFoods': chosenFoods,
                                'calories': 'calories',
                                'carbs': 'carbs',
                                'fat': 'fat',
                                'protein': 'protein',
                                onGoBack: () => {
                                    this.refresh()
                                   }
                                })
                        }}
                        />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default FoodInfoScreen

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
        color: "#00e0ff",
        letterSpacing: 2,
        fontWeight: "300",
        marginTop: 20,
        marginLeft: 15,
        marginBottom: 10,

    },
    macros: {
        color: 'white',
        marginBottom: 7,
        fontSize: 15
    },
    macroCircles: {
        flex: 1, 
        alignItems: 'center', 
        height: 90,
        marginRight: 5,
        paddingBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#0037de",
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

elevation: 7,
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
    },
    customServingOption: {
        color: 'white',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 10,
        fontWeight: "700"
    },
    ServingDropDown: {
        marginLeft: 220,
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
    ServingInput: {
        width:20,
        color: "white"
    }
})
