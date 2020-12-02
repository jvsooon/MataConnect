import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {TouchableOpacity} from 'react-native'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Drawer from './DrawerStack'
import MenuIcon from '../assets/menu.svg'
import NotificationIcon from '../assets/bell.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// https://library.csun.edu/rest-api/events

const Stack = createStackNavigator();
export default function MainStack() {
    return (
        <Stack.Navigator
            // initialRouteName={Preload}
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                }, 
                headerShown: false
            }}
        >
            {/* <Stack.Screen name='Preload' component={Preload} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} /> */}
            <Stack.Screen name='Drawer' component={Drawer} options={{
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0,
                    // fontWeight: 'bold'
                }
            }} />
        </Stack.Navigator>
    )
}
