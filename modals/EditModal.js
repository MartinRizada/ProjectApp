/*
 * Author:      Martin Rizada
 * filename:    EditModal.js
 * brief:       Modal for editing the accounts.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditModal = ({ isVisible, onClose, item, onSave }) => {
    const [description, setDescription] = useState(item.description);
    const [username, setUsername] = useState(item.username);
    const [password, setPassword] = useState(item.password);

    const handleSave = () => {
     
        if (!description.trim() || !username.trim() || !password.trim()) {
            alert('All fields are required.');
            return; 
        }

        onSave({
            ...item,
            description: description.trim(),
            username: username.trim(),
            password: password.trim(),
        });

        // Close the modal
        onClose();
    };

    useEffect(() => {

        setDescription(item.description);
        setUsername(item.username);
        setPassword(item.password);
    }, [item, isVisible]);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalLabel}>Description</Text>
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={setDescription}
                        value={description}
                        placeholder="Description"
                        placeholderTextColor="#999"
                        maxLength={30}
                    />
                    <Text style={styles.modalLabel}>Username</Text>
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        maxLength={30}
                    />
                    <Text style={styles.modalLabel}>Password</Text>
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#999"
                        maxLength={30}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#333', 
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
         width: '80%'
    },
    modalInput: {
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
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#FF971D',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        width: '30%'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalLabel: {
        alignSelf: 'flex-start',
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default EditModal;
