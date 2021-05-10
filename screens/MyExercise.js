import  React from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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

    return(
        <View style={styles.container}>
           <View style={{marginTop: "10%"}}>
                <Text style={{paddingHorizontal:20, fontSize:36, color:"white"}}>{ExerciseName}</Text>
                <Text style={{paddingHorizontal: 20, marginTop:10, fontSize: 15, color:"#d7e1ec"}}> Last Performed: {LastExercise} </Text>
           </View>

           <View style={{marginTop: 20,flex:7}}>
                 <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                 />

           </View>
           <View style={{flex:2}}>
                <View style={styles.AddButtonContainer}>
                    <TouchableHighlight
                    onPress={()=>navigation.navigate("startWorkout")}
                    >
                        <View style={styles.AddButtonStyle}>
                            <Text style={styles.TextButtonStyle}>
                                Start Workout
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.CancelButtonContainer}>
                    <TouchableHighlight
                       onPress={()=>console.log("cancel workout")}
                    >
                        <View style={styles.CancelButtonStyle}>
                            <Text style={styles.TextButtonStyle}>
                                Cancel Workout
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