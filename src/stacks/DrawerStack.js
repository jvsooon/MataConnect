import React from 'react'
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTab from './TabStack'

const Drawer = createDrawerNavigator();

function CampusResources({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Campus Resources Screen</Text>
        </View>
    );
}

function Events({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Events Screen</Text>
        </View>
    );
}

const shouldHeaderBeShown = ({ route }) => {
    if (route.state) {
        return route.state.routes[route.state.index].name == 'Home' ? false : true
    }
}

export default function DrawerStack() {
    return (
        <Drawer.Navigator
            initialRouteName={BottomTab}
            // screenOptions={{
            //     headerShown: true
            // }}
        >
            {/* try to implement this later: options={({ route }) => ({ headerShown: shouldHeaderBeShown(route) })}  */}
            <Drawer.Screen name='Home' component={BottomTab} />
            <Drawer.Screen name='Campus Resources' component={CampusResources} />
            <Drawer.Screen name='Events' component={Events} />
        </Drawer.Navigator>
    )
}
