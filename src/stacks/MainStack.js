import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Tabs/Home';
import EventDetails from '../screens/Tabs/Calendar/EventDetails';
import Maps from '../screens/Tabs/Maps';
import Drawer from './DrawerStack'
import BottomTab from './TabStack'
// https://library.csun.edu/rest-api/events

const Stack = createStackNavigator();
export default function MainStack() {
    return (
        <Stack.Navigator
            initialRouteName={Preload}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Preload' component={Preload} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Drawer' component={Drawer} />
        </Stack.Navigator>
    )
}
