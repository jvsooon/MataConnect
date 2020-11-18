import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

export const DrawerContainer = styled.SafeAreaView`
    flex: 1;
`;

export const Logo = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-vertical: 30px;
    align-self: center
`;

export const SearchBox = styled.View`
    background-color: #fff;    
    align-self: center;
    
    width: 90%;
    padding: 8px;
    margin-vertical: 20px;
    border-radius: 20px;
    flex-direction: row;

`;
//     shadow-color: #000;
//     shadow-offset: 2px;
//     shadow-opacity: 0.25;
//     shadow-radius: 3.84px;
//     elevation: 0;

export const InputField = styled.TextInput`
    font-size: 18px;
    margin-left: 10px;
    width: 86%;
`;

export default function CustomDrawer(props) {
    return (
        <DrawerContainer >
            <LinearGradient
                colors={['#A5FAEA', '#6FC8F5']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '104%',
                }} />
            <Logo>LOGO</Logo>
            <SearchBox>
                <AntDesign name="search1" size={24} color='black' />
                <InputField
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                />
            </SearchBox>
            <DrawerItemList {...props} />
        </DrawerContainer>
    )
}
