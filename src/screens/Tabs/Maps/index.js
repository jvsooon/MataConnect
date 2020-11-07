import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, Text, View, TextInput, Modal, Keyboard, Dimensions,
    Button, AppState, SafeAreaView, Image, StatusBar, Platform, ScrollView, Animated
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker, AnimatedRegion, ProviderPropType } from 'react-native-maps';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Location from 'expo-location'
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBox, LocationIcon, Card, CardTitle, Header, PanelHeader, PanelHandle, CloseButtonBox } from './styles'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'reanimated-bottom-sheet';
import Animate from 'react-native-reanimated';
import useVisibilityToggler from '../../../hooks/useVisibilityToggler'
import { UserContext } from '../../../contexts/UserContext'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { eventsData } from '../../../utils'
import MapButton from '../../../components/MapButton'
const { width, height } = Dimensions.get("window");
let mapAnimation = new Animated.Value(0);


const mapStandardStyle = [
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
];

const ASPECT_RATIO = wp('100%') / hp('100%');
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const key = 'AIzaSyAcorPhu3_-YuPRpogeg0lgm63AXlOi8u0';

const data = Object.keys(eventsData).map((i) => ({
    key: i,
    title: eventsData[i].title,
    date: eventsData[i].date,
    image: eventsData[i].imgUrl,
    eventLink: eventsData[i].eventLink
}));

export default function Index() {
    const { state } = useContext(UserContext);
    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = useState('');
    const [isLocationModalVisible, setModalVisibility] = useState(false);
    const [mapRef, setMapRef] = useState('');
    const [openSetting, setOpenSetting] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const [poi, setPoi] = useState(null);
    const [searchPoi, setSearchPoi] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [myRegion, setMyRegion] = useState({
        latitude: 34.240153,
        latitudeDelta: LATITUDE_DELTA,
        longitude: -118.529314,
        longitudeDelta: LONGITUDE_DELTA
    });
    const bs = React.createRef();
    const fall = new Animate.Value(1);
    const theme = useTheme();

    const ClearButton = () => {
        return (
            <TouchableOpacity style={{}}>
                <Feather name="x-circle" size={28} color="black" />
            </TouchableOpacity>
        )
    }

    const [OverlayComponent, toggleOverlayVisibility] = useVisibilityToggler(
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }} >
            {/* position: absolute, left: 80% or 70% */}
            {/* <SearchBox >
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <MenuIcon style={styles.menuIcon} width='28' height='28' />
                </TouchableOpacity>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#bbb"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0, fontSize: 18, marginLeft: 10 }}
                />

                <Ionicons name="ios-search" size={28} />
            </SearchBox> */}

            {/* <View style={{ marginTop: '6%'}} > */}
            <GooglePlacesAutocomplete
                placeholder='Search'
                // returnKeyType={'search'}
                // autoFocus={false}
                // listViewDisplayed={'auto'}
                fetchDetails={true}
                // renderRightButton={props => <ClearButton {...props}/>}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const { lat, lng } = details.geometry.location;
                    setSearchPoi({ coordinate: { latitude: lat, longitude: lng } })
                    console.log(searchPoi)
                    // getAddressText('')
                }}
                query={{
                    key: key,
                    language: 'en',
                    components: 'country:us'
                }}
                styles={{
                    container: {
                        // width: '100%',
                        marginTop: '6%',
                        marginHorizontal: 20,
                        elevation: 8,   // not working on android, find fix
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        // backgroundColor: '#0000',
                    },
                    listView: {
                        width: '90%',
                    }
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                enablePoweredByContainer={false}
                clearButtonMode='while-editing'
                debounce={200}>
            </GooglePlacesAutocomplete>
            {/* </View> */}

            <LocationIcon >
                <TouchableOpacity onPress={() => getUserLocation()}>
                    <MaterialIcons name="my-location" size={24} color='grey' />
                </TouchableOpacity>
            </LocationIcon>
        </View>
        , true);



    const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            getLocationAsync();
        }
        setAppState(nextAppState);
    }

    const openSettings = () => {
        AppState.addEventListener('change', handleAppStateChange)
        if (Platform.OS == 'ios') {
            Linking.openURL('app-settings:')
        } else {
            IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
            );
        }
        setOpenSetting(false);
    }

    const getLocationAsync = async () => {
        try {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied. Must enable manually in settings.');
                // console.log(errorMsg);
                return;
            }
            // console.log('Location permission granted.')

        } catch (error) {
            // console.log(error)
            let status = Location.getProviderStatusAsync();
            if (!status.locationServicesEnabled) {
                setModalVisibility(true);
            }
        }
    }

    const getUserLocation = async () => {
        // console.log(await Location.hasServicesEnabledAsync() == true? 'enabled': 'disabled')
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        // setLocation(location);
        //console.log(location.coords);
        let region = { latitude: location.coords.latitude + .008, longitude: location.coords.longitude - .004, latitudeDelta: 0.015, longitudeDelta: 0.0121 };
        // let coordinate = new AnimatedRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        // setLatitude(location.coords.latitude);
        // setLongitude(location.coords.longitude);
        // markerRef.animateMarkerToCoordinate(coordinate, 1000);
        mapRef.animateToRegion(region, 1500);
    }

    const onRegionChange = (newRegion) => {
        setMyRegion(newRegion);
    }

    useEffect(() => {
        getLocationAsync();
        // AppState.addEventListener('click', handleHideNav)

        // return () => {
        //     AppState.removeEventListener('click', handleHideNav)
        // };
    }, []);

    const onPoiClick = async (e) => {
        const poi = e.nativeEvent;
        poi.name = poi.name.replace(/(\r\n|\n|\r)/gm, " ");
        setPoi(poi);
        bs.current.snapTo(0);    // Brings up bottom sheet
        // const line = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${poi.placeId}&fields=photo,formatted_phone_number&key=${key}`)
        //     .then(response => response.json());
        // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${line.result.photos[0].photo_reference}&key=${key}`
        // const img = await fetch(photoUrl)
        // console.log(line);
    }

    const renderInner = () => (
        // <Card>
        //     <MaterialIcons style={{ textAlign: 'center', marginTop: -12 }} name="drag-handle" size={hp('4%')} color="#ccc" />
        //     <Image
        //         style={styles.image}
        //         resizeMode='cover'
        //         source={{
        //             // uri: 'https://lh4.googleusercontent.com/-1wzlVdxiW14/USSFZnhNqxI/AAAAAAAABGw/YpdANqaoGh4/s1600-w400/Google%2BSydney'
        //             // uri: 'https://maps.google.com/maps/contrib/104074378150540257660'
        //             uri: 'https://i0.wp.com/cohenwoodworking.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg?resize=300%2C300&ssl=1'
        //         }}
        //     />
        //     <CardTitle>{poi == null ? '' : poi.name}</CardTitle>
        //     <TouchableOpacity
        //         style={{ borderColor: '#ccc', borderWidth: 1.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 76, paddingVertical: 2, borderRadius: 20 }}>
        //         <MaterialIcons name="bookmark-border" size={24} color="#3C8E9A" />
        //         <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Save</Text>
        //     </TouchableOpacity>

        // </Card>
        // <Card>
            <ScrollView
                horizontal
                pagingEnabled
                // scrollEventThrottle={1 }
                showsHorizontalScrollIndicator={false}
                snapToInterval={300 + 20}
                snapToAlignment="center"
                decelerationRate='fast'
                style={styles.scrollView}
                // for ios
                contentInset={{
                    top: 0,
                    left: width * 0.1 - 10,
                    bottom: 0,
                    right: width * 0.1 - 10
                }}
                // for android
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS == 'android' ? width * 0.06 - 20 : 0
                }}>
                {/* <CloseButtonBox>
                    <FontAwesome name='close' size={34} color='#000' />
                </CloseButtonBox> */}
                {poi && data.map(({ title, date, image, key }) => (
                    <View style={styles.card} key={key}>
                        <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
                            <Image
                                source={{ uri: image }}
                                style={styles.cardImage}
                                resizeMode='contain'
                            />
                            <View style={{}}>
                                <MapButton title='Save' name='star-o' />
                                <MapButton title='Website' name='globe' />
                            </View>
                        </View>


                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{title}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>{date}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        // {/* </Card> */}

    );

    const renderHeader = () => (
        <Header>
            {/* <PanelHeader > */}
                <PanelHandle />
            {/* </PanelHeader> */}
        </Header>
    );


    return (
        <View >
            {Platform.OS == 'ios' ? <StatusBar barStyle={'dark-content'} /> : <StatusBar />}

            <MapView
                onPress={toggleOverlayVisibility}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                // customMapStyle={mapStandardStyle}
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

            <Modal visible={isLocationModalVisible} transparent={true} onModalHide={openSetting ? openSettings() : undefined} >
                <View style={styles.modal}>
                    <Button onPress={() => { setModalVisibility(false), setOpenSetting(true) }} title='Enable Location Services' />
                    <Button onPress={() => { setModalVisibility(false) }} title='No thanks' />
                </View>
            </Modal>

            <BottomSheet
                ref={bs}
                snapPoints={[250, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledContentGestureInteraction={false}
                onCloseEnd={() => { setPoi(null); setSearchPoi(null) }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%'
    },
    scrollView: {
        // position: "absolute",
        // bottom: 10,
        // left: 0,
        // right: 0,
        // paddingBottom: 10,
        // marginBottom: 10
    },
    card: {
        padding: Platform.OS == 'ios' ? 20 : 10,
        elevation: 3,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        height: 200,
        width: 300,
        // overflow: "hidden",
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        // alignSelf: "center",
        borderRadius: 10
    },
    textContent: {
        flex: 1,
        paddingTop: 10,
    },
    cardtitle: {
        fontSize: 16,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 15,
        color: "#444",
    },
    menuIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 2,
    },
    modal: {
        flex: 1,
        marginHorizontal: '10%',
        marginVertical: '70%',
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        // width: 150,
        marginTop: 80
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: "50%",
        height: "50%",
        borderRadius: 10,
        alignSelf: 'center'
    },
    panel: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: -200,
        // top: '30%',
        // padding: 0,
        backgroundColor: '#fff',
        paddingTop: 20,
        height: '100%',
        marginHorizontal: 10,
        borderRadius: 10
    }
});

{/* <Marker
                    ref={(marker) => { setMarkerRef(marker) }}
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    image={require('../../assets/map_marker.png')}
                    title="Test Title"
                    description="This is the test description"
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>Oviatt Library</Text>
                                <Text>Looking for books? Go here</Text>
                                <Image
                                        style={styles.image}
                                        source={require('../../assets/banners/food-banner1.jpg')}
                                    /> 
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker> */}