import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack'
import CalendarStack from './CalendarStack'
import Maps from '../screens/Tabs/Maps'
import ProfileStack from './ProfileStack'
import CustomTabBar from '../components/CustomTabBar';

const Tabs = createBottomTabNavigator();
export default function TabStack() {
    return (
        <Tabs.Navigator
            initialRouteName="Home"
            tabBar={props => <CustomTabBar {...props} />}>
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Maps" component={Maps} />
            <Tabs.Screen name="Calendar" component={CalendarStack} />
            <Tabs.Screen name="Profile" component={ProfileStack} />
        </Tabs.Navigator>
    );
}