import React, { useState, useEffect } from 'react'
import { StatusBar, SafeAreaView, Image, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
    Card, CardCover, CardContent, CardTitle,
    CardSubTitle, CardScrollView, CardOptions, CardClickable
} from './styles'
import { CalendarEvents } from '../../../utils'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import 'intl';
import 'intl/locale-data/jsonp/en';

const inactive = { color: '#000', name: 'star-o' }, active = { color: '#63C2D1', name: 'star' };
const usuImage = 'https://live.staticflickr.com/3948/buddyicons/149217749@N02_r.jpg?1491936417#149217749@N02';
const options = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };


export default function Index({navigation}) {
    const [events, setEvents] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [markedCollection, setMarkedCollection] = useState();

    const onRefresh = () => {
        setRefreshing(true);
        setEvents(null);
        setRefreshing(false);
    }

    const formatDate = (dtstart) => {
        const fullDate = dtstart.split(' ')
        const dateParts = fullDate[0].split('-')
        const hourParts = fullDate[1].split(':')
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
        const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        return formatedDate;
    }


    const getEventByDate = (dateString) => {
        let tempEvents = [];
        CalendarEvents.forEach(event => { if (event.dtstart.split(' ')[0] == dateString) tempEvents.push(event) });
        const data = Object.keys(tempEvents).map((i) => ({
            key: i,
            title: tempEvents[i].title,
            date: formatDate(tempEvents[i].dtstart),
            imgSrc: tempEvents[i].imgSrc,
        }));
        setEvents(data);
    }

    const setMarkedDates = () => {
        const marked = {}
        CalendarEvents.map(event => {
            let tempDate = event.dtstart.split(' ')[0];
            marked[tempDate] = { marked: true }
        })
        setMarkedCollection(marked)
    }

    const handleSaveClick = (iconState, setIconState) => {
        iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
    }

    const StarButton = () => {
        const [iconState, setIconState] = useState(inactive);

        return (
            <CardClickable onPress={() => handleSaveClick(iconState, setIconState)}>
                <FontAwesome name={iconState.name} size={24} color={iconState.color} />
            </CardClickable>
        );
    }

    const CardComponent = () => {
        return (
            <CardScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                { events.map(({ title, date, imgSrc, key }) => (
                    <Card key={key}>
                        <CardCover >
                            <Image source={{ uri: imgSrc == '' ? usuImage : imgSrc }}
                                style={{ width: hp('12%'), height: hp('12%'), borderRadius: 20 }}
                                resizeMode='contain' />
                        </CardCover>
                        <CardContent>
                            <CardTitle>{title.split(':')[0]}</CardTitle>
                            <CardSubTitle>{date}</CardSubTitle>
                        </CardContent>
                        <CardOptions>
                            <StarButton />
                            <CardClickable onPress={() => navigation.navigate('Events')}>
                                <MaterialCommunityIcons name={'arrow-right'} size={24} color='black' />
                            </CardClickable>
                        </CardOptions>
                    </Card>
                ))}
            </CardScrollView>
        );
    }

    useEffect(() => {
        CalendarEvents.sort(function (a, b) { return a.dtstart.localeCompare(b.dtstart) });
        setMarkedDates();

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}

            <Calendar
                // Collection of dates that have to be marked. Default = {} 
                markedDates={markedCollection}
                // Initially visible month. Default = Date()
                // current={'2020-11-22'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2020-08-24'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2020-12-15'}
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