import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';



const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
        </Stack.Navigator>
    );
    }

export default MainStackNavigator;