import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput,  View, ActivityIndicator, Alert } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
const fetch = require('node-fetch');
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { auth, db } from '../firebase'
import firebase from 'firebase'


const FoodInfoScreen = ({navigation, route}) => {

    const [totalcalories, setTotalCalories] = useState('');
    const [totalfat, setTotalFat] = useState('');
    const [totalcarbs, setTotalCarbs] = useState('');
    const [totalprotein, setTotalProtein] = useState('');

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [foodList, setFoodList] = useState([[]]);

    const [servings, setServings] = useState(1);

    useEffect(() => {
        setName(route.params.foodName);
        setCalories(route.params.calories * servings);
        setCarbs(route.params.carbs * servings);
        setFat(route.params.fat * servings)
        setProtein(route.params.protein * servings)
    }, [])
    
    function updateMacros(serv) {
        setCalories(route.params.calories * serv);
        setCarbs(route.params.carbs * serv);
        setFat(route.params.fat * serv)
        setProtein(route.params.protein * serv)
    }

    function addToDB() {
        let date = new Date().toISOString().split('T')[0];
        let currValue = firebase.firestore.FieldValue

        db
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('food')
            .doc(date)
            .update({
                calConsumed: currValue.increment(calories),
                carbs: currValue.increment(carbs),
                fat: currValue.increment(fat),
                protein: currValue.increment(protein),
                [`meals.${name}`]: {
                        calories: currValue.increment(calories),
                        carbs: currValue.increment(carbs),
                        fat: currValue.increment(fat),
                        protein: currValue.increment(protein),
                        servings: currValue.increment(servings)
                }
            })
    }

    function buttonAlert(){
        Alert.alert(
          'Meal Added!','Woohooo',
          [
            {text: 'OK', onPress: () => navigation.navigate("Food")},
          ]
        );
      }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.mealTitle} >{name}</Text>
                    {/* <Text style={{fontWidth: "100", marginLeft: 20, color: 'white', fontSize:18, marginBottom:20}}>4 oz.</Text> */}
                    <Divider style={{ backgroundColor: 'red', height: 4}} />
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
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '300', color: "white"}}>
                                {calories}
                            </Text>
                            <Text style={{fontWeight: '600', fontSize: 18, color: "#A9A5D5"}}>
                                Cal
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '300', color: "white"}}>
                                {carbs} g
                            </Text>
                            <Text style={{fontWeight: '600', fontSize: 18, color: "#A9A5D5"}}>
                                Carbs
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '300', color: "white" }}>
                                {fat} g
                            </Text>
                            <Text style={{fontWeight: '600', fontSize: 18, color: "#A9A5D5",}}>
                                Fats
                            </Text>
                        </View>
                        <View style={styles.macroCircles}>
                            <Text style={{paddingBottom: 15, fontSize: 18,  fontWeight: '300', color: "white"}}>
                                {protein} g
                            </Text>
                            <Text style={{fontWeight: '600', fontSize: 18, color: "#A9A5D5"}}>
                                Protein
                            </Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'grey', height: 2}} />
                    <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 25,
                        marginTop: 20,
                        marginLeft: 7,
                    }}
                    >
                        <Text style={styles.customServingOption}>Serving size:</Text>
                        <Text style={styles.ServingDropDown}>100 g</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'grey', height: 2}} />
                    <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 25,
                        marginTop: 20,
                        marginLeft: 7,
                    }}
                    >
                        <Button style={styles.addButton}
                        title="Add Meal"
                        onPress={() => {
                            addToDB();
                            buttonAlert();
                        }}
                        ></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default FoodInfoScreen
// #BABAED,#967BDC,#DCBC7B,#86DC7B

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232224'
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
        color: "white",
        letterSpacing: 3,
        fontWeight: "600",
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 12

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
        backgroundColor: "#424242",
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
        width: 400,
        height: 40,
        borderRadius: 10,
        fontSize: 100,
        alignSelf: 'center',
        
    },
    input: {
        height: 75,
        width: 150
    },
    customServingOption: {
        color: 'white',
        fontSize: 16,
        marginLeft: 15,
        fontWeight: "700"
    },
    ServingDropDown: {
        marginLeft: 220,
        color: 'white',
        fontSize: 16
    },
    ServingInput: {
        width:20,
        color: 'white'
    }
})
