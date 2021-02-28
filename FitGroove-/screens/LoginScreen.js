import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button
                title="Click Here"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})