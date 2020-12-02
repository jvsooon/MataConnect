import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
function AppText({children}) {
    return (
        <Text style= {styles.text}>{children}</Text>
    );
}
const styles = StyleSheet.create({
    text:{
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 14,
        fontWeight: "bold",
    }
})
export default AppText;