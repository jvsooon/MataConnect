import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Button } from 'react-native'
import firebase from '../../../../firebase'

export default function Profile({ navigation }) {
    // Log out function
    const handleSignOutClick = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.reset({
                    routes: [{ name: 'Preload' }]
                });
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ?
                <StatusBar barStyle={'dark-content'} /> :
                <StatusBar />
            }
            {/* Raima your code goes inside this SafeAreaView 
                You can delete the View, Text and Button below once you start coding*/}
            <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
                <Text >Profile Page (Raima)</Text>
                <Button title='Log Out' onPress={handleSignOutClick} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});