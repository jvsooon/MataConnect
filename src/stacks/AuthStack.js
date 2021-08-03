import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();
export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName={Preload}
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                },
                headerShown: false,
            }} >
            <Stack.Screen name='Preload' component={Preload} options={{animationEnabled: false}}/>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
    )
}