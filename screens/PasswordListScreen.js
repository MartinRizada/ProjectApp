/*
 * Author:      Martin Rizada
 * filename:    PasswordListScreen.js
 * brief:       The list of all user accounts. Can edit and deleted existing accounts and search bar.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert, TouchableOpacity, Clipboard } from 'react-native';
//import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import EditModal from '../modals/EditModal';

async function loadFonts() {
    await Font.loadAsync({
        AntDesign: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
    });
}

const PasswordListScreen = ({ navigation }) => {
    const [passwords, setPasswords] = useState([]);
    const [filteredPasswords, setFilteredPasswords] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    loadFonts();

    const openEditModal = (item) => {
        setCurrentItem(item);
        setIsModalVisible(true);
    };

    const handleSaveItem = async (editedItem) => {
       
        const updatedList = passwords.map(item =>
            item.id === editedItem.id ? editedItem : item
        );
        setPasswords(updatedList);
        setFilteredPasswords(updatedList); 

       
        try {
            await AsyncStorage.setItem('passwords', JSON.stringify(updatedList));
           
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to save the updated list', error);
           
        }
    };

    // load the updated values after the update
    useFocusEffect(
        React.useCallback(() => {
            const loadPasswords = async () => {
                const storedPasswords = await AsyncStorage.getItem('passwords');
                if (storedPasswords) {
                    const allPasswords = JSON.parse(storedPasswords).map(item => ({
                        ...item,
                        isVisible: false
                    }));
                    setPasswords(allPasswords);
                    setFilteredPasswords(allPasswords);
                }
            };
            loadPasswords();
        }, [])
    );

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
      
        alert('Copied to Clipboard!');
    };

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
                style={styles.searchInput}
                value={search}
                onChangeText={searchFilter}
                placeholder="Search"
                placeholderTextColor="#fff"
            />
            <FlatList
                data={filteredPasswords}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.separator} />
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{item.username}</Text>
                            <TouchableOpacity onPress={() => copyToClipboard(item.username)}>
                                <View style={styles.iconContainer}>
                                    <AntDesign name="copy1" size={20} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{item.isVisible ? item.password : '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}</Text>
                            <TouchableOpacity onPress={() => togglePasswordVisibility(item.id)}>
                                <View style={styles.iconContainer}>
                                    <Feather name={item.isVisible ? "eye" : "eye-off"} size={20} color="white" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => copyToClipboard(item.password)}>
                                <View style={styles.iconContainer}>
                                    <AntDesign name="copy1" size={20} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttons}>
                          
                            <TouchableOpacity style={styles.button} onPress={() => openEditModal(item)}>
                                <AntDesign name="edit" size={20} color="white" />
                            </TouchableOpacity>
                            {
                                currentItem && (
                                    <EditModal
                                        isVisible={isModalVisible}
                                        onClose={() => setIsModalVisible(false)}
                                        item={currentItem}
                                        onSave={handleSaveItem}
                                    />
                                )
                            }

                            <TouchableOpacity style={styles.button} onPress={() => deletePassword(item.id)}>
                                <AntDesign name="delete" size={20} color="white" />
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
        backgroundColor: '#0f1113',
    },
    searchInput: {
        height: 50,
        backgroundColor: '#0f1113',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'white', 
       color: '#fff'
    },
    input: {
        color: 'white',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222', 
        borderRadius: 4,
        marginBottom: 8,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    card: {
        backgroundColor: '#333', 
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        elevation: 1,
    },
    description: {
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 8,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        marginBottom: 8,
    },
    infoContainer: {
        marginBottom: 10,
    },
    label: {
        color: '#ced4da',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    info: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#ff971d', 
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginLeft: 8, 
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
    },
    infoAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    iconContainer: {
        width: 10,
        width: 24,
        height: 24,
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: 8,
    },
    iconsInline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PasswordListScreen;
