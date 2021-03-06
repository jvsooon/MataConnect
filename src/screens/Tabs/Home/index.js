import React, { useState, useEffect } from 'react'
import { FlatList, StatusBar, StyleSheet, ImageBackground, Text} from 'react-native';
import { Container, ListHeader, EmptyHeader, Box, JobImg, Cover, EventImg } from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CalendarEvents, Jobs } from '../../../utils';

export default function Index({ navigation }) {
    const [calEvents, setCalEvents] = useState();
    const [tempdate, setTemp] = useState();

    const ListItem = ({ imgSrc, title, tempdate, onPress }) => {
        return (
            <Cover onPress={onPress}>
                <EventImg source={{ uri: imgSrc }} />
                <Text style={styles.eventTitle}>{title.split(': ')[1]}</Text>
                <Text style={styles.eventDate}>{tempdate}</Text>
            </Cover>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem imgSrc={item.imgSrc} title={item.title} tempdate={tempdate} onPress={() => navigation.navigate('Details', item)} />
        )
    };

    const renderJob = ({ item }) => {
        return (
            <JobImg source={{ uri: item.imgSrc }} />
        )
    }

    const getEventByDate = (dateString) => {
        let tempEvents = [];
        CalendarEvents.forEach(event => { if (event.dtstart.split(' ')[0] == dateString) tempEvents.push(event) });
        const data = Object.keys(tempEvents).map((i) => ({
            key: i,
            title: tempEvents[i].title,
            date: tempEvents[i].dtstart,
            imgSrc: tempEvents[i].imgSrc,
            description: tempEvents[i].description
        }));
        setCalEvents(data);
    }

    useEffect(() => {
        var today = new Date();
        var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
      
        var days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];      
        var day = days[ today.getDay() ];
        var month = months[ today.getMonth() ];
        var tempdate =  day + '.' + ' ' + month + ' '  + today.getDate();
        // console.log(tempdate);
        getEventByDate(date);
        setTemp(tempdate);
    }, [])

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar backgroundColor='#fff' barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <Box>
                    <ListHeader>Events happening today</ListHeader>
                     <FlatList
                        style={styles.list}
                        data={calEvents}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}/> 
                </Box>
                <Box>
                    <ListHeader>Upcoming Events</ListHeader>
                    <FlatList
                        style={styles.list}
                        data={calEvents}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </Box>
                <Box>
                    <ListHeader>Apply for Jobs</ListHeader>
                    <FlatList
                        style={styles.list}
                        data={Jobs}
                        renderItem={renderJob}
                        keyExtractor={(item) => item.key}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </Box>
            </ImageBackground>
        </Container>
    );
}

const styles = StyleSheet.create({
    eventTitle:{
        fontSize: 17,
        fontWeight: 'bold', 
        paddingLeft: 11, 
        color: '#2E3862',
        paddingTop: 5.5,
    },
    eventDate:{
        fontSize: 14, 
        fontWeight: '500', 
        paddingLeft: 11, 
        color: '#2E3862',
    },
    list: {
        paddingHorizontal: wp('4%'),
        marginTop: -30
    }
})
