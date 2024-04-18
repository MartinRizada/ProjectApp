import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddPasswordScreen from './screens/AddPasswordScreen';
import PasswordListScreen from './screens/PasswordListScreen';
import PasscodeScreen from './screens/PasscodeScreen';
import PasscodeSettingsScreen from './screens/PasscodeSettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
    const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

    useEffect(() => {
        const initializeAsync = async () => {
     
            await SplashScreen.preventAutoHideAsync();  // Ensure splash screen stays until ready

            const hasPasscode = await AsyncStorage.getItem('passcode');
            if (!hasPasscode) {
                // Handle no passcode setup
            } else {
             
            }

            setTimeout(() => {
                setSplashScreenVisible(false);
                SplashScreen.hideAsync();
            }, 3000);
        };

        initializeAsync();
    }, []);

    if (isSplashScreenVisible) {
        return (
            <View style={styles.splashScreenContainer}>
                <Image
                    source={require('./assets/splash.png')}
                    style={styles.splashScreenImage}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Passcode">
                <Stack.Screen name="Passcode" component={PasscodeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Settings" component={PasscodeSettingsScreen} />
                <Stack.Screen name="Add Account" component={AddPasswordScreen} />
                <Stack.Screen name="Password List" component={PasswordListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    splashScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2c2f33',  
    },
    splashScreenImage: {
        width: '80%',
        height: '80%',
    }
});

export default App;
