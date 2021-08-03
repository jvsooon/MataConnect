import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, StyleSheet, ActivityIndicator, Text, Platform, Alert, LayoutAnimation, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-custom-modal-dropdown';
import { UserContext } from '../../../contexts/UserContext'
import firebase from '../../../../firebase'

var db = firebase.firestore();

const Tab = ({ tabName, status, onPress, widthSize }) => {
    return (
        <View style={styles.shadow}>
            <LinearGradient
                colors={['#A5FAEA', '#9087f5']}
                style={[styles.buttonBG, styles.shadow, { width: widthSize, borderRadius: 10 }]}>
                <TouchableOpacity style={[styles.button, status == true && styles.buttonTabActive]} onPress={onPress}>
                    <Text style={[styles.label, status == true && styles.labelActive]}>{tabName}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const CardButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardButtonBG} onPress={onPress}>
            <LinearGradient
                colors={['#A5FAEA', '#9087f5']}
                style={styles.cardButton}>
                <Text style={{ fontWeight: 'bold', fontSize: hp('1.75%'), marginHorizontal: hp('1.75%') }}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default function SavedJobs({ navigation }) {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [jobResults, setJobResults] = useState([]);
    const [filteredJobResults, setFilteredJobResults] = useState();
    const [tabStatus, setTabStatus] = useState('On-Campus');
    const [dropdownLabel, setDropdownLabel] = useState('On-Campus');
    const [isLoading, setIsLoading] = useState(false);


    const setStatusFilter = (status) => {
        setIsLoading(true);
        let dataList = [];
        if (jobResults != undefined) {
            if (status == "Students") {
                dataList = jobResults.filter(x => x.jobType == 'student');
            } else if (status == "Staff & Management") {
                dataList = jobResults.filter(x => x.jobType == 'staff');
            } else {
                dataList = jobResults.filter(x => x.jobType == 'off-campus');
            }
            setFilteredJobResults(dataList);
            setIsLoading(false);
        }
    }

    const handleDropdownClick = (itemLabel) => {
        setTabStatus('On-Campus')
        setDropdownLabel(itemLabel);
        setStatusFilter(itemLabel);
        // setCollapsed(!collapsed);
    }

    const handleOffTabClick = (status) => {
        setTabStatus(status);
        setStatusFilter(status);
        setDropdownLabel('On-Campus');
    }

    const DropDown = () => {
        return (
            <View style={[styles.shadow]}>
                <LinearGradient
                    colors={['#A5FAEA', '#9087f5']}
                    style={[styles.buttonBG, styles.shadow, { width: wp('100%') / 2 - 30, alignItems: 'center', justifyContent: 'center' }]}>
                    <ModalDropdown
                        defaultValue={dropdownLabel}
                        options={['Students', 'Staff & Management']}
                        onSelect={(index, value) => handleDropdownClick(value)}
                        style={[{ width: wp('100%') / 2 - 30, height: 30, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }, tabStatus == 'On-Campus' && styles.buttonTabActive]}
                        textStyle={[{ fontSize: 14, fontWeight: 'bold', color: 'black', borderRadius: 10 }]}
                        dropdownStyle={[{ width: wp('100%') / 2 - 30, borderRadius: 10, marginTop: 3 }, styles.shadow]}
                        dropdownTextStyle={{ fontWeight: 'bold' }}
                    />
                </LinearGradient>
            </View>
        );
    }

    const JobIcon = ({ data }) => {
        return (
            <TouchableOpacity onPress={() => unsaveEventAlert(data)}>
                <MaterialCommunityIcons name="briefcase" size={hp('3.4%')} color="black" />
            </TouchableOpacity>
        );
    }

    const Card = ({ jobInfo }) => {
        const [collapsed, setCollapsed] = useState(false);
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.create(
                        250,
                        LayoutAnimation.Types.easeInEaseOut,
                        LayoutAnimation.Properties.scaleXY
                    ));
                    setCollapsed(!collapsed);
                }}>
                <View style={{ flexDirection: 'column', margin: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.cardCompany}>{jobInfo.company}</Text>
                            <Text style={styles.cardTitle}>{jobInfo.title}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                                <MaterialIcons style={{ marginTop: 2, marginRight: 3 }} name="room" size={hp('1.8%')} />
                                <Text style={[styles.cardLocation, { width: '90%' }]}  >{jobInfo.location}</Text>
                            </View>
                        </View>
                        <JobIcon data={jobInfo} />
                    </View>
                    {collapsed &&
                        <View >
                            <View style={styles.cardFooter}>
                                <CardButton title="View Posting" onPress={() => Linking.openURL(jobInfo.url)} />
                            </View>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <Card jobInfo={item} />
        );
    }

    const listEmptyComponent = () => {
        return (
            <View style={styles.emptyBox} >
                <Text style={styles.empty}>No Jobs</Text>
            </View>
        );
    }

    const getSavedJobs = () => {
        docRef.get().then((doc) => {
            let hasSavedJobs = doc.data().savedJobs;
            if (hasSavedJobs == undefined)
                console.log("No saved jobs");
            else {
                const data = hasSavedJobs.map((i, index) => ({
                    title: hasSavedJobs[index].title,
                    company: hasSavedJobs[index].company,
                    jobType: hasSavedJobs[index].jobType,
                    location: hasSavedJobs[index].location,
                    url: hasSavedJobs[index].url
                }));
                setJobResults(data);
            }
        })
    }

    const deleteJob = (job) => {
        var index = jobResults.findIndex(function (item) {
            return item.url === job.url;
        });
        const jobToRemove = jobResults.splice(index, 1);
        const data = jobResults.filter(x => x != jobToRemove);
        setJobResults(data)
        docRef.update({
            savedJobs: data
        });
        if (tabStatus == 'On-Campus')
            setStatusFilter(dropdownLabel);
        else setStatusFilter('Off-Campus')
    }

    const unsaveEventAlert = (job) => {
        Alert.alert(
            "Unsave Job?",
            "This job will be removed from your saved jobs.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Canceled"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => deleteJob(job) }
            ],
            { cancelable: false }
        );
    }

    useEffect(() => {
        getSavedJobs();
        const reset = navigation.addListener('blur', () => {
            setJobResults([]);
            setFilteredJobResults();
            setTabStatus('On-Campus');
            setDropdownLabel('On-Campus');
            setIsLoading(false);
        })
        return reset;
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                <View style={styles.tabSection}>
                    <DropDown />
                    <Tab tabName='Off-Campus' status={tabStatus === 'Off-Campus'} onPress={() => handleOffTabClick('Off-Campus')} widthSize={(wp('100%') / 2) - 30} />
                </View>
                {isLoading == true ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='grey' />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), alignSelf: 'center' }}>Loading</Text>
                    </View>
                    :
                    (filteredJobResults &&
                        <FlatList
                            data={filteredJobResults}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={listEmptyComponent} />)
                }
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabSection: {
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'center',
    },
    buttonBG: {
        height: 30,
        borderRadius: 10,
        marginHorizontal: 7,
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 7,
    },
    buttonTabActive: {
        backgroundColor: "#ffffff",
    },
    label: {
        fontWeight: "bold",
        color: "#000000"
    },
    labelActive: {
        // color: "#0f6de9"
    },
    shadow: {
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
    },
    emptyBox: {
        height: hp('75%'),
        justifyContent: "center"
    },
    empty: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 26
    },
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
    },
    card: {
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
    cardCompany: {
        fontWeight: Platform.OS === 'ios' ? '600' : '700',
        fontSize: hp('2%'),
        marginTop: 1,
        marginBottom: 1
    },
    cardTitle: {
        fontWeight: Platform.OS === 'ios' ? '600' : '700',
        fontSize: hp('2.2%'),
        marginTop: 1,
        marginBottom: 1
    },
    cardLocation: {
        fontWeight: Platform.OS === 'ios' ? '600' : '700',
        fontSize: hp('2%'),
        marginTop: 1,
        marginBottom: 1
    },
    cardFooter: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10
    },
    cardButtonBG: {
        height: hp('3.6%'),
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        marginTop: 10
    },
    cardButton: {
        borderRadius: 10,
        padding: 5
    }
});
