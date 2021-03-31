import React, { useContext, useState, useEffect } from 'react'
import { ImageBackground, StatusBar, Platform, Alert, ActivityIndicator } from 'react-native'
import firebase from '../../../../firebase'
import { FontAwesome5, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons';
import {
    Container, Header, ProfilePictureWrapper, ProfilePicture, BlankImage, PencilWrapper, ProfileName, IconsBox, IconContainer, IconBG, IconText,
    InfoContainer, InfoTitle, InfoContent, InfoDisplay, InfoText, Footer, InfoBox, EditButton, LogoutButton, ButtonText
} from './styles'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker'
import { UserContext } from '../../../contexts/UserContext'

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

const FooterButton = ({ ButtonType, title, onPress }) => {
    return (
        <ButtonType onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </ButtonType>
    )
}

export default function Profile({ navigation }) {
    const { state, authContext } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFilename, setImageFilename] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [today, setToday] = useState();
    const [past, setPast] = useState();
    const [rsvp, setRsvp] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [events, setEvents] = useState(null);
    const docRef = db.collection("users").doc(state.uid);

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

    const InfoComponent = ({ title, leftLabel, leftNum, rightLabel, rightNum, screenName, data }) => {
        return (
            <InfoBox onPress={() => navigation.navigate(screenName, { data })}>
                <InfoTitle>{title}</InfoTitle>
                <InfoContent>
                    <InfoDisplay>
                        {today >= 0 || rsvp >= 0 ? (
                            <InfoText>{leftNum}</InfoText>
                        ) :
                            <ActivityIndicator />
                        }
                        <InfoText>{leftLabel}</InfoText>
                    </InfoDisplay>
                    <InfoDisplay>
                        {tickets >= 0 || past >= 0 ? (
                            <InfoText>{rightNum}</InfoText>
                        ) :
                            <ActivityIndicator />
                        }
                        <InfoText>{rightLabel}</InfoText>
                    </InfoDisplay>
                </InfoContent>
            </InfoBox>
        )
    }

    const handleSignOutClick = () => {
        firebase.auth().signOut();
        authContext.logout();
    }

    const pickImage = async () => {
        Alert.alert(
            'Pick Image',
            'Choose an image from your library or take a photo to upload to your profile.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Take a Photo', onPress: () => launchCamera() },
                { text: 'Choose from Library', onPress: () => launchLibrary() },
            ],
            { cancelable: false }
        );
    };

    const launchLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (!result.cancelled) {
            setImageUrl(result.uri);
            uploadPhoto(result.uri);
        }
    }

    const launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1]
        });
        if (!result.cancelled) {
            setImageUrl(result.uri);
            uploadPhoto(result.uri);
        }
    }

    const uploadPhoto = async (file) => {
        let filename = file.substring(file.lastIndexOf('/') + 1);
        const response = await fetch(file);
        const blob = await response.blob();
        const imgRef = storageRef.child(filename);

        if (imageFilename != null) {
            const prevImage = storageRef.child(imageFilename)
            prevImage.delete()
                .then(() => {
                    console.log(`${imageFilename} has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }
        try {
            imgRef.put(blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            docRef.get().then((doc) => {
                if (doc.exists) {
                    docRef.update({
                        profileImageFN: filename
                    });
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => { console.log("Error getting document:", error); });
            setImageFilename(filename);
        } catch (error) {
            console.log('Error', error);
        }
    }

    const checkForImageUrl = () => {
        docRef.get().then((doc) => {
            let hasImageUrl = doc.data().profileImageFN;
            if (hasImageUrl != undefined) {
                let imageRef = firebase.storage().ref('/' + hasImageUrl);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        setImageUrl(url);
                    }).catch((e) => console.log('getting downloadURL of image error => ', e));
                setImageFilename(hasImageUrl);
            }
        }).catch((error) => console.log("Error getting document: ", error))
        setIsLoading(false);
    }

    const getEnrolledEventsData = () => {
        docRef.get().then((doc) => {
            let hasEnrolledEvents = doc.data().enrolledEvents;
            if (hasEnrolledEvents != undefined) {
                setRsvp(hasEnrolledEvents.length)
                setTickets(0)
            }
        }).catch((error) => console.log("Error getting document: ", error))
    }

    const getCurrentAndPastEvents = () => {
        let date = new Date;
        var currentDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + (date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate());
        docRef.get().then((doc) => {
            let hasEvents = doc.data().savedEvents;
            if (hasEvents != undefined) {
                var dataList = [];
                const data = hasEvents.map((i, index) => ({
                    title: hasEvents[index].title,
                    date: hasEvents[index].date,
                    imgSrc: hasEvents[index].imgSrc,
                    description: hasEvents[index].description,
                    eventLink: hasEvents[index].eventLink,
                    dtstart: hasEvents[index].dtstart
                }));
                setEvents(data);
                dataList = data.filter(x => x.dtstart.includes(currentDate));
                setToday(dataList.length)
                dataList = data.filter(event => event.dtstart.split(' ')[0] < currentDate);
                setPast(dataList.length)
            }
        })
    }

    useEffect(() => {
        checkForImageUrl();
        getEnrolledEventsData();
        (async () => {
            let cameraRes = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraRes.status !== 'granted')
                alert('Sorry, we need camera permissions to make this work!');
        })();
        docRef
            .onSnapshot((doc) => {
                if (events == null) {
                    getCurrentAndPastEvents();
                    getEnrolledEventsData();
                } else if (doc.data().savedEvents.length != events.length) {
                    getCurrentAndPastEvents();
                    getEnrolledEventsData();
                }
            });
    }, [])

    return (
        <Container >
            {Platform.OS == 'ios' ? <StatusBar barStyle={'dark-content'} /> : <StatusBar />}
            <ImageBackground
                source={require("../../../assets/ProfileBackgroundImg.png")}
                style={{ flex: 1 }}>
                <Header>
                    <PencilWrapper onPress={pickImage}>
                        <MaterialCommunityIcons name="pencil" size={24} color="#2E3862" />
                    </PencilWrapper>
                    <ProfilePictureWrapper>
                        {isLoading == true ? (
                            <ActivityIndicator style={{ marginTop: 80 }} size="large" />
                        ) :
                            (imageUrl == null ? (<BlankImage></BlankImage>)
                                :
                                <ProfilePicture source={{ uri: imageUrl }} />)
                        }
                    </ProfilePictureWrapper>
                    <ProfileName>{state.name}</ProfileName>
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
                    <InfoComponent title={'Enrolled Events'} leftLabel={'RSVP'} leftNum={rsvp} rightLabel={'Tickets'} rightNum={tickets} screenName={"Enrolled Events"} />
                    <InfoComponent title={'Current & Past Events'} leftLabel={'Today'} leftNum={today} rightLabel={'Past'} rightNum={past} screenName={'Current and Past Events'} data={events} />
                </InfoContainer>

                <Footer>
                    <FooterButton ButtonType={EditButton} title={'Edit Profile'} />
                    <FooterButton ButtonType={LogoutButton} title={'Logout'} onPress={handleSignOutClick} />
                </Footer>
            </ImageBackground>
        </Container >
    );
}