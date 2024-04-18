/*
 * Author:      Martin Rizada
 * filename:    PasswordSettingsScreen.js
 * brief:       the setting to change the passcode and disable/ enable it.
 * 
 * */
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasscodeSettingsScreen = ({ navigation }) => {
    const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(false);

    useEffect(() => {
        loadInitialSettings();
    }, []);

    const loadInitialSettings = async () => {
        const enabled = await AsyncStorage.getItem('passcodeEnabled');
        setIsPasscodeEnabled(enabled === 'true');
    };

    const handleToggleSwitch = async (value) => {
        setIsPasscodeEnabled(value);
        await AsyncStorage.setItem('passcodeEnabled', value.toString());
        if (value) {
            navigation.navigate('Passcode', { mode: 'set' }); 
        } else {
           
            Alert.alert("Disable Passcode", "Are you sure you want to disable the passcode?",
                [
                    { text: "Cancel", onPress: () => setIsPasscodeEnabled(true), style: "cancel" },
                    {
                        text: "Disable", onPress: async () => {
                            await AsyncStorage.setItem('passcodeEnabled', 'false');
                            await AsyncStorage.removeItem('passcode'); 
                            Alert.alert("Passcode Disabled", "The passcode has been disabled successfully.");
                        }
                    }
                ]);
        }
    };
   

    return (
        <View style={styles.container}>
            <View style={styles.card}>
         
                 <View style={styles.switchContainer}>
                    <Text style={styles.label}>Enable Passcode:</Text>
                        <Switch
                        trackColor={{ false: "#ff971d", true: "#22282c" }} 
                            thumbColor={isPasscodeEnabled ? "#ff971d" : "#2c2f33"} 
                        ios_backgroundColor="#ff971d" 
                            onValueChange={handleToggleSwitch}
                            value={isPasscodeEnabled}
                        />

                </View>
            {isPasscodeEnabled && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Passcode', { mode: 'change' })}
                >
                    <Text style={styles.buttonText}>Change Passcode</Text>
                </TouchableOpacity>
                )}
            </View>
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
    card: {
        height: '25%',
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

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        color: '#ced4da',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#ff971d',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginLeft: 8, 
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
    },
});

export default PasscodeSettingsScreen;
