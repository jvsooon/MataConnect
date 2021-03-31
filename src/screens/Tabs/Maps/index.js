import React, { useState, useEffect, createRef } from 'react'
import {
    View, Dimensions, StatusBar, Platform, ScrollView, Linking, Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'reanimated-bottom-sheet';
import Animate from 'react-native-reanimated';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Header, PanelHandle, Card, CardHeader, CardCover, CardOptions, CardFooter, EventInfo, CardTitle, CardSubTitle, IconBox, IconText } from './styles'
import { CalendarEvents } from '../../../utils'
import { FontAwesome } from '@expo/vector-icons'
import useVisibilityToggler from '../../../hooks/useVisibilityToggler'
import 'intl'
import 'intl/locale-data/jsonp/en'

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = wp('100%') / hp('100%');
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const key = 'AIzaSyAcorPhu3_-YuPRpogeg0lgm63AXlOi8u0';
const inactiveColor = '#000', activeColor = '#63C2D1';
const optionsFull = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };
const optionsDate = { month: "long", day: "numeric", year: "numeric" };

const formatDate = (dtstart) => {
    const fullDate = dtstart.split(' ')
    const dateParts = fullDate[0].split('-')

    if(fullDate.length > 1) {
        const hourParts = fullDate[1].split(':')
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
        return new Intl.DateTimeFormat("en-US", optionsFull).format(date);
    } else {
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        return new Intl.DateTimeFormat("en-US", optionsDate).format(date);
    }
}

export default function Index({ navigation }) {
    const [mapRef, setMapRef] = useState('');
    const [poi, setPoi] = useState(null);
    const [searchPoi, setSearchPoi] = useState(null);
    const [myRegion, setMyRegion] = useState({
        latitude: 34.240153,
        latitudeDelta: LATITUDE_DELTA,
        longitude: -118.529314,
        longitudeDelta: LONGITUDE_DELTA
    });
    const [sheetRef, setSheetRef] = useState(createRef());
    const fall = new Animate.Value(1);
    const [calEvents, setCalEvents] = useState();

    const getEventByDate = () => {
        let today = new Date();
        let currentDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        let tempEvents = CalendarEvents.filter(event => event.dtstart.split(' ')[0] == currentDate);
        const data = Object.keys(tempEvents).map((i) => ({
            eventKey: i,
            title: tempEvents[i].title.split(':')[0],
            date: formatDate(tempEvents[i].dtstart),
            imgSrc: tempEvents[i].imgSrc,
            eventLink: tempEvents[i].eventLink
        }));
        setCalEvents(data);
    }

    useEffect(() => {
        CalendarEvents.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        getEventByDate()
    }, [])

    const [OverlayComponent, toggleOverlayVisibility] = useVisibilityToggler(
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }} >
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details) => {
                    const { lat, lng } = details.geometry.location;
                    setSearchPoi({ coordinate: { latitude: lat, longitude: lng } })
                    animateTo(details.geometry.location);
                    if (poi == null)
                        toggleOverlayVisibility();
                    sheetRef.current.snapTo(0);
                }}
                query={{
                    key: key,
                    language: 'en',
                    components: 'country:us'
                }}
                styles={{
                    textInputContainer: {
                        elevation: 3,
                        height: 44
                    },
                    container: {
                        marginTop: '6%',
                        marginHorizontal: 20,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        backgroundColor: '#0000',
                    }
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                enablePoweredByContainer={false}
                clearButtonMode='while-editing'
                debounce={200}>
            </GooglePlacesAutocomplete>
        </View>
        , true);

    const onRegionChange = (newRegion) => {
        setMyRegion(newRegion);
    }

    const animateTo = (coords) => {
        let lat, lng;
        if (coords.coordinate) {
            lat = coords.coordinate.latitude;
            lng = coords.coordinate.longitude;
        } else {
            lat = coords.lat;
            lng = coords.lng;
        }
        mapRef.animateToRegion({
            latitude: lat,
            latitudeDelta: LATITUDE_DELTA,
            longitude: lng,
            longitudeDelta: LONGITUDE_DELTA
        }, 500)
    }

    const onPoiClick = async (e) => {
        const newpoi = e.nativeEvent;
        if (searchPoi != null) setSearchPoi(null)
        if (poi == null) {
            newpoi.name = newpoi.name.replace(/(\r\n|\n|\r)/gm, " ");
            sheetRef.current.snapTo(0);
            toggleOverlayVisibility();
        }
        setPoi(newpoi);
        animateTo(newpoi);
    }

    const CardIcon = ({ name, size, color, title, onPress }) => {
        return (
            <IconBox onPress={() => onPress()}>
                <FontAwesome name={name} size={size} color={color} />
                {title != null && <IconText>{title}</IconText>}
            </IconBox>
        )
    }

    const SaveButton = ({ name, title }) => {
        const [myColor, setColor] = useState(inactiveColor);

        const handleSaveClick = () => {
            if (myColor == inactiveColor)
                setColor(activeColor)
            else
                setColor(inactiveColor)
        }

        return (
            <CardIcon name={myColor == inactiveColor ? name : 'star'} size={24} color={myColor} title={title} onPress={() => handleSaveClick()} />
        )
    }

    const CardComponent = ({ title, date, imgSrc, eventLink }) => {
        return (
            <Card >
                <CardHeader>
                    <CardCover source={{ uri: imgSrc }} />
                    <CardOptions>
                        <SaveButton name='star-o' title='Save' />
                        <CardIcon name='globe' size={24} color='black' title='Website' onPress={() => Linking.openURL(eventLink)} />
                    </CardOptions>
                </CardHeader>
                <CardFooter>
                    <EventInfo>
                        <CardTitle>{title.split(':')[0]}</CardTitle>
                        <CardSubTitle>{date}</CardSubTitle>
                    </EventInfo>
                    <CardIcon name='arrow-right' size={24} color='black' onPress={() => { navigation.navigate('Events'); sheetRef.current.snapTo(1) }} />
                </CardFooter>
            </Card>
        )
    }

    const EmptyCardComponent = ({ title }) => {
        return (
            <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CardTitle>{title}</CardTitle>
            </Card>
        )
    }

    const renderInner = () => (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={300 + 20}
            snapToAlignment="center"
            decelerationRate='fast'
            // For ios
            contentInset={{
                top: 0,
                left: width * 0.1 - 10,
                bottom: 0,
                right: width * 0.1 - 10
            }}
            // For android
            contentContainerStyle={{
                paddingHorizontal: Platform.OS == 'android' ? width * 0.06 - 20 : 0
            }}>

            {((poi || searchPoi) && calEvents.length > 0) ? calEvents.map(({ title, date, imgSrc, eventLink, eventKey }) => (
                <CardComponent title={title} date={date} imgSrc={imgSrc} eventLink={eventLink} key={eventKey} />
            )) : <EmptyCardComponent title='No Events Today' />}
        </ScrollView>
    );

    const renderHeader = () => (
        <Header>
            <PanelHandle />
        </Header>
    );

    return (
        <View >
            {Platform.OS == 'ios' ? <StatusBar barStyle={'dark-content'} /> : <StatusBar />}

            <MapView
                onPress={toggleOverlayVisibility}
                provider={PROVIDER_GOOGLE}
                style={{ height: '100%' }}
                ref={(map) => { setMapRef(map) }}
                initialRegion={myRegion}
                onRegionChangeComplete={region => onRegionChange(region)}
                onPoiClick={onPoiClick}>
                {poi && (
                    <Marker coordinate={poi.coordinate} image={require('../../../assets/map_marker.png')} />
                )}

                {searchPoi && (
                    <Marker coordinate={searchPoi.coordinate} image={require('../../../assets/map_marker.png')} />
                )}
            </MapView>

            {OverlayComponent}

            <BottomSheet
                ref={sheetRef}
                snapPoints={[250, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledContentGestureInteraction={false}
                onCloseEnd={() => { setPoi(null); setSearchPoi(null); toggleOverlayVisibility(); }} />
        </View>
    );
}