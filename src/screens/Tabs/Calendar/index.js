import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Keyboard, StatusBar, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import EventDetails from './EventDetails'
import ShareIcon from '../../../assets/share.svg'
// import { events } from '../../2020'
export default function Index() {
    // const { dispatch: userDispatch } = useContext(UserContext);
    const [items, setItems] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const navigation = useNavigation();

    const getEvents = () => {
        var request = new XMLHttpRequest();
        request.open(
            "GET",
            // "https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics",
            "https://www.csun.edu/feeds/ics/events/55816/calexport.ics/2020",
            true
        );
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader("Content-Type");
                if (type.indexOf("text") !== 1) {
                    var lines = request.responseText.split("\n");
                    var events = []
                    var events_i = 0;
                    for (var i = 0; i < lines.length; i++) {
                        if (lines[i].includes('DESCRIPTION')) {
                            var date = lines[i].split(":");
                            var count = i + 1;
                            // while(!lines[count].includes('DSTART')) {
                            //   console.log(lines[count])
                            // }
                            events[events_i] = { description: date[1] };
                        } else if (lines[i].includes('DTSTART')) {
                            var date = lines[i].split(":");
                            date = date[1].split("T");
                            console.log(date[1])
                            // events[events_i]["startTime"] = `${date[1].substring(0, 2)}:${date[1].substring(2, 4)}` ;
                            // events[events_i]["date"] = `${date[0].substring(4, 6)}/${date[0].substring(6)}/${date[0].substring(0, 4)}`;
                        } else if (lines[i].includes('DTEND')) {
                            var date = lines[i].split(":");
                            date = date[1].split("T");
                            events[events_i]["endTime"] = `${date[1].substring(0, 2)}:${date[1].substring(2, 4)}`;
                        }
                        else if (lines[i].includes('SUMMARY')) {
                            // var title = lines[i].split('/:(.+)/')[1];
                            var title = lines[i].substring(lines[i].indexOf(':') + 1);
                            events[events_i]["title"] = title;
                        }
                        else if (lines[i].includes('END:VEVENT')) {
                            events_i++;
                        }
                    }
                    // console.log(events[0]);
                }
            }
        };
    }
    // getEvents();


    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const loadItems = (month) => {
        // console.log('Other month')
        if (month.month == 10) {
            // console.log('October')
            setTimeout(() => {
                // for (let i = -15; i < 60; i++) {
                //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                //     const strTime = timeToString(time);
                //     if (!items[strTime]) {
                //         items[strTime] = [];
                //         const numItems = Math.floor(Math.random() * 3 + 1);
                //         for (let j = 0; j < numItems; j++) {
                //             items[strTime].push({
                //                 name: 'Item for ' + strTime + ' #' + j,
                //                 height: Math.max(50, Math.floor(Math.random() * 150))
                //             });
                //         }
                //     }
                // }
                // console.log(events)
                items["2020-10-20"] = [];
                items["2020-10-20"].push({
                    name: "USU Computer Lab: Tech Tips - Prezi",
                    date: 'Tuesday, October 20, 2020 - 2:00pm to 3:00pm',
                    time: '2:00pm to 3:00pm',
                    description: 'Become a computer wiz with the University Student Union by taking Virtual Tech Tips workshops — FREE to CSUN students! You can improve your technological skills from your home with quick and informative 1-hour workshops via Zoom. It’s a great opportunity to become a more proficient user of popular programs such as Photoshop, PowerPoint, Illustrator, Prezi, and more! Whether you’re a beginner or an expert, we’ve got a class just for you! Take advantage of CSUN’s digital campus with a Virtual Tech Tipsworkshop from the USU… Where Matadors Belong!',
                    location: 'Via Zoom',
                    register: 'https://srcportal.csun.edu/',
                    img: 'https://www.csun.edu/sites/default/files/styles/deck_image/public/field_lede_image/event/preview-full-IG-TechTips-Virtual-01.png'
                });
                // items["2020-10-08"] =[];

                items["2020-10-20"].push({
                    name: "Virtual Pride Center",
                    date: 'Tuesday, October 20, 2020 - 3:00pm to 5:00pm',
                    time: '3:00pm to 5:00pm',
                    description: 'Come join in the conversation with your Pride Center this semester! Every Tuesday from 3 to 5 p.m., you’re invited to visit with us during Virtual Pride Center via Zoom to get your questions answered and spend some time connecting with us while still practicing social distancing. Whether you want to see a familiar face, discuss LGBTQIA+ topics, watch videos, or even ask a question about available resources—you can log on to the Virtual Pride Center and join the conversation.',
                    location: 'Zoom Meeting ID: 316 032 342 (Password: pride)',

                });
                const newItems = {};
                Object.keys(items).forEach(key => { newItems[key] = items[key]; });
                // const newItems = {};
                // Object.keys(events).forEach(key => { newItems[key] = events[key]; });
                setItems(newItems);
                // setItems(events);
                // console.log(newItems)
            }, 1000);
        }
    }

    const renderItem = (item) => {
        return (
            // <View>
            <TouchableOpacity onPress={() => navigation.navigate('Event Details', item, navigation)}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.innerContent}>
                            <View>
                                <Text style={styles.title}>{item.name.substring(0, 30)}</Text>
                                <Text>{item.time}</Text>
                            </View>

                            <Avatar.Text size={40} label={`${item.name.substring(0, 1)}`} style={styles.avatar} />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            // </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} /> */}
            {/* <StatusBar /> */}
            {Platform.OS == 'ios' ?
                <StatusBar backgroundColor='#fff' barStyle='dark-content' /> :
                <StatusBar barStyle={'dark-content'} />
            }
            <Agenda
                items={items}
                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={(month) => { loadItems(month) }}
                // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2020-08-24'}
                // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2020-12-31'}
                // // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={2}
                // // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={3}
                // // Specify how each item should be rendered in agenda
                // renderItem={(item, firstItemInDay) => { return (<View />); }}
                renderItem={renderItem}

                // Callback that fires when the calendar is opened or closed
                // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                // // Callback that gets called on day press
                // onDayPress={(day) => { console.log('day pressed') }}
                // // Callback that gets called when day changes while scrolling agenda list
                // onDayChange={(day) => { console.log('day changed') }}
                // Initially selected day
                // selected={'2020-10-08'}
                // // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                // renderDay={(day, item) => { return (<View />); }}
                // Specify how empty date content with no items should be rendered
                // renderEmptyDate={() => { return (<View />); }}
                // // Specify what should be rendered instead of ActivityIndicator
                renderEmptyData={() => { return (<View />); }}
            // Specify your item comparison function for increased performance
            // rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            // disabledByDefault={false}
            // Agenda theme
            // theme={{
            // ...calendarTheme,
            //   agendaDayTextColor: 'yellow',
            //   agendaDayNumColor: 'green',
            //   agendaTodayColor: 'red',
            //   agendaKnobColor: 'blue'
            // }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        marginRight: 10,
        marginLeft: -8,
        marginTop: 17,
        borderRadius: 10
    },
    innerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    avatar: {
        backgroundColor: '#3C8E9A',
    },
    modalContent: {
        flex: 1,
        padding: 12,
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0
    }
});

{/* Modal displaying event details  */ }
{/* <Modal visible={modalOpen} animationType={'slide'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
                <MaterialIcons
                    name='close'
                    size={24}
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    onPress={() => setModalOpen(false)}
                />
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>{item.date}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.description}</Text>
                    <ShareIcon  width='26' height='26' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal> */}
