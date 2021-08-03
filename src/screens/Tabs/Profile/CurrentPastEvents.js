import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Text, TouchableOpacity, View, LayoutAnimation, Image, StyleSheet, FlatList, Linking, UIManager } from 'react-native'
import CardButton from '../../../components/EventsButton'
import firebase from '../../../../firebase'
import { UserContext } from '../../../contexts/UserContext';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

var db = firebase.firestore();
const listTab = [{ status: "Today" }, { status: "Past" }]

export default function CurrentPastEvents({ route }) {
    const { state } = useContext(UserContext);
    const [events, setEvents] = useState(route.params.data);
    const [currentDate, setCurrentDate] = useState();
    const [status, setStatus] = useState("Today");
    const [filteredEvents, setFilteredEvents] = useState([]);
    var docRef = db.collection("users").doc(state.uid);

    const Card = ({ event }) => {
        const [collapsed, setCollapsed] = useState(false)
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.create(
                        250,
                        LayoutAnimation.Types.easeInEaseOut,
                        LayoutAnimation.Properties.scaleXY
                    ));
                    setCollapsed(!collapsed)
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: event.imgSrc }} style={{ width: 80, height: 80, borderRadius: 10, margin: 10 }} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 16 }}>{event.title.split(':')[0]}</Text>
                        <Text style={{ fontSize: 16 }}>{event.date}</Text>
                    </View>
                </View>
                {collapsed && <View >
                    <Text style={{ margin: 10 }}>{event.description.split('.')[0]}</Text>
                    <View style={styles.cardFooter}>
                        <CardButton title="Unsave" onPress={() => { deleteEvent(event) }} />
                        <CardButton title="Website" onPress={() => { Linking.openURL(event.eventLink) }} />
                    </View>
                </View>
                }
            </TouchableOpacity>
        )
    }

    const Tab = ({ tabName, status, onPress, widthSize }) => {
        return (
            <View style={styles.shadow}>
                <LinearGradient
                    colors={['#A5FAEA', '#6EC8F5']}
                    style={[styles.buttonBG, styles.shadow, { width: widthSize, borderRadius: 10 }]}>
                    <TouchableOpacity style={[styles.button, status == true && styles.buttonTabActive]} onPress={onPress}>
                        <Text style={[styles.label, status == true && styles.labelActive]}>{tabName}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }

    const setStatusFilter = (status) => {
        var dataList = [];
        if (events != undefined) {
            if (status == "Today") {
                dataList = events.filter(x => x.dtstart.includes(currentDate));
            } else if (status == "Past") {
                dataList = events.filter(event => event.dtstart.split(' ')[0] < currentDate);
            }
            setStatus(status);
            dataList.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
            setFilteredEvents(dataList);
        }
    }

    const deleteEvent = (event) => {
        var index = events.findIndex(function (item) {
            return item.date === event.date;
        });
        const eventToRemove = events.splice(index, 1);
        const data = events.filter(x => x != eventToRemove);
        setEvents(data)
        docRef.update({
            savedEvents: data
        });
        setStatusFilter(status)
    }

    const renderItem = ({ item }) => {
        return (
            <Card event={item} />
        )
    }

    useEffect(() => {
        let date = new Date;
        var tempDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + (date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate());
        setCurrentDate(tempDate);
        setStatusFilter('Today');
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }, [currentDate])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <View style={styles.topTabs}>
                    {
                        listTab.map((t, index) => (
                            <Tab key={index} tabName={t.status} status={status === t.status} onPress={() => setStatusFilter(t.status)} widthSize={(wp('100%') / 2) - 50} />
                        ))
                    }
                </View  >
                {filteredEvents.length != 0 ?
                    <FlatList
                        data={filteredEvents}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} /> :
                    <View style={styles.emptyBox} >
                        <Text style={styles.empty}>No Events</Text>
                    </View>
                }
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topTabs: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 25
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
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
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
        shadowRadius: 2.62
    }
})