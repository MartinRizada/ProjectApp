/*
 * Author:      Martin Rizada
 * filename:    HomeScreen.js
 * brief:       Home screen of the app that contains button for navigation
 * 
 * */
import React from 'react';
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Add Password"
                onPress={() => navigation.navigate('Add Account')}
            />
            <Button
                title="View Passwords"
                onPress={() => navigation.navigate('Password List')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;
