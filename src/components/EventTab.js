import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function EventTab({ tabName, status, onPress }) {
    return (
        <View style={styles.shadow}>
            <LinearGradient
                colors={['#A5FAEA', '#6EC8F5']}
                style={[styles.buttonBG, styles.shadow]}>
                <TouchableOpacity style={[styles.button, status == true && styles.buttonTabActive]} onPress={onPress}>
                    <Text style={[styles.label, status == true && styles.labelActive]}>{tabName}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonBG: {
        height: 30,
        width: 90,
        borderRadius: 10
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 7,
        width: 90
    },
    buttonTabActive: {
        backgroundColor: "#ffffff",
    },
    label: {
        fontWeight: "bold",
        color: "#000000"
    },
    labelActive: {
        color: "#0f6de9"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        elevation: 6
    }
})