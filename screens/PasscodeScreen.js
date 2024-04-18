/*
 * Author:      Martin Rizada
 * filename:    PasswordScreen.js
 * brief:       user will enter the passcode
 * 
 * */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const PasscodeScreen = ({ navigation, route }) => {
    const [passcode, setPasscode] = useState('');
    const [isSettingPasscode, setIsSettingPasscode] = useState(false);

    useEffect(() => {
        checkPasscodeExist();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Clear the passcode input whenever the screen is focused
            setPasscode('');

            
            const mode = route.params?.mode;
            if (mode === 'change') {
                setIsSettingPasscode(true);
            } else {
                checkPasscodeExist();
            }
        }, [])
    ); 

    const checkPasscodeExist = async () => {
        const storedPasscode = await AsyncStorage.getItem('passcode');
        setIsSettingPasscode(!storedPasscode);
    };

    const handleSetPasscode = async () => {
        if (passcode.length < 4) {
            Alert.alert('Error', 'Passcode must be at least 4 digits.');
            return;
        }
        await AsyncStorage.setItem('passcode', passcode);
        setIsSettingPasscode(false);
        navigation.navigate('Home');
        setPasscode('');
    };

    const handleEnterPasscode = async () => {
        const storedPasscode = await AsyncStorage.getItem('passcode');
        if (passcode === storedPasscode) {
            navigation.navigate('Home');
        } else {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            )
           // Alert.alert('Error', 'Incorrect passcode.');
        }
    };

    const handleResetPasscode = async () => {
        Alert.alert(
            "Reset Passcode",
            "Are you sure you want to reset your passcode? You will need to set a new passcode.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    onPress: async () => {
                        await AsyncStorage.removeItem('passcode');
                        setIsSettingPasscode(true);
                        setPasscode('');
                        Alert.alert('Passcode Reset', 'Please set a new passcode.');
                        
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSettingPasscode ? 'Set Your Passcode' : 'Enter Your Passcode'}</Text>
            <TextInput
                style={styles.input}
                value={passcode}
                onChangeText={setPasscode}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={isSettingPasscode ? handleSetPasscode : handleEnterPasscode}
            >
                <Text style={styles.buttonText}>{isSettingPasscode ? 'Set Passcode' : 'Enter'}</Text>
            </TouchableOpacity>
            {!isSettingPasscode && (
                <TouchableOpacity
                    style={[styles.resetButton, { marginTop: 10 }]}
                    onPress={handleResetPasscode}
                >
                    <Text style={styles.resetButtonText}>Reset Passcode</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#222',
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        padding: 10,
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#72819a',
        textAlign: 'center',
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff971d',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginLeft: 8, 
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
    },
    resetButton: {
        
        borderColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginLeft: 8,
    },
    resetButtonText: {
        color: '#ffffff',
        fontWeight: '500',
    }

});

export default PasscodeScreen;
