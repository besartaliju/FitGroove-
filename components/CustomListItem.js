import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar 
            rounded
            source={{
                uri: "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png"
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>    
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
