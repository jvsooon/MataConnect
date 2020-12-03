import React from 'react'
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import MCLogo from '../assets/Logo.png'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const DrawerContainer = styled.SafeAreaView`
    flex: 1;
`;

export const Logo = styled.Image`
    height: ${hp('16%')}px;
    width: ${hp('26%')}px;
    align-self: center;
    margin-top: 30px;
`;

export const SearchBox = styled.View`
    background-color: #fff;    
    align-self: center;
    width: 90%;
    padding: 8px;
    margin-vertical: 20px;
    border-radius: 20px;
    flex-direction: row;
    shadow-color: #000;
    shadow-offset: 1px;
    shadow-opacity: 0.2;
    shadow-radius: 1.41px;
    elevation: 2;
`;

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
            <Logo source={MCLogo} />
            <SearchBox>
                <AntDesign name="search1" size={24} color='black' />
                <InputField
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"/>
            </SearchBox>
            <DrawerItemList {...props} />
        </DrawerContainer>
    )
}
