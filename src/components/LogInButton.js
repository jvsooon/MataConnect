import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function LogInButton({title, onPress}) {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "88%",
        height: 50,
        backgroundColor: "#fff",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        shadowOffset: {width: 1, height: 10},
        shadowColor: "#271B46",
        shadowOpacity: .15,
        shadowRadius: 8,
        marginTop: 10
    },
    text: {
        color: "#2E3862",
        fontSize: 23,
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 8
    }
})

export default LogInButton;