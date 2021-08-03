import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, LayoutAnimation, Linking } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import EventsButton from './EventsButton';
import {UserContext} from '../contexts/UserContext'
import firebase from '../../firebase'
const inactive = { color: '#000', name: 'star-o' }, active = { color: '#63C2D1', name: 'star' };
var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

export default function EventCard({ event, saveHandler, saveToEventsHandler, disabled, buttonTitle }) {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [collapsed, setCollapsed] = useState(false);

    const handleSaveClick = (iconState, setIconState) => {
        if (disabled == false) {
            iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
            const data = {
                title: event.title,
                date: event.date,
                imgSrc: event.imgSrc,
                description: event.description,
                eventLink: event.eventLink,
                dtstart: event.dtstart,
                hasRSVP: event.hasRSVP
            }
            saveToEventsHandler(data)
            disabled = true
            alert("Event successfully saved to profile")
        } 
    }

    const handleRSVPClick = (event) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    enrolledEvents: arrayUnion(event)
                });
                alert("Event successfully saved to profile")
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const StarButton = () => {
        const [iconState, setIconState] = useState(inactive);

        return (
            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => handleSaveClick(iconState, setIconState)}>
                <FontAwesome name={iconState.name} size={24} color={iconState.color} />
            </TouchableOpacity>
        );
    }

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
                <Image source={{ uri: event.imgSrc }} style={{ width: 80, height: 80, borderRadius: 10, margin: 10 }} />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>{event.title.split(':')[0]}</Text>
                    <Text style={{ fontSize: 16 }}>{event.date}</Text>
                </View>
                {!disabled && <StarButton />}
            </View>
            {collapsed && <View >
                <Text style={{ margin: 10 }}>{event.description.split('.')[0]}</Text>
                <View style={styles.cardFooter}>
                    <EventsButton title={buttonTitle} onPress={() => disabled == false ? saveHandler(event.title, event.description) : saveHandler(event)} />
                    {event.hasRSVP == true && <EventsButton title="RSVP" onPress={() => handleRSVPClick(event)} />}
                    <EventsButton title="Website" onPress={() => Linking.openURL(event.eventLink)} />
                </View>
            </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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