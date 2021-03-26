import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function EventsButton({title, onPress}) {
    return (
        <LinearGradient
            colors={['#A5FAEA', '#6EC8F5']}
            style={styles.buttonBG}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
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
    }
})