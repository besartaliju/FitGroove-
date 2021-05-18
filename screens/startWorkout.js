import  React from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NewCard from './NewCard.js'

const DATA=[
        {
            id: 1,
            title:'Bench Press',
            sets: 3
        },
        {
            id: 2,
            title:'Chest Fly',
            sets:3
        }


    ]

 const Item = ({ title,sets }) => (
      <View style={styles.item}>
        <View style={{flex:1, paddingHorizontal:5}}>
           <Text style={styles.title}>{sets}x</Text>
        </View>
         <View style={{flex:8}}>
            <Text style={styles.title}>{title}</Text>
         </View>

         <View style={{flex:1}}>
            <Image style={{height:20, width:20}}source={require('../assets/right-arrow.png')}/>
         </View>
      </View>


    );
const MyExercise = () => {
    const ExerciseName = "Chest";
    const LastExercise = "03/30/21";
    const navigation = useNavigation();
     const renderItem = ({ item }) => (
        <Item title={item.title} sets={item.sets}/>
      );
const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [exSet, addSet] = useState(null);
  const [exReps, addReps] = useState(null);
  const [exList, addExercise] = useState([[]]);
   useLayoutEffect(() => {
          let date = new Date().toISOString().split('T')[0];

          const unsubscribe = db
              .collection('users')
              .doc(auth.currentUser.uid)
              .collection('Workout')
              .doc(date)
              .onSnapshot((doc) => {
                  setUserFood(doc.data());
                  let meals = doc.data().exList;
                  // let mealsList = meals.forEach(e => setUserMeals([...userMeals, e]))
                  // let array = Array.from(meals).map(([name, value]) => ({name, value}));
                  setUserMeals([meals]);
              })

          return unsubscribe;
      }, [])
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

    return(
        <View style={styles.container}>
           <View style={{marginTop: "10%"}}>
                <Text style={{paddingHorizontal:20, fontSize:36, color:"white"}}>{ExerciseName}</Text>
                <Text style={{paddingHorizontal: 20, marginTop:10, fontSize: 15, color:"#d7e1ec"}}> Last Performed: {LastExercise} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput
                          style={styles.input}
                          onChangeText={(text) => {
                            onChangeTextSec;
                          }}
                          maxLength={3}
                          value={minutes}
                          placeholder="00"
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
                          maxLength={3}
                          ref={(input) => {
                            secTextInput = input;
                          }}
                        />
                      <View
                          style={{
                            paddingHorizontal: 10,
                            justifyContent: 'center'
                          }}>
                          <TouchableOpacity style={{padding: 5}} onPress={startTimer}>
                            <Text style={{ fontSize: 15, color: 'blue' }}>Start</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            paddingHorizontal:5,
                            justifyContent: 'center'
                          }}>
                          <TouchableOpacity
                            onPress={stopTimer}
                            style={{ padding: 5 }}>
                            <Text style={{ fontSize: 15, color: 'red' }}>Stop</Text>
                          </TouchableOpacity>
                        </View>
                        <View style ={{
                            paddingHorizontal: 5,
                            justifyContent: 'center'}}>
                        <TouchableOpacity
                          style={{ padding: 5 }}
                          onPress={resetTimer}>
                          <Text style={{ fontSize: 15, color: 'red' }}>Reset</Text>
                        </TouchableOpacity>
                  </View>
           </View>

           <View style={{marginTop: 20,flex:7}}>
                 <ScrollView>
                     <NewCard cardHeight={50} cardWidth={250} name = "Chest" set="3" reps="11"/>
                     <NewCard cardHeight={50} cardWidth={250} name = "Chest" set="3" reps="11"/>
                     <NewCard cardHeight={50} cardWidth={250} name = "Chest" set="3" reps="11"/>
                     <NewCard cardHeight={50} cardWidth={250} name = "Chest" set="3" reps="11"/>
                  </ScrollView>

           </View>
           <View style={{flex:2}}>

                <View style={styles.CancelButtonContainer}>
                    <TouchableHighlight
                       onPress={()=>console.log("Save workout")}
                    >
                        <View style={styles.CancelButtonStyle}>
                            <Text style={styles.TextButtonStyle}>
                                Save Workout
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
           </View>
        </View>

    );

}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#060507",
        paddingTop: StatusBar.currentHeight
    },
     AddButtonContainer:{
            margin:15,
            alignItems:'center',
     },
     CancelButtonContainer:{

        alignItems:'center',

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
                 width:390
     },
     TextButtonStyle:{
               padding:10,
               color: 'white',
               textAlign:'center',
               fontSize:18
      },
      item: {
          backgroundColor: "#0F2027",
          padding: 12,
          marginVertical:10,
          marginHorizontal: 20,
          flexDirection: "row",
          borderTopRightRadius:25,
          borderTopLeftRadius:25,
          borderBottomRightRadius:25,
          borderBottomLeftRadius:25,

       },
      title: {
        fontSize: 20,
        color:"white"
      },


})
export default MyExercise;