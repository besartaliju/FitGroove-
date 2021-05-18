import  React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


const NewCard = (props) => {
    const navigation = useNavigation();
    return(

         <TouchableOpacity
         onPress={()=>navigation.navigate("MyExercise")}
         style={{
         height:props.cardHeight,
         width:props.cardWidth,
         marginLeft:10,
         marginRight:10 ,
         borderTopRightRadius:15,
         borderTopLeftRadius:15,
         borderBottomRightRadius:15,
         borderBottomLeftRadius:15,
         backgroundColor:"#060507",
         borderWidth:3,
         borderColor:"#0F2027"
         }}
         >
              <View style={{margin:15}}>
                 <Text style={{fontSize:20, color:"white"}}>{props.name} </Text>
                 <Text style={{fontSize:15, color: "white"}}>{props.set} </Text>
                 <Text style={{fontSize:15, color: "white"}}>{props.reps} </Text>
              </View>
         </TouchableOpacity>
    );
};


export default NewCard;