import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons} from "@expo/vector-icons";
function Icon({
    name,
    size,
    backgroundColor ,
    iconColor ,
    onPress
}) {
    return (
      <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name={name} size={45 * 0.5} color={iconColor} onPress={onPress}/>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    icon:{
        width: 45,
        height: 45,
        backgroundColor: "white",
        borderRadius: 5,
        width: 50,
        height: 50,
        elevation: 10,
        shadowColor: "grey",
        shadowOffset: {width: 2, height: 2 },
        shadowOpacity: 1,
        marginLeft: 30,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Icon;