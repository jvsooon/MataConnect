import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Index from '../screens/Tabs/Home/index';
import IndexSub from '../screens/Tabs/Home/indexSub';
import Details from '../screens/Tabs/Home/details';
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
                headerTitle: null,
                headerStyle: {
                    elevation: 0
                }
            }}>
            <Stack.Screen options={({ navigation }) => ({
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
                options={{
                    headerTitle: 'Event Details',
                    headerTitleAlign: 'center'
                }}
                name='Details' component={Details} />
            <Stack.Screen
                options={{
                    headerTitle: 'Notification'
                }} name='Notifications' component={Notifications} />
        </Stack.Navigator>
    )
}
