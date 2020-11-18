import React from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const ListHeader = styled.Text`
    font-weight: bold;
    font-size: ${hp('3.4%')}px;
    margin-vertical: ${hp('1%')}px;
    margin-left: ${wp('4%')}px;
`;

export const Box = styled.View`
    margin-vertical: ${hp('2%')}px;
`;

export const ImageShadow = styled.View`
    width: ${hp('12%')}px;
    height: ${hp('12%')}px; 
    marginRight: ${wp('3%')}px;
    shadow-color: #000;
    shadow-offset: 0;
    shadow-opacity: 0.5;
    shadow-radius: 4px;
    elevation: 6;
`;

export const CustomBackground = styled.ImageBackground`
    flex: 1;

`;