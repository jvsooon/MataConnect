import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack'
import UserContextProvider from './src/contexts/UserContext';

import useGlobalState from './src/store/useGlobalState'
import Context from './src/store/context'

export default function App() {
  const store = useGlobalState();
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}