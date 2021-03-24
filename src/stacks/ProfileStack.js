import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Index from '../screens/Tabs/Profile/index';
import Bookmarks from '../screens/Tabs/Profile/Bookmarks';
import SavedEvents from '../screens/Tabs/Profile/SavedEvents';
import SavedJobs from '../screens/Tabs/Profile/SavedJobs';
import Notes from '../screens/Tabs/Profile/Notes';
import Settings from '../screens/Tabs/Profile/Settings';
import Interests from '../screens/Tabs/Profile/Interests';
import EnrolledEvents from '../screens/Tabs/Profile/EnrolledEvents';
import CurrentPastEvents from '../screens/Tabs/Profile/CurrentPastEvents';

const Stack = createStackNavigator();
export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName={Index}
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    elevation: 0
            }
        }}>
            <Stack.Screen name='Profile' component={Index} options={{headerShown: false, animationEnabled: false}}/>
            <Stack.Screen name='Bookmarks' component={Bookmarks} />
            <Stack.Screen name='Saved Events' component={SavedEvents} />
            <Stack.Screen name='Saved Jobs' component={SavedJobs} />
            <Stack.Screen name='Notes' component={Notes} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='Interests' component={Interests} />
            <Stack.Screen name='Enrolled Events' component={EnrolledEvents} />
            <Stack.Screen name='Current Past Events' component={CurrentPastEvents} />
        </Stack.Navigator>
    )
}