import React from 'react'
import { FlatList, StatusBar, StyleSheet, Image } from 'react-native';
import { Container, ListHeader, Box, ImageShadow } from './styles';
import ListItem from '../../../components/ListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DATA = [
    {
        title: 'Title',
        id: "0",
        description: "One",
    },
    {
        title: 'Title',
        id: "1",
        description: "Two",
    },
    {
        title: 'Title',
        id: "2",
        description: "Three",
    },
    {
        title: 'Title',
        id: "3",
        description: "Four",
    },
    {
        title: 'Title',
        id: "4",
        description: "Five",
    },
    {
        title: 'Title',
        id: "5",
        description: "Six",
    },
    {
        title: 'Title',
        id: "6",
        description: "Seven",
    },
    {
        title: 'Title',
        id: "7",
        description: "Eight",
    },
    {
        title: 'Title',
        id: "8",
        description: "Nine",
    },
];


export default function Index() {
    const renderItem = () => (
        <ListItem  />
        // <ImageShadow>
        //      <Image style={{width: '100%', height: '100%'}} source={{ uri: 'https://snack.expo.io/web-player/39/static/media/react-native-logo.79778b9e.png' }} />
        //  </ImageShadow>
        
    );

    return (
        <Container>
            {/* <StatusBar /> */}
            {Platform.OS == 'ios' ?
                <StatusBar backgroundColor='#fff' barStyle='dark-content' /> :
                <StatusBar />
            }
            <Box>
                <ListHeader>Events happening today</ListHeader>
                <FlatList
                    style={styles.list}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
            <Box>
                <ListHeader>Upcoming Events</ListHeader>
                <FlatList
                    style={styles.list}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
            <Box>
                <ListHeader>Apply for Jobs</ListHeader>
                <FlatList
                    style={styles.list}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
        </Container>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: wp('4%'),
    }
})
