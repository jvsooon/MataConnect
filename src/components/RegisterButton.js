import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function RegisterButton({title, onPress}) {
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
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 30,
        shadowOffset: {width: 1, height: 10},
        shadowColor: "#271B46",
        shadowOpacity: .15,
        shadowRadius: 8,
    },
    text: {
        color: "#2E3862",
        fontSize: 23,
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 10
    }
})

export default RegisterButton;