import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, StyleSheet, ActivityIndicator, Text, UIManager, Platform, LayoutAnimation, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MenuIcon from '../../assets/menu.svg'
import { UserContext } from '../../contexts/UserContext'
import firebase from '../../../firebase'
import { BuildingDescriptions } from '../../utils'

var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const listTab = [{ status: "A-Z" }, { status: "Open Now" }], inactive = { color: '#000', name: 'bookmark-o' }, active = { color: '#efd358', name: 'bookmark' };
const apiKey = 'AIzaSyAcorPhu3_-YuPRpogeg0lgm63AXlOi8u0';
const baseAPIUrl = 'https://maps.googleapis.com/maps/api/place/';

const Tab = ({ tabName, status, onPress, widthSize }) => {
    return (
        <View style={styles.shadow}>
            <LinearGradient
                colors={['#A5FAEA', '#9087f5']}
                style={[styles.buttonBG, styles.shadow, { width: widthSize, borderRadius: 10 }]}>
                <TouchableOpacity style={[styles.button, status == true && styles.buttonTabActive]} onPress={onPress}>
                    <Text style={[styles.label, status == true && styles.labelActive]}>{tabName}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const CardButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardButtonBG} onPress={onPress}>
            <LinearGradient
                colors={['#A5FAEA', '#9087f5']}
                style={styles.cardButton}>
                <Text style={{ fontWeight: 'bold', fontSize: hp('1.75%'), marginHorizontal: hp('1.75%') }}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const handleBookmarkClick = (iconState, setIconState) => {
    if (iconState.name == inactive.name) {
        iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
        alert("Campus Resource successfully saved to profile.")
    }
}

export default function CampusResources({ navigation }) {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [resources, setResources] = useState([]);
    const [status, setStatus] = useState("A-Z");
    const [filteredResources, setFilteredResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPlaceID = async (placeName) => {
        let id = fetch(`${baseAPIUrl}findplacefromtext/json?input=csun ${placeName}&inputtype=textquery&fields=place_id&key=${apiKey}`)
            .then(res => res.json())
            .then(data => data.candidates[0]?.place_id)
            .catch(err => console.log(err));
        return Promise.resolve(id);
    };

    const getPlaceDetails = async (placeID) => {
        let details = fetch(`${baseAPIUrl}details/json?place_id=${placeID}&fields=name,formatted_phone_number,opening_hours/open_now,opening_hours/weekday_text,formatted_address,geometry/location&key=${apiKey}`)
            .then(res => res.json())
            .then(data => data.result)
            .catch(err => console.log(err));
        return Promise.resolve(details);
    }

    const getCampusResources = () => {
        let data = [];
        BuildingDescriptions.forEach(async (x) => {
            let id = await getPlaceID(x.name);
            let details = await getPlaceDetails(id);
            if (details?.name != undefined) {
                details.placeID = id;
                data.push(details);
            }
        })
        setTimeout(() => {
            data.sort(function (a, b) { return a.name.localeCompare(b.name) })
            setResources(data);
            setFilteredResources(data)
            setIsLoading(false);
        }, 1000);
    }

    const pushResource = (placeID) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    savedBookmarks: arrayUnion(placeID)
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const BookmarkIcon = ({ data }) => {
        const [iconState, setIconState] = useState(inactive);

        return (
            <TouchableOpacity onPress={() => { handleBookmarkClick(iconState, setIconState); pushResource(data); }}>
                <FontAwesome name={iconState.name} size={hp('3.4%')} color={iconState.color} />
            </TouchableOpacity>
        );
    }

    const Card = ({ loc }) => {
        const [collapsed, setCollapsed] = useState(false);
        const openingHours = loc?.opening_hours;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.create(
                        250,
                        LayoutAnimation.Types.easeInEaseOut,
                        LayoutAnimation.Properties.scaleXY
                    ));
                    setCollapsed(!collapsed);
                }}>
                <View style={{ flexDirection: 'column', margin: 20 }}>
                    <Text style={{ fontSize: hp('2.2%'), fontWeight: 'bold' }}>{loc.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                                <MaterialIcons style={{ marginTop: 2, marginRight: 3 }} name="room" size={hp('1.8%')} />
                                <Text style={[styles.cardSubText, { width: '90%' }]}  >{loc.formatted_address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Feather style={{ marginTop: 2, marginRight: 3 }} name="phone-call" size={hp('1.8%')} color="black" />
                                <Text style={styles.cardSubText}>Phone: {loc?.formatted_phone_number != undefined ? loc.formatted_phone_number : 'N/A'}</Text>
                            </View>
                        </View>
                        <BookmarkIcon data={loc.placeID} />
                    </View>
                    {collapsed &&
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.cardSubText}>Status:
                            <Text style={{ color: 'red' }}>{(openingHours?.open_now != undefined) ?
                                    (openingHours?.open_now == true ?
                                        <Text style={{ color: 'green' }}> OPEN</Text>
                                        :
                                        ' CLOSED') : ' N/A'}</Text>
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.cardSubText}>Hours: </Text>
                                <Text style={styles.cardSubText}>
                                    {openingHours != undefined ?
                                        openingHours.weekday_text.map((x, index) => (
                                            <Text key={index}>{`${x}\n`}</Text>
                                        ))
                                        :
                                        'N/A'
                                    }
                                </Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <CardButton title="Open in Google Maps" onPress={() => {
                                    const lat = loc.geometry.location.lat;
                                    const lng = loc.geometry.location.lng;
                                    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                    const latLng = `${lat},${lng}`;
                                    const label = loc.formatted_address;
                                    const url = Platform.select({
                                        ios: `${scheme}${label}@${latLng}`,
                                        android: `${scheme}${latLng}(${label})`
                                    });
                                    Linking.openURL(url);
                                }} />
                            </View>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    const setStatusFilter = (status) => {
        var dataList = [];
        if (resources != undefined) {
            if (status == "A-Z") {
                dataList = resources;
            } else if (status == "Open Now") {
                dataList = resources.filter(loc => loc?.opening_hours != undefined && loc?.opening_hours?.open_now == true);
            }
            setStatus(status);
            dataList.sort(function (a, b) { return a.name.localeCompare(b.name) });
            setFilteredResources(dataList);
        }
    }

    const Header = () => {
        return (
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity style={{ position: 'absolute', top: hp('1%'), zIndex: 1 }} onPress={() => navigation.toggleDrawer()} >
                    <MenuIcon style={{ marginLeft: wp('6%') }} width='30' height='30' />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: hp('2%') }}>Resources</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <Card loc={item} />
        )
    }

    useEffect(() => {
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true)

        getCampusResources();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
                <Header />
                <View style={styles.topTabs}>
                    {
                        listTab.map((t, index) => (
                            <Tab key={index} tabName={t.status} status={status === t.status} onPress={() => setStatusFilter(t.status)} widthSize={(wp('100%') / 2) - 50} />
                        ))
                    }
                </View >
                {isLoading == true ?
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='grey' />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), alignSelf: 'center' }}>Loading</Text>
                    </View>
                    :
                    (filteredResources.length != 0 ?
                        <FlatList
                            data={filteredResources}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()} /> :
                        <View style={styles.emptyBox} >
                            <Text style={styles.empty}>No Bookmarks</Text>
                        </View>
                    )
                }
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topTabs: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 25
    },
    buttonBG: {
        height: 30,
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 7,
    },
    buttonTabActive: {
        backgroundColor: "#ffffff",
    },
    label: {
        fontWeight: "bold",
        color: "#000000"
    },
    labelActive: {
        color: "#0f6de9"
    },
    shadow: {
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
    },
    emptyBox: {
        flex: 1,
        justifyContent: "center"
    },
    empty: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 26
    },
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
    },
    card: {
        marginVertical: 10,
        marginHorizontal: 25,
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62
    },
    cardSubText: {
        fontWeight: Platform.OS === 'ios' ? '600' : '700',
        fontSize: hp('1.75%'),
        marginTop: 1,
        marginBottom: 1
    },
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10
    },
    cardButtonBG: {
        height: hp('3.6%'),
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        marginTop: 10
    },
    cardButton: {
        borderRadius: 10,
        padding: 5
    }
});