import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, Platform, ImageBackground, UIManager, StyleSheet, Alert } from 'react-native';
import Tab from '../../../components/EventTab'
import EventCard from '../../../components/EventCard'
import firebase from '../../../../firebase';
import { UserContext } from '../../../contexts/UserContext';

var db = firebase.firestore();
const listTab = [{ status: "Today" }, { status: "Tomorrow" }, { status: "This Week" }, { status: "This Month" }]

export default function SavedEvents() {
    const { state } = useContext(UserContext);
    const [status, setStatus] = useState("Today");
    const [date, setDate] = useState();
    const [events, setEvents] = useState(); // All events for current month
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events depending on which tab is clicked 
    var docRef = db.collection("users").doc(state.uid);

    const setStatusFilter = (status) => {
        var dataList = [];
        if (events != undefined) {
            if (status == "Today") {
                dataList = events.filter(x => x.dtstart.includes(date));
            } else if (status == "Tomorrow") {
                let parts = date.split("-");
                let tDay = (parseInt(parts[2]) + 1).toString();
                let tomorrow = `${parts[0]}-${parts[1]}-${tDay.length == 1 ? `0${tDay}` : `${tDay}`}`;
                dataList = events.filter(x => x.dtstart.includes(tomorrow));
            } else if (status == "This Week") {
                let parts = date.split("-");
                let day = parseInt(parts[2]) - new Date(date).getDay();
                for (let i = 0; i < 7; i++) {
                    let nextDay = `${parts[0]}-${parts[1]}-${day.toString().length == 1 ? `0${day}` : `${day}`}`;
                    let temp = events.filter(x => x.dtstart.includes(nextDay));
                    if (temp.length != 0)
                        temp.forEach(x => dataList.push(x));
                    day++;
                }
            } else if (status == "This Month") {
                dataList = events.filter(event => event.dtstart.includes(date.substring(0, 7)));
            }
            setStatus(status);
            dataList.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
            setFilteredEvents(dataList);
        }
    }

    const getEvents = () => {
        docRef.get().then((doc) => {
            let hasEvents = doc.data().savedEvents;
            if (hasEvents == undefined)
                console.log("No saved events");
            else {
                const data = hasEvents.map((i, index) => ({
                    title: hasEvents[index].title,
                    date: hasEvents[index].date,
                    imgSrc: hasEvents[index].imgSrc,
                    description: hasEvents[index].description,
                    eventLink: hasEvents[index].eventLink,
                    dtstart: hasEvents[index].dtstart,
                    hasRSVP: hasEvents[index].hasRSVP
                }));
                setEvents(data);
                setFilteredEvents(data.filter(x => x.dtstart.includes(date)))
            }
        })
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

    const unsaveEventAlert = (event) =>
        Alert.alert(
            "Unsave Event?",
            "This event will be removed from your saved events.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Canceled"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => deleteEvent(event) }
            ],
            { cancelable: false }
        );

    const renderItem = ({ item }) => {
        return (
            <EventCard event={item} saveHandler={unsaveEventAlert} saveToEventsHandler={null} disabled={true} buttonTitle="Unsave" />
        )
    }

    useEffect(() => {
        getEvents();
        var today = new Date();
        var tempDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        setDate(tempDate);
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }, [date]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <View style={styles.topTabs}>
                    {
                        listTab.map((t, index) => (
                            <Tab key={index} tabName={t.status} status={status === t.status} onPress={() => setStatusFilter(t.status)} />
                        ))
                    }
                </View>
                {filteredEvents.length != 0 ?
                    <FlatList
                        data={filteredEvents}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} /> :
                    <View style={styles.emptyBox} >
                        <Text style={styles.empty}>No Events</Text>
                    </View>}
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topTabs: {
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