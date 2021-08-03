import 'react-native-gesture-handler';
import React, { useEffect, useReducer, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/stacks/AuthStack'
import AppDrawer from './src/stacks/DrawerStack'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from './src/contexts/UserContext'
import { initialLoginState, userReducer } from './src/reducers/UserReducer';

export default function App() {
    const [state, dispatch] = useReducer(userReducer, initialLoginState);

    const authContext = useMemo(() => ({
        logIn: async (userToken, fullName, uid) => {
            try {
                await AsyncStorage.setItem('userToken', userToken);
                await AsyncStorage.setItem('userID', uid);
                await AsyncStorage.setItem('userName', fullName);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', token: userToken, userName: fullName, userID: uid });
        },
        logout: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userID');
                await AsyncStorage.removeItem('userName');
                await AsyncStorage.removeItem('events');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: async (userToken, fullName, uid) => {
            try {
                await AsyncStorage.setItem('userToken', userToken);
                await AsyncStorage.setItem('userID', uid);
                await AsyncStorage.setItem('userName', fullName);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'REGISTER', token: userToken, userName: fullName, userID: uid });
        },
        saveEvents: async (data) => {
            try {
                await AsyncStorage.setItem('events', JSON.stringify(data));
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'SAVE_EVENTS', events: data });
        }
    }), []);

    useEffect(() => {
        const checkForToken = async () => {
            let userToken = null, uid = null, userName = null, data = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                uid = await AsyncStorage.getItem('userID');
                userName = await AsyncStorage.getItem('userName');
                data = await AsyncStorage.getItem('events');
                data = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, userID: uid, userName: userName, events: data });
        }
        checkForToken();
    }, [])

    if (state.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <UserContext.Provider value={{ state, authContext, dispatch }}>
            <NavigationContainer>
                {state.userToken == null ? (
                    <AuthStack />
                )
                    :
                    <AppDrawer />
                }
            </NavigationContainer>
        </UserContext.Provider>
    );
}