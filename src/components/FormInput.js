import React from 'react'
import styled from 'styled-components/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const InputArea = styled.View`
    height: ${hp('9%')}px;
    flex-direction: column;
    margin-bottom: 1%;  
`;

const InputHeader = styled.Text`
    color: #aaa;
    font-weight: bold;
    align-self: flex-start;
    margin-left: -10px;
`;

const InputContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;

const Input = styled.TextInput`
    margin-horizontal:  -10px;
    margin-right: -30px;
    flex: 1;
    font-size: ${hp('2.3%')}px;
    color: #000;
    border-bottom-width: 2px;
    
`;

export default function FormInput({ inputTitle, IconSvg, iconColor, touched, error, ...props }) {
    const color = !touched ? '#aaa' : error ? 'red' : 'green';
    return (
        <InputArea>
            <InputHeader>{inputTitle}</InputHeader>
            <InputContainer>
                <Input
                    borderColor={color}
                    placeholderTextColor={color}
                    {...props}
                />
                <IconSvg style={{ left: 10 }} width={hp('3%')} height={hp('3%')} fill={iconColor} />
            </InputContainer>
        </InputArea>
    )
}
