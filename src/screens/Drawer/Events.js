import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, Text, UIManager, Platform, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { CalendarEvents } from '../../utils'
import * as Calendar from 'expo-calendar';
import MenuIcon from '../../assets/menu.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tab from '../../components/EventTab'
import EventCard from '../../components/EventCard'
import firebase from '../../../firebase';
import { UserContext } from '../../contexts/UserContext';

const listTab = [{ status: "Today" }, { status: "Tomorrow" }, { status: "This Week" }, { status: "This Month" }]
const optionsFull = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };
const optionsDate = { month: "long", day: "numeric", year: "numeric" };
var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

async function getDefaultCalendarSourceID() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync(); //ios only
    return defaultCalendar.id;
}

export default function events({ navigation }) {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [status, setStatus] = useState("Today");
    const [calID, setCalID] = useState(null);
    const [calendarToken, setCalendarToken] = useState(false);
    const [date, setDate] = useState(null);
    const [calendarEvents, setCalendarEvents] = useState([]); // All events for current month
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events depending on which tab is clicked
    const [isLoading, setIsLoading] = useState(true);

    const Header = () => {
        return (
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.toggleDrawer()} >
                    <MenuIcon style={{ marginLeft: wp('6%') }} width='30' height='30' />
                </TouchableOpacity>
                <Text style={{ flex: 1, marginLeft: -40, fontWeight: 'bold', fontSize: hp('2%') }}>Events</Text>
            </View>
        )
    }

    const createCalendar = async () => {
        if (Platform.OS == 'ios') {
            const defaultCalendarID = await getDefaultCalendarSourceID();
            setCalID(defaultCalendarID)
        } else {
            const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
            const newCalendarID = await Calendar.createCalendarAsync({
                title: 'Expo Calendar',
                color: 'blue',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
            });
            setCalID(newCalendarID)
        }
    }

    const createEvent = async (title, description) => {
        const details = {
            title: title,
            startDate: new Date(),
            endDate: new Date(),
            notes: description,
        };
        const eventStatus = await Calendar.createEventAsync(calID, details);
        alert('Event added to calendar')
    }

    const formatDate = (dtstart) => {
        const fullDate = dtstart.split(' ')
        const dateParts = fullDate[0].split('-')
        if (fullDate.length > 1) {
            const hourParts = fullDate[1].split(':')
            const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
            return new Intl.DateTimeFormat("en-US", optionsFull).format(date);
        } else {
            const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            return new Intl.DateTimeFormat("en-US", optionsDate).format(date);
        }
    }

    const pushEvent = (event) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    savedEvents: arrayUnion(event)
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const setStatusFilter = (status) => {
        var dataList = [];
        if (status == "Today") {
            dataList = calendarEvents.filter(x => x.dtstart.includes(date));
        } else if (status == "Tomorrow") {
            let parts = date.split("-");
            let tDay = (parseInt(parts[2]) + 1).toString();
            let tomorrow = `${parts[0]}-${parts[1]}-${tDay.length == 1 ? `0${tDay}` : `${tDay}`}`;
            dataList = calendarEvents.filter(x => x.dtstart.includes(tomorrow));
        } else if (status == "This Week") {
            let parts = date.split("-");
            let day = parseInt(parts[2]) - new Date(date).getDay();
            for (let i = 0; i < 7; i++) {
                let nextDay = `${parts[0]}-${parts[1]}-${day.toString().length == 1 ? `0${day}` : `${day}`}`;
                let temp = calendarEvents.filter(x => x.dtstart.includes(nextDay));
                if (temp.length != 0)
                    temp.forEach(x => dataList.push(x));
                day++;
            }
        } else if (status == "This Month") {
            dataList = calendarEvents;
        }
        setStatus(status);
        dataList.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        setFilteredEvents(dataList);
    }

    const checkForRsvp = (eventUrl) => {
        let hasRSVP = fetch(eventUrl)
            .then(res => res.text())
            .then(data => {
                if (data.includes('Register') == true || data.includes('RSVP') == true)
                    return true;
                else
                    return false;
            });
        return hasRSVP;
    }

    const renderItem = ({ item }) => {
        return (
            <EventCard event={item} saveHandler={createEvent} saveToEventsHandler={pushEvent} disabled={false} buttonTitle="Save" />
        )
    }

    useEffect(() => {
        var today = new Date();
        var tempDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        setDate(tempDate);
        const getEvents = async (value) => {
            let eventsThisMonth = CalendarEvents.filter(event => event.dtstart.split(' ')[0].includes(value.substring(0, 7)));
            let data = Object.keys(eventsThisMonth).map(i => ({
                title: eventsThisMonth[i].title,
                date: formatDate(eventsThisMonth[i].dtstart),
                imgSrc: eventsThisMonth[i].imgSrc,
                description: eventsThisMonth[i].description,
                eventLink: eventsThisMonth[i].eventLink,
                dtstart: eventsThisMonth[i].dtstart
            }));
            let temp = await Promise.all(data.map(async (x) => {
                x["hasRSVP"] = await checkForRsvp(x.eventLink)
            }));
            data.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
            setCalendarEvents(data);
            setFilteredEvents(data.filter(x => x.dtstart.includes(date)))
            setIsLoading(false);
        }
        getEvents(tempDate);

        if (Platform.OS == 'ios') {
            const reminderStatus = Calendar.requestRemindersPermissionsAsync();
            const getReminder = Calendar.getRemindersPermissionsAsync()
        }
        const getPermission = async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status == 'granted' && calendarToken == false) {
                createCalendar();
                setCalendarToken(true)
            }
        }
        getPermission();
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }, [date])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
                <Header />
                <View style={styles.topTabs}>
                    {
                        listTab.map((t, index) => (
                            <Tab key={index} tabName={t.status} status={status === t.status} onPress={() => setStatusFilter(t.status)} widthSize={(wp('100%') / 4) - 50} />
                        ))
                    }
                </View  >
                {isLoading == true ?
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='grey' />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), alignSelf: 'center' }}>Loading</Text>
                    </View>
                    :
                    (filteredEvents.length != 0 ?
                        <FlatList
                            data={filteredEvents}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()} /> :
                        <View style={styles.emptyBox} >
                            <Text style={styles.empty}>No Events</Text>
                        </View>
                    )
                }
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topTabs: {
        marginRight: 8,
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20
    },
    emptyBox: {
        flex: 1,
        justifyContent: "center"
    },
    empty: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 26
    }
})