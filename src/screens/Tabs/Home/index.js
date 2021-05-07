import React, { useState, useEffect, useContext } from 'react'
import { FlatList, StatusBar, StyleSheet, ImageBackground, Text, Platform } from 'react-native';
import { Container, ListHeader, NoEventsHeader, Box, JobImg, Cover, EventImg } from './styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Jobs } from '../../../utils';
import { UserContext } from '../../../contexts/UserContext';

var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Index({ navigation }) {
    const { state } = useContext(UserContext);
    const [eventsToday, setEventsToday] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const ListItem = ({ imgSrc, title, dtstart, onPress }) => {
        return (
            <Box>
                <Cover onPress={onPress}>
                    <EventImg source={{ uri: imgSrc }} />
                </Cover>
                <Text style={styles.eventTitle}>{title.split(':')[0]}</Text>
                <Text style={styles.eventDate}>{formatDate(dtstart)}</Text>
            </Box>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem imgSrc={item.imgSrc} title={item.title} dtstart={item.dtstart} onPress={() => navigation.navigate('Details', item)} />
        )
    };

    const renderJob = ({ item }) => {
        return (
            <JobImg source={{ uri: item.imgSrc }} />
        )
    }

    const getEventsToday = (dateString) => {
        let tempEvents = state.events.filter(event => event.dtstart.split(' ')[0].includes(dateString));
        tempEvents.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        setEventsToday(tempEvents);
    }

    const getUpcomingEvents = (dateString) => {
        let parts = dateString.split("-");
        let day = parseInt(parts[2]) + 1;
        let dayOfWeek = new Date(dateString).getDay();
        let eventsThisWeek = []

        for (let i = dayOfWeek; i < 7; i++) {
            let nextDay = `${parts[0]}-${parts[1]}-${day.toString().length == 1 ? `0${day}` : `${day}`}`;
            let temp = state.events.filter(x => x.dtstart.includes(nextDay));
            if (temp.length != 0)
                temp.forEach(x => eventsThisWeek.push(x));
            day++;
        }
        eventsThisWeek.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        setUpcomingEvents(eventsThisWeek);
    }

    const formatDate = (dtstart) => {
        let parts = dtstart.split(" ")[0].split("-");
        let today = new Date(parts[0], parseInt(parts[1]) - 1, parts[2])
        var day = days[today.getDay()];
        var month = months[today.getMonth()];
        var formattedDate = day + '.' + ' ' + month + ' ' + today.getDate();
        return formattedDate;
    }

    useEffect(() => {
        var today = new Date();
        var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        getEventsToday(date);
        getUpcomingEvents(date);
    }, [])

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar backgroundColor='#fff' barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <Box>
                    <ListHeader>Events happening today</ListHeader>
                    {(eventsToday.length != 0) ?
                        <FlatList
                            style={styles.list}
                            data={eventsToday}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false} /> :
                        <Box style={{ alignSelf: "center" }}>
                            <NoEventsHeader>No Events</NoEventsHeader>
                        </Box>
                    }
                </Box>
                <Box>
                    <ListHeader>Upcoming Events</ListHeader>
                    {(upcomingEvents.length != 0) ?
                        <FlatList
                            style={styles.list}
                            data={upcomingEvents}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false} /> :
                        <Box style={{ alignSelf: "center" }}>
                            <NoEventsHeader>No Events</NoEventsHeader>
                        </Box>
                    }
                </Box>
                <Box>
                    <ListHeader>Apply for Jobs</ListHeader>
                    <FlatList
                        style={styles.list}
                        data={Jobs}
                        renderItem={renderJob}
                        keyExtractor={(item) => item.key}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} />
                </Box>
            </ImageBackground>
        </Container>
    );
}

const styles = StyleSheet.create({
    eventTitle: {
        fontSize: Platform.OS == "ios" ? hp("2%") : hp("2.3%"),
        fontWeight: 'bold',
        paddingLeft: wp('2%'),
        color: '#2E3862',
        paddingTop: 5.5,
    },
    eventDate: {
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: wp('2%'),
        color: '#2E3862',
    },
    list: {
        paddingHorizontal: wp('4%'),
        marginTop: -30
    }
})