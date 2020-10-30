import React from 'react'
import { FlatList, StatusBar, StyleSheet, Image, Text } from 'react-native';
import { Container, ListHeader, Box, ImageShadow } from './styles';
import ListItem from '../../../components/ListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EventsToday = [
    {
        url: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/Oasis_VirtualWellnessEvent_InitalDesign_2.jpg?itok=Z-Ons3tY',
        id: "0",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/DC_let_stalk_Fall2020_3-01.png?itok=LQLvbnA9',
        id: "1",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/IG-HealingSpace-FA2020_0.png?itok=Tv0Bj8Ko',
        id: "2",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/gaymenight-01_0.png?itok=XC5myZH2',
        id: "3",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/IG-VRCGamesNight-FA2020.png?itok=6C9SskE_',
        id: "4",
    }
];

const UpcomingEvents = [
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/Oasis_VirtualWellnessEvent_InitalDesign_2.jpg?itok=Giy-RGs_',
        id: "0",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/DC_let_stalk_Fall2020_3-01.png?itok=rAh0z0dV',
        id: "1",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/IG-HealingSpace-FA2020_0.png?itok=4DmaZgpU',
        id: "2",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/gaymenight-01_0.png?itok=Kfecwj7W',
        id: "3",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/IG-VRCGamesNight-FA2020.png?itok=pPhv_B1v',
        id: "4",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/Oasis_VirtualWellnessEvent_InitalDesign.jpg?itok=h96kQCXP',
        id: "5",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/vrc_logo_lede.png?itok=3TW57sRq',
        id: "6",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/preview-full-IG-TechTips-Virtual-01.png?itok=P1kGwst0',
        id: "7",
    },
    {
        url: 'https://www.csun.edu/sites/default/files/styles/square_thumbnail_small/public/field_lede_image/event/SU%2720_Out_on_stage_.png?itok=Toy104ad',
        id: "8",
    },
];

const Jobs = [
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/419962/small/hs-emp-logo-data.?1555011736',
        id: "0",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/18175/small/hs-emp-logo-data.?1556146582',
        id: "1",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/18950/small/hs-emp-logo-data.?1556129989',
        id: "2",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/360136/small/hs-emp-logo-data.?1540573780',
        id: "3",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/8440/small/hs-emp-logo-data.?1598559581',
        id: "4",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/14072/small/hs-emp-logo-data.?1576702967',
        id: "5",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/21013/small/hs-emp-logo-data.?1600898655',
        id: "6",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/19921/small/hs-emp-logo-data.?1535648998',
        id: "7",
    },
    {
        url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/256165/small/hs-emp-logo-data.?1535570857',
        id: "8",
    }
];


export default function Index() {
    const renderItem = (item) => (
        <ListItem item={item} />
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
                    data={EventsToday}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
            <Box>
                <ListHeader>Upcoming Events</ListHeader>
                <FlatList
                    style={styles.list}
                    data={UpcomingEvents}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
            <Box>
                <ListHeader>Apply for Jobs</ListHeader>
                <FlatList
                    style={styles.list}
                    data={Jobs}
                    renderItem={({item}) => renderItem(item)}
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
