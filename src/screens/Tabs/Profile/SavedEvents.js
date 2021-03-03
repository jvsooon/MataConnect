import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../contexts/UserContext';
import firebase from '../../../../firebase';

var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

export default function SavedEvents() {
    const [events, setEvents] = useState([]);
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);

    const getEvents = () => {
        docRef.get().then((doc) => {
            let hasEvents = doc.data().savedEvents;
            if(hasEvents == undefined)
                console.log("No saved events");
            else 
                setEvents(hasEvents);
        })        
    };

    const pushEvent = (event) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    savedEvents: arrayUnion(event)
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    };

    const deleteEvent = (event) => {
        var index = events.findIndex(function(item){
            return item.dtstart === event.dtstart;
          });
          events.splice(index, 1);
          docRef.update({
            savedEvents: events
          });
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>
    )
}
