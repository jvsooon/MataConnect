import React from 'react'
import styled from 'styled-components/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomButton = styled.TouchableOpacity`
    height: ${hp('6%')}px;
    padding-horizontal:  ${wp('20%')}px;
    color: #fff;
    border-radius: 30px;
    justify-content: center;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.4;
    shadow-radius: 2px;
    elevation: 5;
    margin-bottom: 10px; 
`;

const CustomButtonText = styled.Text`
    font-size:  ${hp('2.6%')}px;
    font-weight: bold;
    color: #fff;
`;

export default function FormButton({ btnTitle, color, onPressHandler }) {
    return (
        <CustomButton style={{ backgroundColor: color }} onPress={onPressHandler}>
            <CustomButtonText>{btnTitle}</CustomButtonText>
        </CustomButton>
    )
}
