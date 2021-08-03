import React, { useState, useEffect, useContext } from 'react'
import { FlatList, StatusBar, StyleSheet, ImageBackground, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Container, ListHeader, EmptyHeader, Box, Card, EventImg, Link } from './styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../../../contexts/UserContext';
import cheerio from 'cheerio'
import { MaterialIcons } from '@expo/vector-icons';

var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const usuCareersUrl = 'https://phe.tbe.taleo.net/phe02/ats/careers/v2/searchResults?org=UNISTUDENTUNION&cws=38';
const staffManagementUrl = 'https://careers.pageuppeople.com/873/nr/en-us/listing/';
const baseManagementUrl = 'https://careers.pageuppeople.com';

export default function Index({ navigation }) {
    const { state } = useContext(UserContext);
    const [eventsToday, setEventsToday] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [studentJobs, setStudentJobs] = useState([]);
    // const [staffJobs, setStaffJobs] = useState([]);

    const ListItem = ({ imgSrc, title, dtstart, onPress }) => {
        return (
            <Card>
                <Box style={{ flexDirection: 'row', alignItems: 'center', marginLeft: hp('1.5%'), marginTop: hp('1.5%') }}>
                    <EventImg source={{ uri: imgSrc }} />
                    <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={onPress}>
                        <Link>View</Link>
                        <Link>Event</Link>
                    </TouchableOpacity>
                </Box>
                <Box style={{ marginHorizontal: hp('1.5%') }}>
                    <Text numberOfLines={1} style={styles.eventTitle}>{title.split(':')[0]}</Text>
                    <Text style={styles.eventDate}>{formatDate(dtstart)}</Text>
                </Box>
            </Card>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem imgSrc={item.imgSrc} title={item.title} dtstart={item.dtstart} onPress={() => navigation.navigate('Details', item)} />
        )
    }

    const renderJob = ({ item }) => {
        return (
            <Card>
                <Box style={{ flexDirection: 'row', alignItems: 'center', marginLeft: hp('1.5%'), marginTop: hp('1.5%') }}>
                    <EventImg source={require('../../../assets/csun_matador.png')} resizeMode="contain" />
                    <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => navigation.navigate('Job Details', item.url)}>
                        <Link>View</Link>
                        <Link>Listing</Link>
                    </TouchableOpacity>
                </Box>
                <Box style={{ marginHorizontal: hp('1.5%') }}>
                    <Text numberOfLines={1} style={styles.eventTitle}>{item.title}</Text>
                    <Box style={{flexDirection: 'row'}}>
                        <MaterialIcons name="room" size={hp('1.5%')} />
                        <Text numberOfLines={1} style={styles.eventDate}>{item.location}</Text>
                    </Box>
                </Box>
            </Card>
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

    const scrapeUSUCareers = async () => {
        let data = [];
        const response = await fetch(usuCareersUrl).then(res => res.text());
        const $ = cheerio.load(response);

        const results = $('.oracletaleocwsv2-accordion-head-info').each(function (i, elem) {
            let job = {
                company: $(elem).find('div:nth-child(3)').text(),    // department
                jobType: 'student',
                location: $(elem).find('div:nth-child(2)').text(),
                title: $(elem).find('h4').text(),                    // position
                url: $(elem).find('a').attr('href')
            }
            data.push(job);
        });
        setStudentJobs(data);
    }

    const scrapeManagementCareers = async () => {
        let data = [], temp = {};
        const response = await fetch(staffManagementUrl).then(res => res.text());
        const $ = cheerio.load(response);

        const results = $('#recent-jobs-content > tr').each(function (i, elem) {
            if (((i + 1) % 2) != 0) {
                temp = {
                    company: $(elem).find('td:nth-child(2)').text().trim(),    // division
                    jobType: 'staff',
                    location: 'Northridge',
                    title: $(elem).find('a').text(), // position
                    url: `${baseManagementUrl}${$(elem).find('a').attr('href')}`
                }
                data.push(temp);
            }
        });
        setStaffJobs(data);
    }

    useEffect(() => {
        var today = new Date();
        var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        getEventsToday('2021-05-11');
        getUpcomingEvents('2021-05-11');
        scrapeUSUCareers();
        // scrapeManagementCareers();
    }, [])

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar backgroundColor='#fff' barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <ScrollView style={{ marginBottom: hp('10%') }}>
                    <Box>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <ListHeader style={{ marginTop: hp('1%') }}>Events</ListHeader>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Events')}>
                                <Link>Happening Today</Link>
                                <MaterialIcons style={{ marginHorizontal: wp('2%') }} name="arrow-forward" size={24} color="#1C73E5" />
                            </TouchableOpacity>
                        </Box>
                        {(eventsToday.length != 0) ?
                            <FlatList
                                style={styles.list}
                                data={eventsToday}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} /> :
                            <Box style={{ alignSelf: "center" }}>
                                <EmptyHeader>No Events</EmptyHeader>
                            </Box>
                        }
                    </Box>
                    <Box>
                        {(upcomingEvents.length != 0) ?
                            <Box>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: hp('.5%') }}>
                                    <Link>This Week</Link>
                                    <MaterialIcons style={{ marginHorizontal: wp('2%') }} name="arrow-forward" size={24} color="#1C73E5" />
                                </TouchableOpacity>
                                <FlatList
                                    style={styles.list}
                                    data={upcomingEvents}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false} />
                            </Box> :
                            <Box style={{ alignSelf: "center" }}>
                                <EmptyHeader>No Events</EmptyHeader>
                            </Box>
                        }
                    </Box>
                    <Box>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <ListHeader style={{ marginTop: hp('1%') }}>On-Campus Jobs</ListHeader>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Jobs', { section: 'Students' })}>
                                <Link>Students</Link>
                                <MaterialIcons style={{ marginHorizontal: wp('2%') }} name="arrow-forward" size={24} color="#1C73E5" />
                            </TouchableOpacity>
                        </Box>
                        {studentJobs.length != 0 ?
                            <FlatList
                                style={styles.list}
                                data={studentJobs}
                                renderItem={renderJob}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} /> :
                            <Box style={{ alignSelf: "center" }}>
                                <EmptyHeader>No Jobs</EmptyHeader>
                            </Box>
                        }
                    </Box>
                    {/* <Box>
                        {staffJobs.length != 0 ?
                            <Box>
                                <Box style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: hp('.5%') }}>
                                    <Link>Staff & Management</Link>
                                    <MaterialIcons style={{ marginHorizontal: wp('2%') }} name="arrow-forward" size={24} color="#1C73E5" />
                                </Box>
                                <FlatList
                                    style={styles.list}
                                    data={staffJobs}
                                    renderItem={renderJob}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false} />
                            </Box> :
                            <Box style={{ alignSelf: "center" }}>
                                <EmptyHeader>No Jobs</EmptyHeader>
                            </Box>
                        }
                    </Box> */}
                </ScrollView>
            </ImageBackground>
        </Container>
    );
}

const styles = StyleSheet.create({
    eventTitle: {
        fontSize: Platform.OS == "ios" ? hp("2%") : hp("2.3%"),
        fontWeight: 'bold',
        color: '#2E3862',
    },
    eventDate: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2E3862',
        marginBottom: hp('1%'),
        flex: 1
    },
    list: {
        paddingHorizontal: wp('4%')
    }
})