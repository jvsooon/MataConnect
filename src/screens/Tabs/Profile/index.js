import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Button, SafeAreaView, ImageBackground } from 'react-native'
import firebase from '../../../../firebase'
import RegisterButton from './components/RegisterButton';
import LogInButton from './components/LogInButton';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile({ navigation }) {
    // Log out function
    const handleSignOutClick = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.reset({
                    routes: [{ name: 'Preload' }]
                });
            });
    }

    return (
        <View style={styles.container1}>
            <ImageBackground 
            source={require("./assets/ProfileBackgroundImg.png")}
            style={styles.backgroundImg}
            >
                <SafeAreaView style={{opacity: 0}} />
                <View style={styles.container2}>
                    <View style={styles.profilePicture}>
                        <MaterialCommunityIcons style={styles.pencil} name="pencil" size={24} color="#2E3862" />
                    </View>
                    <Text style={styles.textProfilePic}>Sammana Kabir</Text>
                </View>
                <View style={{position: "relative", top: 110}}>
                    <View style={styles.squareContainer}>
                        <View style={styles.squares}>
                            <MaterialCommunityIcons name="bookmark" size={38} color="#6D8AEB" />
                            <Text style={styles.textCards}>Bookmarks</Text>
                        </View>
                        <View style={styles.squares}>
                            <AntDesign name="heart" size={35} color="#ED6F63" />
                            <Text style={styles.textCards}>Saved Events</Text>
                        </View>
                        <View style={styles.squares}>
                            <Entypo name="suitcase" size={35} color="#636363" />
                            <Text style={styles.textCards}>Saved Jobs</Text>
                        </View>
                    </View>
                    <View style={styles.squareContainer2}>
                        <View style={styles.squares}>
                            <Foundation name="clipboard-notes" size={40} color="" style={styles.icons}/>
                            <Text style={styles.textCards}>Notes</Text>
                        </View>
                        <View style={styles.squares}>
                            <MaterialIcons name="settings" size={40} color="#5A7A84" style={styles.icons}/>
                            <Text style={styles.textCards}>Settings</Text>
                        </View>
                        <View style={styles.squares}>
                            <FontAwesome5 name="award" size={40} color="#EDB357" />
                            <Text style={styles.textCards}>Interests</Text>
                        </View>
                    </View>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangles}>
                            <Text style={styles.textRectangleCards}>Enrolled Events</Text>
                            <View style={styles.eventCount}>
                                <View>
                                    {/* The number here is a value count determined by user's saved event database */}
                                    <Text style={styles.textRectangleCardsSub}>10</Text>
                                    <Text style={styles.textRectangleCardsSub}>RSVP</Text>
                                </View>
                                <View>
                                    <Text style={styles.textRectangleCardsSub}>5</Text>
                                    <Text style={styles.textRectangleCardsSub}>Tickets</Text>
                                </View>
                            </View>
                        </View>
                        {/* Events attended today and in the past */}
                        <View style={styles.rectangles}>
                        <Text style={styles.textRectangleCards}>Current and Past Events</Text>
                            <View style={styles.eventCount}>
                                <View>
                                    {/* The number here is a value count determined by user's saved event database */}
                                    <Text style={styles.textRectangleCardsSub}>2</Text>
                                    <Text style={styles.textRectangleCardsSub}>Today</Text>
                                </View>
                                <View>
                                    <Text style={styles.textRectangleCardsSub}>18</Text>
                                    <Text style={styles.textRectangleCardsSub}>Past</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.profileButton}>
                        <RegisterButton title="Edit Profile" onPress={() => console.log("yes")}></RegisterButton>
                        <LogInButton title="Logout"></LogInButton>
                    </View>
                </View>
                <SafeAreaView style={{opacity: 0}} />
            </ImageBackground>
       </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
    container2: {
        position: "absolute", 
        top: 80,
        left: 135,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        overflow: "hidden",
    },
    profilePicture: {
        backgroundColor: "#fff",
        borderRadius:100,
        width: 150,
        height: 150,
        shadowOffset: {width: 1, height: 10},
        shadowColor: "#271B46",
        shadowOpacity: .15,
        shadowRadius: 8,
        elevation: 20,
    },
    pencil: {
        marginTop: 10,
        marginLeft: 118
    },
    squareContainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    squareContainer2: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        top: 25,
    },
    rectangleContainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        top: 50,
    },
    profileButton: {
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        top: 75,
    },
    textProfilePic: {
        color: "#2E3862",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 10
    },
    textCards: {
        color: "#2E3862",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        paddingTop: 12
    },
    textRectangleCards: {
        color: "#2E3862",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 12
    },
    textRectangleCardsSub: {
        color: "#2E3862",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingTop: 2
    },
    squares: {
        backgroundColor: "#fff",
        borderRadius:20,
        width: 100,
        height: 100,
        shadowOffset: {width: 1, height: 10},
        shadowColor: "#271B46",
        shadowOpacity: .15,
        shadowRadius: 8,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    rectangles: {
        backgroundColor: "#fff",
        opacity: .9,
        borderRadius:20,
        width: 170,
        height: 120,
        shadowOffset: {width: 1, height: 10},
        shadowColor: "#271B46",
        shadowOpacity: .15,
        shadowRadius: 8,
        elevation: 20,
        justifyContent: "space-evenly"
    },
    eventCount: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        paddingBottom: 10
    },
    icons: {
        position: "relative",
        top: 3
    }
});