import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen Screen</Text>
            <Button
                title="Log Out"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})