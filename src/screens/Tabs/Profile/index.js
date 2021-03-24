import React, { useContext } from 'react'
import { StyleSheet, ImageBackground, StatusBar, Platform } from 'react-native'
import firebase from '../../../../firebase'
import { FontAwesome5, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons';
import {
    Container, Header, ProfilePicture, ProfileName, IconsBox, IconContainer, IconBG, IconText,
    InfoContainer, InfoTitle, InfoContent, InfoDisplay, InfoText, Footer, InfoBox, EditButton, LogoutButton, ButtonText
} from './styles'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../../../contexts/UserContext';

const InfoComponent = ({ title, leftLabel, leftNum, rightLabel, rightNum }) => {
    return (
        <InfoBox>
            <InfoTitle>{title}</InfoTitle>
            <InfoContent>
                <InfoDisplay>
                    <InfoText>{leftNum}</InfoText>
                    <InfoText>{leftLabel}</InfoText>
                </InfoDisplay>
                <InfoDisplay>
                    <InfoText>{rightNum}</InfoText>
                    <InfoText>{rightLabel}</InfoText>
                </InfoDisplay>
            </InfoContent>
        </InfoBox>
    )
}

const FooterButton = ({ ButtonType, title, onPress }) => {
    return (
        <ButtonType onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </ButtonType>
    )
}

export default function Profile({ navigation }) {
    const { authContext } = useContext(UserContext);

    const IconButton = ({ IconType, iconName, color, iconLabel, screenName }) => {
        return (
            <IconContainer onPress={() => navigation.navigate(screenName)}>
                <IconBG>
                    <IconType name={iconName} size={hp('6%')} color={color} />
                    <IconText>{iconLabel}</IconText>
                </IconBG>
            </IconContainer>
        )
    }

    const handleSignOutClick = () => {
        firebase.auth().signOut();
        authContext.logout();
    }

    return (
        <Container >
            {Platform.OS == 'ios' ? <StatusBar barStyle={'dark-content'} /> : <StatusBar />}
            <ImageBackground
                source={require("../../../assets/ProfileBackgroundImg.png")}
                style={styles.backgroundImg}>

                <Header>
                    <ProfilePicture>
                        <MaterialCommunityIcons style={styles.pencil} name="pencil" size={24} color="#2E3862" />
                    </ProfilePicture>
                    <ProfileName>Jason Sabal</ProfileName>
                </Header>

                <IconsBox>
                    <IconButton IconType={MaterialCommunityIcons} iconName={'bookmark'} color={'#6D8AEB'} iconLabel={'Bookmarks'} screenName={"Bookmarks"} />
                    <IconButton IconType={AntDesign} iconName={'heart'} color={'#ED6F63'} iconLabel={'Saved Events'} screenName={"Saved Events"} />
                    <IconButton IconType={Entypo} iconName={'suitcase'} color={'#636363'} iconLabel={'Saved Jobs'} screenName={"Saved Jobs"} />
                    <IconButton IconType={Foundation} iconName={'clipboard-notes'} color={'#6D8AEB'} iconLabel={'Notes'} screenName={"Notes"} />
                    <IconButton IconType={MaterialIcons} iconName={'settings'} color={'#5A7A84'} iconLabel={'Settings'} screenName={"Settings"} />
                    <IconButton IconType={FontAwesome5} iconName={'award'} color={'#EDB357'} iconLabel={'Interests'} screenName={"Interests"} />
                </IconsBox>

                <InfoContainer>
                    <InfoComponent title={'Enrolled Events'} leftLabel={'RSVP'} leftNum={10} rightLabel={'Tickets'} rightNum={5} />
                    <InfoComponent title={'Current & Past Events'} leftLabel={'Today'} leftNum={2} rightLabel={'Past'} rightNum={18} />
                </InfoContainer>

                <Footer>
                    <FooterButton ButtonType={EditButton} title={'Edit Profile'} />
                    <FooterButton ButtonType={LogoutButton} title={'Logout'} onPress={handleSignOutClick} />
                </Footer>
            </ImageBackground>
        </Container >
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
    },
    pencil: {
        alignSelf: 'flex-end',
        marginRight: Platform.OS == 'ios' ? 30 : 20
    }
});