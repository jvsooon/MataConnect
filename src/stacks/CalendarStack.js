import React, { useLayoutEffect, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../screens/Tabs/Calendar/index';
import EventDetails from '../screens/Tabs/Calendar/EventDetails';


const Stack = createStackNavigator();
export default function CalendarStack({ state }) {

    useLayoutEffect(() => {
        // console.log(state)
    }, [state])

    return (

        <Stack.Navigator initialRouteName={Index}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Calendar' component={Index} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        
                        elevation: 0
                    }
                }}
                name='Event Details' component={EventDetails} />
        </Stack.Navigator>
    )
}
