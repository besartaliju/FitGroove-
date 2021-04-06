import  React, {useState} from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image, TextInput,ScrollView} from 'react-native';
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
                          onChangeText={(text) => setName(text)}
                          placeholder="Search Cardio, Boxing, Weight and etc..."
                          placeholderTextColor="#d7e1ec"
                          color='white'
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
                <View style={{paddingHorizontal:20, marginTop: 30}}>
                    <Text style={{color:'white', fontSize:25}}> Trending </Text>

                </View>
<View>
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