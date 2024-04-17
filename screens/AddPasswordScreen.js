/*
 * Author:      Martin Rizada
 * filename:    AddPasswordScreen.js
 * brief:       Will add a username , password and description per account.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.container}>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
            <Button title="Save Password" onPress={savePassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});

export default AddPasswordScreen;
