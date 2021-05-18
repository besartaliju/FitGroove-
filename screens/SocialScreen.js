import React, {useState, useLayoutEffect} from 'react'
import { DatePickerIOSBase, Keyboard, StyleSheet, Text, View, Button } from 'react-native'
import { Platform} from 'react-native'
import { KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase'
import firebase from 'firebase'
import CustomListItem from '../components/CustomListItem'

const SocialScreen = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            type: "post",
            post: input,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            likes: 0
        })

        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        
        return unsubscribe;
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                styles={styles.container}
                keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <View style={styles.footer}>
                        <TextInput 
                        value={input} 
                        onChangeText={text => setInput(text)}
                        onSubmitEditing={sendMessage}
                        placeholder="Post" 
                        style={styles.textInput}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>                        
                    </View>
                    <Button
                    title="View"
                    onPress={() => console.log(messages)}
                    />
                    <ScrollView>
                        {messages.map(({id, data}) => (
                            <View key={id}>
                                {/* <Avatar /> */}
                                <Text>{data.post}...{data.displayName}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SocialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    }
})
