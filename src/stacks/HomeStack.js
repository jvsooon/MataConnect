import React, { useLayoutEffect, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Index from '../screens/Tabs/Home/index';
import Blank from '../screens/Tabs/Home/Blank';
import Notifications from '../screens/Tabs/Home/Notifications';
import MenuIcon from '../assets/menu.svg'
import NotificationIcon from '../assets/bell.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Stack = createStackNavigator();
export default function HomeStack({ state }) {

    useLayoutEffect(() => {
        // console.log(state)
    }, [state])

    return (

        <Stack.Navigator initialRouteName={Index} 
            screenOptions={{
                headerTitle: null,
                headerStyle: {
                    // backgroundColor: '#fff',
                    // elevation: 0,
                    // fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen options={({ navigation }) => ({
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0,
                    // fontWeight: 'bold'
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                        <MenuIcon style={{ marginLeft: wp('6%') }} width='30' height='30' />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                        <NotificationIcon style={{ marginRight: wp('6%') }} width='26' height='26' fill='#000' />
                    </TouchableOpacity>
                )
            })} name='Home' component={Index} />
            <Stack.Screen
                options={{
                   
                }} name='Blank' component={Blank} />
            <Stack.Screen
                options={{
                    
                    headerTitle: 'Notifications',
                    headerStyle: {
                        // backgroundColor: 'transparent',
                        elevation: 0
                    }
                }} name='Notifications' component={Notifications} />
        </Stack.Navigator>
    )
}
