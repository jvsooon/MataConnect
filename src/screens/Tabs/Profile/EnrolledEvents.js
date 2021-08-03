import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Text, TouchableOpacity, View, LayoutAnimation, Image, StyleSheet, FlatList, Linking } from 'react-native'
import CardButton from '../../../components/EventsButton'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../../contexts/UserContext'
import firebase from '../../../../firebase'

const db = firebase.firestore();
const listTab = [{ status: "RSVP" }, { status: "Tickets" }]

export default function EnrolledEvents() {
    const { state } = useContext(UserContext);
    const [enrolledEvents, setEnrolledEvents] = useState();
    const [tickets, setTickets] = useState([]);
    const [status, setStatus] = useState("RSVP");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const docRef = db.collection("users").doc(state.uid);

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
                        <CardButton title="View Event" onPress={() => { Linking.openURL(event.eventLink) }} />
                        {status == 'Tickets' && <CardButton title="Ticket" onPress={() => {  }} />}
                    </View>
                </View>
                }
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item, key }) => {
        return (
            <Card key={key}event={item} />
        )
    }

    const setStatusFilter = (status) => {
        var dataList = [];
        if (enrolledEvents != null) {
            if (status == "RSVP") {
                dataList = enrolledEvents;
            } else if (status == "Tickets") {
            }
            setStatus(status);
            dataList.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
            setFilteredEvents(dataList);
        }
    }

    const getEnrolledEvents = () => {
        docRef.get().then((doc) => {
            let hasEnrolledEvents = doc.data().enrolledEvents;
            if (hasEnrolledEvents != undefined) {
                hasEnrolledEvents.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
                setEnrolledEvents(hasEnrolledEvents);
                setFilteredEvents(hasEnrolledEvents);
            }
        }).catch((error) => console.log("Error getting document: ", error))
    }

    useEffect(() => {
        getEnrolledEvents();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground
                source={require("../../../assets/background.png")}
                style={{ flex: 1 }}>
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