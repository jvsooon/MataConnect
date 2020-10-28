import React, { useLayoutEffect, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Button } from 'react-native';
import Home from '../screens/Tabs/Home'
import Maps from '../screens/Tabs/Maps'
import CalendarStack from './CalendarStack'
import HomeStack from './HomeStack'
import firebase from '../../firebase'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CustomTabBar from '../components/CustomTabBar';
import HomeIcon from '../assets/home.svg';

const Tabs = createBottomTabNavigator();

export default function TabStack() {
    const navigation = useNavigation();

    const handleSignOutClick = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.reset({
                    routes: [{ name: 'Preload' }]
                });
            });
    }

    const Profile = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile Screen</Text>
                <Button title='Log Out' onPress={handleSignOutClick} />
            </View>
        );
    }

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
                // headerShown: true
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