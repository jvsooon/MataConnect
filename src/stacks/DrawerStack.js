import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTab from './TabStack'
import CustomDrawer from '../components/CustomDrawer'
import CampusResources from '../screens/Drawer/CampusResources'
import Events from '../screens/Drawer/Events'
import Jobs from '../screens/Drawer/Jobs'
import ForMe from '../screens/Drawer/ForMe'
import AboutMe from '../screens/Drawer/AboutMe'
import ContactSupport from '../screens/Drawer/ContactSupport'
import Feedback from '../screens/Drawer/Feedback'
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
export default function DrawerStack() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            drawerContentOptions={{
                labelStyle: { fontWeight: 'bold' }
            }}

            initialRouteName={BottomTab}>
            <Drawer.Screen name='Home' component={BottomTab}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='Campus Resources' component={CampusResources}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="tool" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='Events' component={Events}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="calendar" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='Jobs' component={Jobs}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="link" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='For Me' component={ForMe}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="staro" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='About Me' component={AboutMe}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='Contact Support' component={ContactSupport}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="customerservice" size={size} color={color} />
                    )
                }} />
            <Drawer.Screen name='Feedback' component={Feedback}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <AntDesign name="mail" size={size} color={color} />
                    )
                }} />
        </Drawer.Navigator>
    )
}