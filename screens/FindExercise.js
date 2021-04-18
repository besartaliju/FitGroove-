import  React, {useState, useEffect} from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image, TextInput,ScrollView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements';
import CategoryCard from './CategoryCard';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';


const Item = ({title}) => (
        <TouchableOpacity style={{marginTop: 20}}>
            <Text style ={{color:"white", padding:10}}> {title} </Text>
        </TouchableOpacity>
     );

const FindExercise = () => {
    const LastExercise = "03/30/21";
    const [searchName, setName] = useState('');

     const [exercise, setExercise] = useState('');
     const [exerciseList, setExerciseList] = useState([]);
     const [equipment, setEquipment] = useState('');
     const [category, setCategory] = useState('');
     const [isLoading, setIsLoading] = useState(true);
     const [isFetched, setIsFetched] = useState(false);

     const [exName, setExName] = useState('');
     const [exCategory, setExCategory] = useState('');
     const [exDescription, setExDescription] = useState('');
     const [exerciseID, setExerciseID] = useState('');
     const [exDetails, setExDetails] = useState([[]]);

     const [isSearched, setIsSearched] = useState(false);
     const ItemView = (item, key) => {
        return(
            <View key={key}>
                <Text style={{color:"white"}}> name: {item.name} </Text>
            </View>
        );
     };
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
                .then(()=> setIsSearched(true))
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
                setExerciseID(foundExercise.id)
                getExerciseInfo(foundExercise.id)
            } else {
                alert('No exercises found with these parameters.')
                }
        }

        function details() {
            console.log(exDetails.name)
      }
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{marginTop: "10%", paddingBottom:10}}>
                    <Text style={{paddingHorizontal:20, fontSize:25, color:"white"}}>Find Exercise</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        type="text"
                        onChangeText={(text) => setExercise(text)}
                        placeholder="Search Cardio, Boxing, Weight and etc..."
                        placeholderTextColor="#d7e1ec"
                        color='white'
                        onSubmitEditing={findExercise}
                    />

                </View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{flexDirection:"row", paddingTop:10}}>
                        <CategoryCard imgSource={require("../assets/dumbell.png")} name="Weight Training"/>
                        <CategoryCard imgSource={require("../assets/lotus.png")} name="Yoga"/>
                        <CategoryCard imgSource={require("../assets/exercise.png")} name="Cardio"/>
                        <CategoryCard imgSource={require("../assets/boxing.png")} name="Boxing"/>
                        <CategoryCard imgSource={require("../assets/cycling.png")} name="Cycling"/>
                    </View>
                </ScrollView>

              {isSearched ?
                (<View style={styles.showResult}>
                    <TouchableOpacity>
                        <View style={{flexDirection:"row"}}>
                            <View styles={{flex: 1}}>
                                 <Image
                                    style = {styles.cardIcon}
                                    source={{uri: exDetails.images[0].image}}
                                 />
                            </View>
                            <View styles={{flex: 4}}>

                                 <Text style={styles.textResult}> {exDetails.name} </Text>
                                 <Text style={styles.textResult}> {exDetails.category.name} </Text>

                            </View>
                         </View>
                    </TouchableOpacity>
                </View>) : (<Text style={{color:"white"}}> add something here </Text>)
              }
        </ScrollView>


        </View>

    );

}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#060507",
        paddingTop: StatusBar.currentHeight
    },
    cardIcon:{
        height: 70 ,
        width: 70,

        backgroundColor: "white",
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
    },
    showResult:{
        marginTop: 30,
        paddingHorizontal: 20
    },
    textResult:{
        color: "white",
        fontSize: 15,
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        margin: 5,
        paddingHorizontal:10
    },
    inputContainer:{
        borderColor:"#2C5364",
        borderWidth:2,
        margin:10,
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
      },
    expandableCard:{
        padding:10,
        backgroundColor: "grey"
    }

})
export default FindExercise;