/*
 * Author:      Martin Rizada
 * filename:    App.js
 * brief:       handles the naivgation
 * 
 * */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddPasswordScreen from './screens/AddPasswordScreen';
import PasswordListScreen from './screens/PasswordListScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add Account" component={AddPasswordScreen} />
                <Stack.Screen name="Password List" component={PasswordListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
