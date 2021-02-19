import React, { useState, useEffect } from 'react'
import { FlatList, StatusBar, StyleSheet, ImageBackground, Text} from 'react-native';
import { Container, ListHeader, EmptyHeader, Box, JobImg, Cover, EventImg } from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CalendarEvents, Jobs } from '../../../utils'

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
        var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
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
    list: {
        paddingHorizontal: wp('4%'),
    }
})
