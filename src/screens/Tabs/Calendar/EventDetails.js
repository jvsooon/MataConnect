import React from 'react'
import { StyleSheet, Share, TouchableOpacity, Linking } from 'react-native'
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Container, Cover, BoldText, ClickableText, EventTitle, DateText, 
    LocationText, DescriptonText, Footer, ClickableIcon } from './styles'

const onShare = async () => {
    try {
        const result = await Share.share({
            message: 'Check out this event!',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}


export default function EventDetails({ route }) {
    const { name, date, location, description, img, register } = route.params;

    return (
        <Container >
            { img && (
                <Cover source={{ uri: `${img}` }}></Cover>
            )}
            <EventTitle>{name}</EventTitle>
            <DateText>{date}</DateText>
            <LocationText><BoldText>Location: </BoldText>{location}</LocationText>
            { register && (
                <ClickableText onPress={() => Linking.openURL(register)}>
                    <BoldText style={{ color: '#0000ee' }}>Register for this event</BoldText>
                </ClickableText>
            )}
            <DescriptonText>{description}</DescriptonText>
            <Footer>
                <ClickableIcon onPress={() => onShare()}>
                    <FontAwesome5 name="share-alt" size={26} color="black" />
                </ClickableIcon>
                <ClickableIcon onPress={() => console.log('Save event')}>
                    <FontAwesome5 name="bookmark" size={26} color="black" />
                </ClickableIcon>
            </Footer>
        </Container>
    )
}