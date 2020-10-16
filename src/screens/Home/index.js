import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { Container, CustomButton, CustomButtonText } from './styles'
import firebase from '../../../firebase'
import { useNavigation } from '@react-navigation/native';
const db = firebase.firestore();

import { UserContext } from '../../contexts/UserContext';

export default function index({ route }) {
    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);

    useEffect(() => {
        db.collection("users").doc("SF").get().then((user) => {

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, []);

    const handleSignOutClick = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                navigation.reset({
                    routes: [{ name: 'Preload' }]
                });
            });
    }

    return (
        <Container>
            <Text style={{fontSize: 18}}>Welcome {user.name}</Text>
            <CustomButton onPress={handleSignOutClick}>
                <CustomButtonText>Log Out</CustomButtonText>
            </CustomButton>
        </Container>
    )
}
