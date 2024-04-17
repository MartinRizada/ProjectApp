/*
 * Author:      Martin Rizada
 * filename:    PasswordListScreen.js
 * brief:       The list of all user accounts. Can edit and deleted existing accounts and search bar.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { Alert, View, TextInput, FlatList, Text,TouchableOpacity, StyleSheet,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const PasswordListScreen = ({ navigation }) => {
    const [passwords, setPasswords] = useState([]);
    const [filteredPasswords, setFilteredPasswords] = useState([]);
    const [search, setSearch] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const loadPasswords = async () => {
                const storedPasswords = await AsyncStorage.getItem('passwords');
                if (storedPasswords) {
                    const allPasswords = JSON.parse(storedPasswords).map(item => ({
                        ...item,
                        isVisible: false  // Add a visibility flag to each password
                    }));
                    setPasswords(allPasswords);
                    setFilteredPasswords(allPasswords);
                }
            };
            loadPasswords();
        }, [])
    );

    const searchFilter = (text) => {
        setSearch(text);
        if (!text.trim()) {
            setFilteredPasswords(passwords);
            return;
        }
        const filteredData = passwords.filter(item => item.description.toLowerCase().startsWith(text.toLowerCase()));
        setFilteredPasswords(filteredData);
    };

    const deletePassword = async (id) => {
        const updatedPasswords = passwords.filter(p => p.id !== id);
        await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        setPasswords(updatedPasswords);
        setFilteredPasswords(updatedPasswords);
        Alert.alert('Success', 'Password deleted successfully!');
    };

    const togglePasswordVisibility = (id) => {
        setFilteredPasswords(filteredPasswords.map(item => {
            if (item.id === id) {
                return { ...item, isVisible: !item.isVisible };
            }
            return item;
        }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={search}
                onChangeText={searchFilter}
                placeholder="Search by description"
                placeholderTextColor="#72819a"  
            />
            <FlatList
                data={filteredPasswords}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Username:</Text>
                            <Text style={styles.info}>{item.username}</Text>
                            <Text style={styles.label}>Password:</Text>
                            <Text style={styles.info}>{item.isVisible ? item.password : '*'.repeat(item.password.length)}</Text>
                            <Text style={styles.label}>Description:</Text>
                            <Text style={styles.info}>{item.description}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() => togglePasswordVisibility(item.id)}>
                                <Text style={styles.buttonText}>{item.isVisible ? "Hide" : "Show"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPassword', { item })}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => deletePassword(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0a0939',
    },
    input: {
        height: 40,
        borderColor: '#99bcd8',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#8cacc5',
        color: '#0a0939',
        borderRadius: 20, 
    },
    listItem: {
        padding: 20,
        backgroundColor: '#72819a',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3, 
    },
    infoContainer: {
        marginBottom: 10
    },
    label: {
        fontWeight: 'bold',
        color: '#de9133',
        marginBottom: 2, 
    },
    info: {
        color: '#ffffff',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#99bcd8',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        elevation: 2,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500', 
    }

});

export default PasswordListScreen;
