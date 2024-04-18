/*
 * Author:      Martin Rizada
 * filename:    HomeScreen.js
 * brief:       Home screen of the app that contains button for navigation
 * 
 * */
import React from 'react';
import { Image,View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.logo}
                    resizeMode="contain" 
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Add Account')}
                >
                    <Text style={styles.buttonText}>Add New Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Password List')}
                >
                    <Text style={styles.buttonText}>View Passwords</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={styles.buttonText}>Passcode Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: '55%',
        width: '90%',
        maxWidth: 400, 
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 8,
    },
    logo: {
        height: 200, 
        width: 200, 
        marginVertical: 10,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff971d', 
        width: '100%', 
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10, 
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
    },
});

export default HomeScreen;
