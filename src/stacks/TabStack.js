import React, { useLayoutEffect, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack'
import CalendarStack from './CalendarStack'
import Maps from '../screens/Tabs/Maps'
import Profile from '../screens/Tabs/Profile'
import { useNavigation } from '@react-navigation/native';
import CustomTabBar from '../components/CustomTabBar';

const Tabs = createBottomTabNavigator();

export default function TabStack() {
    const navigation = useNavigation();

    const getTabBarVisibility = (route, navigation) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        console.log(routeName)

        if (routeName === 'Event Details') {
            return false;
        }

        return true;
    }

    useEffect(() => {
        // console.log(navigation.state)
        // navigation.setOptions({ headerShown: true });
    }, [navigation]);

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            tabBar={props => <CustomTabBar {...props} />}
            tabBarOptions={{
                // hideTabBar: true,
                // headerShown: false,
                // tabBarVisible: false,
                style: {
                    // opacity: 0
                    // backgroundColor: 'rgba(52, 52, 52, alpha)'
                    // height: 10
                }
            }}
        // navigationOptions={({ navigation }) => {
        //     const { routeName, routes } = navigation.state;
        //     let params = routes && routes[1] && routes[1].params;
        //     return {
        //         tabBarVisible:
        //             params && params.hideTabBar != null ? !params.hideTabBar : true,
        //         swipeEnabled:
        //             params && params.hideTabBar != null ? !params.hideTabBar : true
        //     };
        // }}
        // screenOptions= {({navigation}) => {
        //     const { routeName, routes } = navigation.state;
        //     let params = routes && routes[1] && routes[1].params;
        //     tabBarVisible: params && params.hideTabBar != null ? !params.hideTabBar : true,
        // }}
        >
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Maps" component={Maps} />
            <Tabs.Screen name="Calendar" component={CalendarStack}
            // options={({ route, navigation }) => ({
            //     tabBarVisible: getTabBarVisibility(route)
            // })}
            />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    );
}

// navigationOptions: ({ navigation }) => {
//     const {params = {}} = navigation.state.routes[navigation.state.index];
//     const tabBarVisible = params.tabBarVisible === false ? params.tabBarVisible : true;
//     return {
//       tabBarVisible,
//     }
//   }

// options={{
//     tabBarIcon: ({ color }) => (
//       <View style={{ flex: 1 }}>
//         <HomeIcon name="box" color={color} size={20} />
//       </View>
//     )
//   }}