import React from 'react';
import { View, StyleSheet, TouchableOpacity , Image} from 'react-native';
import AppText from './AppText'
function Card({title, subTitle, image, onPress}) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
       
            <Image style={styles.image} source={image}/>
            <View style={styles.cardtext}>
              <AppText>{title}</AppText>
              <AppText>{subTitle}</AppText>
            </View>

        
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card:{
        backgroundColor: "white",
        width: 350,
        height: 107,
        borderWidth: 0,
        borderColor: "aliceblue",
        borderRadius: 8,
        shadowColor: "grey",
        shadowOffset: {width: 6, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 20,
        marginBottom: 20,
        padding: 20,
    },
    image: {
        width: '20%',
        height: 70,
    },
    cardtext:{
        position: "absolute",
        left: 100,
        justifyContent: "center",
        paddingTop: 30
    }
})
export default Card;