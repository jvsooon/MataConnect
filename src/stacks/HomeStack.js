import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Index from '../screens/Tabs/Home/index';
import IndexSub from '../screens/Tabs/Home/indexSub';
import Blank from '../screens/Tabs/Home/Blank';
import Notifications from '../screens/Tabs/Home/Notifications';
import MenuIcon from '../assets/menu.svg'
import NotificationIcon from '../assets/bell.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native'
import MCLogo from '../assets/Logo.png'

const Stack = createStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={Index}
            screenOptions={{
                headerTitle: null
            }}>
            <Stack.Screen options={({ navigation }) => ({
                headerStyle: {
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitle: () => (<Image source={MCLogo} style={{ height: hp('7%'), width: hp('7%') }} />)
                ,
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
                name='Blank' component={Blank} />
            <Stack.Screen
                options={{
                    headerTitle: 'Notifications',
                    headerStyle: {
                        elevation: 0
                    }
                }} name='Notifications' component={Notifications} />
        </Stack.Navigator>
    )
}
