import React, { useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, StyleSheet, Imagebackground, Image, Text, UIManager, Platform, LayoutAnimation, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import BackIcon from '../../assets/left-arrow.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome, FontAwesome5, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
// import MCLogo from '../../assets/Logo.png'

const inactive = { color: '#000', name: 'bookmark-o' }, active = { color: '#EFD258', name: 'bookmark' };
const resourcesData = [
    {
        id: 1,
        name: "Bayramian Hall",
        address: "Vincennes St, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-1200",
        status: "CLOSED",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
    {
        id: 2,
        name: "CSUN University Library",
        address: "18111 Nordhoff St, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-2285",
        status: "CLOSED",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
    {
        id: 3,
        name: "Arbor Grill",
        address: "N Garden Grove Ave, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-1200",
        status: "OPEN NOW",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
    {
        id: 4,
        name: "Campus Store",
        address: "18111 Nordhoff St, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-2932",
        status: "OPEN NOW",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
    {
        id: 5,
        name: "Banana Land",
        address: "Cardenia Ave, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-1211",
        status: "OPEN NOW",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
    {
        id: 6,
        name: "Sleepy Panda",
        address: "Grove Ave, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-1230",
        status: "OPEN NOW",
        hours: "Monday - Friday\n               10 a.m.-9:45 p.m."
    },
    {
        id: 7,
        name: "Quiet Town",
        address: "N Gnome Ave, Northridge,\nCA 91330",
        phoneNumber: "(818) 677-1200",
        status: "OPEN NOW",
        hours: "Monday - Friday\n               10 a.m.-2 p.m."
    },
]
//button 
const CustomButton = ({ title, onPress }) => {
    return (
        <LinearGradient
            colors={['#A5FAEA', '#8861F0']}
            style={styles.buttonBG}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{fontWeight: "bold", fontSize: hp('1.7%')}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const handleSaveClick = (iconState, setIconState) => {
    iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
}

const BookmarkButton = () => {
    const [iconState, setIconState] = useState(inactive);

    return (
        <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => handleSaveClick(iconState, setIconState)}>
            <FontAwesome name={iconState.name} size={24} color={iconState.color} />
        </TouchableOpacity>
    );
}

const Card = ({ title, subTitle, contact, status, hours}) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.create(
                    250,
                    LayoutAnimation.Types.easeInEaseOut,
                    LayoutAnimation.Properties.scaleXY
                ));
                setCollapsed(!collapsed)
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  
                    <Text style={{ fontSize: 20, fontWeight: '700' }}> {title.split(':')[0]}</Text>

                    <View style={{flexDirection: 'row', padding: 5}} >
                        <FontAwesome5 name="map-marker-alt" size={17} color="black" />
                        <Text style={{ fontSize: 17 }}> {subTitle}</Text>
                    </View>
                    <View style={{flexDirection: 'row', padding: 5}} >
                        <Feather name="phone-call" size={17} color="black" />
                        <Text style={{ fontSize: 17, marginBottom:3 }}> Phone: {contact}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', position: 'relative', top: 38}} >
                <View style={{position:'relative', top: 0}}>
                <BookmarkButton/>
                </View>
                <SimpleLineIcons name="options-vertical" size={20} color="black" />

                </View>
            </View>
            {collapsed && <View >
                <Text style={{ fontSize: 17, marginLeft: 8 }}>STATUS: {status}</Text>
                <Text style={{ fontSize: 17, marginLeft: 8 }}>HOURS: {hours}</Text>
                <View style={styles.cardFooter}>
                    <CustomButton title="Google map" />
                </View>
            </View>
            }
        </TouchableOpacity>
    )
}

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.toggleDrawer()} >
            <Ionicons style={{position: 'absolute',left: 20, top: -18}} name="ios-arrow-back" size={35} color="black" />
            {/* <Ionicons style={{position: 'absolute',left: 380}} name="ios-notifications" size={30} color="black" /> */}
                {/* <BackIcon style={{ marginLeft: wp('25%')}} width='30' height='30' /> */}
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons style={{position: 'absolute', right: 20, top: -11}}name="ios-notifications" size={30} color="black" />
            <Text style={{position: 'absolute', left: -13, top: -10, fontWeight: 'bold', fontSize: hp('2.5%') }}>MC</Text>
            </View>
        </View>
    )
}
export default class resources extends React.Component {
    constructor() {
        super()
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    renderItem = ({ item }) => {
        return (
            <Card title={item.name} subTitle={item.address} contact={item.phoneNumber} hours={item.hours} status={item.status} />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <View source={MCLogo} /> */}
                {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
                <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
                    <Header />
                    <LinearGradient
                       colors={['#A5FAEA', '#8861F0']}
                            style={styles.headerBox}>
                                <View style={{flexDirection: 'row'}}>
                                   <Text style={{fontWeight: "bold", fontSize: hp('2.2%')}}>Resources </Text>
                                   <FontAwesome name="building" size={20} color="black" />
                                </View>
              
                    </LinearGradient>
                    <View style={styles.topTabs}>
                        <CustomButton title="A-Z" />
                        <CustomButton title="Open Now" />
                    </View>

                    <FlatList
                        data={resourcesData}
                        renderItem={this.renderItem}
                        keyExtractor={(resourcesData) => resourcesData.id.toString} />
                </ImageBackground>
            </SafeAreaView>
        )
    ;
 } 

} 



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBG: {
        height: 40,
        width: 190,
        borderRadius: 7,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        alignItems: 'center',
        justifyContent:'center'
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        width: 90
    },
    topTabs: {
        marginRight: 8,
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20
    },
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
    },
    card: {
        color: '#A5FAEA',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 25,
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62
    },
    headerBox: {
        // position: 'absolute',
        // top: 45,
        height: 50,
        width: '100%',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent:'center'

    }
})

// import React from 'react'
// import { View, Text } from 'react-native'

// export default function CampusResources() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Campus Resources Screen</Text>
//         </View>
//     );
// }