import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Drawer from './DrawerStack'

const Stack = createStackNavigator();
export default function MainStack() {
    return (
        <Stack.Navigator
            initialRouteName={Preload}
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                }, 
                headerShown: false
            }}
        >
            <Stack.Screen name='Preload' component={Preload} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Drawer' component={Drawer} options={{
                headerStyle: {
                    elevation: 0,
                }
            }} />
        </Stack.Navigator>
    )
}