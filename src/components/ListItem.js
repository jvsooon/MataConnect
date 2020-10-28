import React from 'react'
import { View, Text, Image, StyleSheet, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ListItem() {
    return (
        <View style={styles.item}>
            {/* <View style={styles.shadow}> */}
            <Image style={styles.tinyLogo} source={{ uri: 'https://snack.expo.io/web-player/39/static/media/react-native-logo.79778b9e.png' }} />
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        // margin: Platform.OS == 'ios' ? hp('1.2%') : hp('.8%'),
        // marginLeft: wp('2%'),
        marginRight: wp('3%'),
        width: 120,
        height: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'red',
        borderRadius: 10
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    tinyLogo: {
        borderRadius: 10,
        // resizeMode: 'cover',
        width: '100%',
        height: '100%',

    },
});