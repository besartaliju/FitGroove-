import  React, {useState, useEffect} from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image, TextInput,ScrollView, Button} from 'react-native';
import CategoryCard from './CategoryCard'

const DATA=[
        {
            id: 1,
            title:'Shoulder Press',
            sets: 3
        },
        {
            id: 2,
            title:'Shoulder Fly',
            sets:3
        },
        {
            id: 3,
            title:'Side Lateral Raise',
            sets:4
        },
        {
            id: 4,
            title:'Low Pulley raise',
            sets:4
        },
        {
            id: 5,
            title:'Alternate Front Raise',
            sets:4
        },
        {
            id: 6,
            title:'Barbell Front Raise',
            sets:4
         },

    ]
const Item = ({ title,sets }) => (
      <View style={styles.item}>
        <View style={{flex:1,paddingHorizontal:5}}>
           <Text style={styles.title}>{sets}x</Text>
        </View>
         <View style={{flex:7}}>
            <Text style={styles.title}>{title}</Text>
         </View>

         <View style={{flex:1}}>
            <Image style={{height:20, width:20}}source={require('../assets/right-arrow.png')}/>
         </View>
      </View>

);


const FindExercise = () => {
    const LastExercise = "03/30/21";
    const [searchName, setName] = useState('');
     const renderItem = ({ item }) => (
        <Item title={item.title} sets={item.sets}/>
      );
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
     const [exDetails, setExDetails] = useState({});

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
                // setExerciseID(foundExercise.id)
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

                    <View style={{padding:10}}>
                        <Button onPress={details} title="Details" />
                    </View>
                    <View>
                        <Text>Name: {isFetched ? exDetails.name : ""}</Text>
                        <Text>Category: {isFetched ? exDetails.category.name : ""}</Text>
                        <Text>Description: {isFetched ? exDetails.description : ""}</Text>
                        <View>
                              <Image
                                  style={styles.tinyLogo}
                                  source={isFetched ? (exDetails.images.length ? exDetails.images[0].image : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg") : ""}
                                />
                        </View>
                    </View>
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
                <View style={{paddingHorizontal:20, marginTop: 30}}>
                    <Text style={{color:'white', fontSize:25}}> Trending </Text>
                </View>

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


})
export default FindExercise;