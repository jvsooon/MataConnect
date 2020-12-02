import React, { useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, StyleSheet, Imagebackground, Image, Text, UIManager, Platform, LayoutAnimation, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalendarEvents } from '../../utils'
import * as Calendar from 'expo-calendar';
import MenuIcon from '../../assets/menu.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons'

const options = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };
const inactive = { color: '#000', name: 'star-o' }, active = { color: '#63C2D1', name: 'star' };

const CustomButton = ({ title, onPress }) => {
  return (
    <LinearGradient
      colors={['#A5FAEA', '#6EC8F5']}
      style={styles.buttonBG}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const handleSaveClick = (iconState, setIconState) => {
  iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
}

const StarButton = () => {
  const [iconState, setIconState] = useState(inactive);

  return (
    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10}} onPress={() => handleSaveClick(iconState, setIconState)}>
      <FontAwesome name={iconState.name} size={24} color={iconState.color} />
    </TouchableOpacity>
  );
}

const Card = ({ title, subTitle, image, description, event, eventLink }) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.create(
          250,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.scaleXY
        ));
        setCollapsed(!collapsed)
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 10, margin: 10 }} />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 16 }}>{title.split(':')[0]}</Text>
          <Text style={{ fontSize: 16 }}>{subTitle}</Text>
        </View>
        <StarButton/>
      </View>
      {collapsed && <View >
        <Text style={{ margin: 10 }}>{description.split('.')[0]}</Text>
        <View style={styles.cardFooter}>
          <CustomButton title="Save" onPress={() => event(title, description)} />
          <CustomButton title="RSVP" />
          <CustomButton title="Website" onPress={() => Linking.openURL(eventLink)} />
        </View>
      </View>
      }
    </TouchableOpacity>
  )
}

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.toggleDrawer()} >
        <MenuIcon style={{ marginLeft: wp('6%') }} width='30' height='30' />
      </TouchableOpacity>
      <Text style={{ flex: 1, marginLeft: -40, fontWeight: 'bold', fontSize: hp('2%') }}>Events</Text>
    </View>
  )
}

async function getDefaultCalendarSourceID() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync(); //ios only
  return defaultCalendar.id;
}

export default class events extends React.Component {
  constructor() {
    super()
    if (Platform.OS === 'android')
      UIManager.setLayoutAnimationEnabledExperimental(true)
    this.state = {
      calEvents: null,
      calID: null,
      calendarToken: false
    }
  }

  createCalendar = async () => {
    if (Platform.OS == 'ios') {
      const defaultCalendarID = await getDefaultCalendarSourceID();
      this.setState({ calID: defaultCalendarID })
    } else {
      const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
      const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Expo Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      this.setState({ calID: newCalendarID })
    }
  }

  createEvent = async (title, description) => {
    const details = {
      title: title,
      startDate: new Date(),
      endDate: new Date(),
      notes: description,
    };

    const eventStatus = await Calendar.createEventAsync(this.state.calID, details);
    alert('Event added to calendar')
  }

  formatDate = (dtstart) => {
    const fullDate = dtstart.split(' ')
    const dateParts = fullDate[0].split('-')
    const hourParts = fullDate[1].split(':')
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formatedDate;
  }

  getEventByDate = (dateString) => {
    let tempEvents = [];
    CalendarEvents.forEach(event => { if (event.dtstart.split(' ')[0] == dateString) tempEvents.push(event) });
    const data = Object.keys(tempEvents).map((i) => ({
      key: i,
      title: tempEvents[i].title,
      date: this.formatDate(tempEvents[i].dtstart),
      imgSrc: tempEvents[i].imgSrc,
      description: tempEvents[i].description,
      eventLink: tempEvents[i].eventLink
    }));
    this.setState({ calEvents: data });
  }

  async componentDidMount() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate());
    this.getEventByDate(date)

    if (Platform.OS == 'ios') {
      const reminderStatus = Calendar.requestRemindersPermissionsAsync();
      const getReminder = Calendar.getRemindersPermissionsAsync()
    }

    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (this.state.calendarToken == false) {
      this.createCalendar();
      this.setState({ calendarToken: true })
    }
  }

  renderItem = ({ item }) => {
    return (
      <Card title={item.title} subTitle={item.date} image={item.imgSrc} description={item.description} event={this.createEvent} eventLink={item.eventLink} />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
        <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
          <Header />
          <View style={styles.topTabs}>
            <CustomButton title="Today" />
            <CustomButton title="Tomorrow" />
            <CustomButton title="This week" />
            <CustomButton title="This month" />
          </View>

          <FlatList
            data={this.state.calEvents}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.key} />
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBG: {
    height: 30,
    width: 90,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    width: 90
  },
  topTabs: {
    marginRight: 8,
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20
  },
  cardFooter: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  }
})