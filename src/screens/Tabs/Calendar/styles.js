import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    padding-horizontal: ${hp('3%')}px;
    padding-vertical: ${hp('2%')}px;
    background-color: #fff;
`;

export const Cover = styled.Image`
    width: ${hp('30%')}px;
    height: ${hp('30%')}px;
    margin-vertical: 2%;
    border-radius: 10px;
    align-self: center;
`;

export const BoldText = styled.Text`
    font-weight: bold;
    font-size: ${hp('2%')}px;
`;

export const ClickableText = styled.TouchableOpacity`
   
`;

export const EventTitle = styled.Text`
    color: #000;
    font-weight: bold;
    font-size: ${hp('3%')}px;
`;

export const DateText = styled.Text`
    font-size: ${hp('2%')}px;
`;

export const LocationText = styled.Text`
    font-size: ${hp('2%')}px;
`;

export const DescriptonText = styled.Text`
    font-size: ${hp('2%')}px;
`;

export const ClickableIcon = styled.TouchableOpacity`
    margin-horizontal: 14px;
    padding: 12px;
    border-radius: 30px;
    background-color: #fff;
    shadow-color: #ddd;
    shadow-offset: 0;
    shadow-opacity: 0.5;
    shadow-radius: 6px;
    elevation: 4;
`;

export const Footer = styled.View`
    flex-direction: row;
    align-self: center;
    margin: 10px;
`;