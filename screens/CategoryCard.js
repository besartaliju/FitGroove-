import  React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

const CategoryCard = (props) => {
    const navigation = useNavigation();
    return(

         <TouchableOpacity
         onPress={()=>navigation.navigate("MyExercise")}
         style={{
         height:40,
         width:null,
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
            <View style={{flexDirection:"row"}}>
              <View style={{paddingHorizontal:2,flex:1}}>
                 <Image source={props.imgSource}
                    style={{marginLeft:12, flex:1,width:20, height:20, resizeMode:'center'}}
                 />

              </View>
              <View style ={{flex:2,margin:5, alignItem:'center'}}>
                  <Text style={{fontSize:16, color:"#d7e1ec",textAlign:"center"}}>{props.name} </Text>
              </View>
            </View>
         </TouchableOpacity>
    );
};


export default CategoryCard;