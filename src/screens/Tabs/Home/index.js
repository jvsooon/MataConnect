import React, { useState, useEffect } from 'react'
import { FlatList, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { Container, ListHeader, Box, JobImg, Cover, EventImg } from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CalendarEvents } from '../../../utils'

const Jobs = [
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/419962/small/hs-emp-logo-data.?1555011736',
        key: "0",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/18175/small/hs-emp-logo-data.?1556146582',
        key: "1",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/18950/small/hs-emp-logo-data.?1556129989',
        key: "2",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/360136/small/hs-emp-logo-data.?1540573780',
        key: "3",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/8440/small/hs-emp-logo-data.?1598559581',
        key: "4",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/14072/small/hs-emp-logo-data.?1576702967',
        key: "5",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/21013/small/hs-emp-logo-data.?1600898655',
        key: "6",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/19921/small/hs-emp-logo-data.?1535648998',
        key: "7",
    },
    {
        imgSrc: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/256165/small/hs-emp-logo-data.?1535570857',
        key: "8",
    }
];

export default function Index({ navigation }) {
    const [calEvents, setCalEvents] = useState()

    const ListItem = ({ imgSrc, onPress }) => {
        return (
            <Cover onPress={onPress}>
                <EventImg source={{ uri: imgSrc }} />
            </Cover>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem imgSrc={item.imgSrc} onPress={() => navigation.navigate('Details', item)} />
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
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
        getEventByDate(date)
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
                        showsHorizontalScrollIndicator={false}
                    />
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
    list: {
        paddingHorizontal: wp('4%'),
    }
})
