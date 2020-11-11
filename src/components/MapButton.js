import React, { useState } from 'react'
import {Linking} from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

const Container = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 30px;
    justify-content: space-around;
    align-items: center;
    border-width: 1px;
    margin-vertical: 4px;
    padding-horizontal: 4px;
`;
// shadow-color: #000;
//     shadow-offset: 2px;
//     shadow-opacity: 0.4;
//     shadow-radius: 2px;
//     elevation: 5;
const ButtonText = styled.Text`
    font-size:  12px;
    font-weight: bold;
    margin: 6px;
    
`;

const inactiveColor = '#000';
const activeColor = '#63C2D1';

export default function MapButton({ title, name, link }) {
    const [mycolor, setColor] = useState(inactiveColor);
    const handleSaveClick = (name, mycolor) => {
        if (name == 'star-o' && mycolor == inactiveColor)
            setColor(activeColor)
        else if (mycolor != inactiveColor)
            setColor(inactiveColor)
    }

    return (
        <Container onPress={() => {name != 'star-o' ? Linking.openURL(link) : handleSaveClick(name, mycolor)}}>
            <FontAwesome name={mycolor == inactiveColor ? name : 'star'} size={22} color={mycolor} />
            <ButtonText>{title}</ButtonText>
        </Container>
    )
}
