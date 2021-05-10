import  React, {useState} from 'react';
import {Text, View,SafeAreaView, StatusBar, StyleSheet,FlatList,TouchableHighlight,Image, TextInput} from 'react-native';

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


const NewExercise = () => {
    const LastExercise = "03/30/21";
    const [name, setName] = useState('');
<<<<<<< HEAD
     const renderItem = ({ item }) => (
        <Item title={item.title} sets={item.sets}/>
      );

=======
    const [exercise, setExercise] = useState([]);
    const [numSet, setNumSet] = useState('');
    const renderItem = ({ item }) => (
       <Item title={item.title} sets={item.sets}/>
    );
    const addNewExercise = () => {
        setDATA(prevDATA => [...prevDATA])
    }
>>>>>>> NewChai
    return(
        <View style={styles.container}>
           <View style={{marginTop: "10%"}}>
                <Text style={{paddingHorizontal:20, fontSize:36, color:"white"}}>Create new routine</Text>
           </View>

           <View style={{marginTop: 20,flex:7}}>
              <View style={styles.inputContainer}>
                    <TextInput
                          style={styles.input}
                          type="text"
                          onChangeText={(text) => setName(text)}
                          placeholder="Routine Name"
                          placeholderTextColor="#d7e1ec"
                          color='white'
                    />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                    onPress={()=>console.log("Find Exercise")}
                >
                    <View style={styles.exButtonStyle}>
                        <Text style={styles.TextButtonStyle}>
                            + Exercise
                        </Text>
                    </View>
                </TouchableHighlight>

              </View>
               <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
               />


           </View>
           <View style={{flex:2}}>
                <View style={styles.AddButtonContainer}>
                    <TouchableHighlight
                    onPress={()=>console.log("Create New Exercise")}
                    >
                        <View style={styles.AddButtonStyle}>
                            <Text style={styles.TextButtonStyle}>
                                Create new routine
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.CancelButtonContainer}>
                    <TouchableHighlight
                       onPress={()=>console.log("cancel")}
                    >
                        <View style={styles.CancelButtonStyle}>
                            <Text style={styles.TextButtonStyle}>
                                Cancel
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
    buttonContainer:{
       margin:10,
       alignItems:'center',
       flexDirection:"row"

     },
     AddButtonStyle:{
            borderTopRightRadius:10,
            borderTopLeftRadius:10,
            borderBottomRightRadius:10,
            borderBottomLeftRadius:10,
            backgroundColor: '#2196F3',
            width:390
     },
     exButtonStyle:{
                 borderTopRightRadius:10,
                 borderTopLeftRadius:10,
                 borderBottomRightRadius:10,
                 borderBottomLeftRadius:10,
                 backgroundColor:'#F52416',
                 width:100
     },
     CancelButtonStyle:{
                 borderTopRightRadius:10,
                 borderTopLeftRadius:10,
                 borderBottomRightRadius:10,
                 borderBottomLeftRadius:10,
                 borderColor: '#F52416',
                 borderWidth:1,
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

      }

})
export default NewExercise;