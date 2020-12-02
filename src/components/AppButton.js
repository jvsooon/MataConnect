import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
function AppButton({title, onPress}) {
    return (
     <>
    {/* <TouchableOpacity style={styles.button}  onPress={onPress}> */}
    <LinearGradient
    colors={['#A5FAEA', '#6EC8F5']} style={styles.button}  onPress={onPress} >
    <Text style={styles.text}>{title}</Text>
    </LinearGradient>
    {/* </TouchableOpacity> */}
    </>

    );
}

const styles = StyleSheet.create({
   button:{
       backgroundColor:"paleturquoise",
       borderRadius: 10,
       justifyContent: "center",
       alignContent:  "center",
       paddingHorizontal: 10,
       paddingLeft: 13,
       elevation: 20,
       shadowColor: "grey",
       shadowOffset: {width: 2, height: 2 },
       shadowOpacity: 1,
       width: '22%',
       height: 31,
       marginLeft: 10
   },
   size:{
    width: '100%',
    height: 31, 
   },
   text:{
       color: "black",
       fontSize: 11,
       textTransform: "capitalize",
       fontWeight: "bold",
       alignContent: "center",
       justifyContent: "center",
   } 
})

export default AppButton;