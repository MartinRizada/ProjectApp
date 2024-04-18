/*
 * Author:      Martin Rizada
 * filename:    AddPasswordScreen.js
 * brief:       Will add a username , password and description per account.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';

const AddPasswordScreen = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(route.params?.item?.id || null);

    useEffect(() => {
        if (route.params?.item) {
            const { username, password, description } = route.params.item;
            setUsername(username);
            setPassword(password);
            setDescription(description);
        }
    }, [route.params?.item]);

    //saves the password
    const savePassword = async () => {
        if (!username || !password || !description) {
            Alert.alert('Validation', 'All fields are required!');
            return;
        }
        const newPassword = { id: id ?? Date.now(), username, password, description };
        const storedPasswords = await AsyncStorage.getItem('passwords');
        const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
        const newPasswords = id ? passwords.map(p => p.id === id ? newPassword : p) : [...passwords, newPassword];
        await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
        Alert.alert('Success', 'Account added successfully!');
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    placeholderTextColor="#999"
                />
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor="#999"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    placeholderTextColor="#999"
                />
                <View style={styles.componentMargin}>
                    <PasswordStrengthMeterBar password={password} />
                </View>
                <TouchableOpacity style={styles.button} onPress={savePassword}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#0f1113',
    },
    card: {
        width: '100%',
        maxWidth: 400, 
        padding: 20,
        backgroundColor: '#333', 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 8,
    },
    label: {
        color: '#ced4da',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#222',
        color: 'white',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#ff971d',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginLeft: 8, 
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default AddPasswordScreen;
