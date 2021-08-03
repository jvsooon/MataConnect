import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, SafeAreaView, RefreshControl, UIManager } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CardScrollView } from './styles'
import EventCard from '../../../components/EventCard'
import 'intl';
import 'intl/locale-data/jsonp/en';
import firebase from '../../../../firebase'
import * as ExpoCalendar from 'expo-calendar';
import { UserContext } from '../../../contexts/UserContext'

const options = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };
var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

async function getDefaultCalendarSourceID() {
    const defaultCalendar = await ExpoCalendar.getDefaultCalendarAsync(); //ios only
    return defaultCalendar.id;
}

export default function Index() {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [events, setEvents] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [markedCollection, setMarkedCollection] = useState();
    const [calID, setCalID] = useState(null);
    const [calendarToken, setCalendarToken] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setEvents(null);
        setRefreshing(false);
    }

    const formatDate = (dtstart) => {
        const fullDate = dtstart.split(' ')
        const dateParts = fullDate[0].split('-')
        if (fullDate.length > 1) {
            const hourParts = fullDate[1].split(':')
            const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
            const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
            return formatedDate
        } else {
            const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
            return formatedDate
        }
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

    const getEventByDate = async (dateString) => {
        let tempEvents = state.events.filter(event => event.dtstart.split(' ')[0].includes(dateString));
        let data = Object.keys(tempEvents).map((i) => ({
            title: tempEvents[i].title,
            date: formatDate(tempEvents[i].dtstart),
            imgSrc: tempEvents[i].imgSrc,
            description: tempEvents[i].description,
            eventLink: tempEvents[i].eventLink,
            dtstart: tempEvents[i].dtstart
        }));
        let temp = await Promise.all(data.map(async (x) => {
            x["hasRSVP"] = await checkForRsvp(x.eventLink)
        }));
        setEvents(data);
    }

    const setMarkedDates = () => {
        const marked = {}
        state.events.map(event => {
            let tempDate = event.dtstart.split(' ')[0];
            marked[tempDate] = { marked: true }
        })
        setMarkedCollection(marked)
    }

    const createCalendar = async () => {
        if (Platform.OS == 'ios') {
            const defaultCalendarID = await getDefaultCalendarSourceID();
            setCalID(defaultCalendarID)
        } else {
            const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
            const newCalendarID = await ExpoCalendar.createCalendarAsync({
                title: 'Expo Calendar',
                color: 'blue',
                entityType: ExpoCalendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
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
        const eventStatus = await ExpoCalendar.createEventAsync(calID, details);
        alert('Event added to calendar')
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

    const CardComponent = () => {
        return (
            <CardScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                { events.map((event, key) => (
                    <EventCard key={key} event={event} saveHandler={createEvent} saveToEventsHandler={pushEvent} disabled={false} buttonTitle="Save" />
                ))}
            </CardScrollView>
        );
    }

    useEffect(() => {
        state.events.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        setMarkedDates();
        if (Platform.OS == 'ios') {
            const reminderStatus = ExpoCalendar.requestRemindersPermissionsAsync();
            const getReminder = ExpoCalendar.getRemindersPermissionsAsync()
        }
        const getPermission = async () => {
            const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
            if (status == 'granted' && calendarToken == false) {
                createCalendar();
                setCalendarToken(true)
            }
        }
        getPermission();
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}

            <Calendar
                // Collection of dates that have to be marked. Default = {} 
                markedDates={markedCollection}
                // Initially visible month. Default = Date()
                // current={'2021-03-24'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2021-01-25'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2021-05-20'}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMM yyyy'}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={0}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => { getEventByDate(day.dateString) }}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={() => { setEvents(null) }}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
            />
            { events != null && <CardComponent />}
        </SafeAreaView>
    );
}