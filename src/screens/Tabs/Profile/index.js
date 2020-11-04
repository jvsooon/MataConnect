import React from 'react'
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native'
import firebase from '../../../../firebase'

export default function Profile() {
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
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Raima your code goes inside this SafeAreaView */}
            <Text>Profile Page (Raima)</Text>   
            <Button title='Log Out' onPress={handleSignOutClick} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});