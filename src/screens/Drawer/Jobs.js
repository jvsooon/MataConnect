import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { SafeAreaView, StatusBar, FlatList, View, StyleSheet, ActivityIndicator, TextInput, Text, Platform, LayoutAnimation, TouchableOpacity, ImageBackground, Linking, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MenuIcon from '../../assets/menu.svg';
import cheerio from 'cheerio'
import ModalDropdown from 'react-native-custom-modal-dropdown';
import { UserContext } from '../../contexts/UserContext'
import firebase from '../../../firebase'

var db = firebase.firestore();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const dropdownItems = [{ label: 'Students', value: 'Students', icon: () => (<MaterialIcons name="keyboard-arrow-right" size={18} color="#000" />), },
{ label: 'Staff & Management', value: 'Staff & Management', icon: () => (<MaterialIcons name="keyboard-arrow-right" size={18} color="#000" />), }];
const usuCareersUrl = 'https://phe.tbe.taleo.net/phe02/ats/careers/v2/searchResults?org=UNISTUDENTUNION&cws=38';
const staffManagementUrl = 'https://careers.pageuppeople.com/873/nr/en-us/listing/';
const baseManagementUrl = 'https://careers.pageuppeople.com';
const listTab = [{ status: "All" }, { status: "Last 7 days" }, { status: "Today" }], inactive = { color: '#000', name: 'briefcase-outline' }, active = { color: '#000', name: 'briefcase' };
const fieldsToRemove = ['latitude', 'category', 'longitude', 'id', '__CLASS__', 'salary_is_predicted', 'adref', 'contract_time', 'contract_type', 'redirect_url', 'description'];
const APP_ID = '9d8915a0', APP_KEY = 'a8c6b4137b485018a144b2df92b2c105';
const BASE_API_URL = 'https://api.adzuna.com/v1/api/jobs/us/search/';
const maxDays = 60, options = { headers: { Accept: 'application/json' } };

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

export default function Jobs({ navigation, route }) {
    const { state } = useContext(UserContext);
    var docRef = db.collection("users").doc(state.uid);
    const [filterStatus, setFilterStatus] = useState("All");
    const [tabStatus, setTabStatus] = useState('On-Campus');
    const [dropdownLabel, setDropdownLabel] = useState('On-Campus');
    const [pageNumber, setPageNumber] = useState(1);
    const [jobResults, setJobResults] = useState([]);
    const [filteredJobResults, setFilteredJobResults] = useState();
    const [endOfList, setEndOfList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [savedKeyword, setSavedKeyword] = useState();
    const [savedlocation, setSavedLocation] = useState();

    const Header = () => {
        return (
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity style={{ position: 'absolute', top: hp('1%'), zIndex: 1 }} onPress={() => navigation.toggleDrawer()} >
                    <MenuIcon style={{ marginLeft: wp('6%') }} width='30' height='30' />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: hp('2%') }}>Jobs</Text>
            </View>
        );
    }

    const scrapeUSUCareers = async () => {
        let data = [];
        const response = await fetch(usuCareersUrl).then(res => res.text());
        const $ = cheerio.load(response);

        const results = $('.oracletaleocwsv2-accordion-head-info').each(function (i, elem) {
            let job = {
                company: $(elem).find('div:nth-child(3)').text(),    // department
                jobType: 'student',
                location: $(elem).find('div:nth-child(2)').text(),
                title: $(elem).find('h4').text(),                    // position
                url: $(elem).find('a').attr('href')
            }
            data.push(job);
        });
        return data;
    }

    const scrapeManagementCareers = async () => {
        let data = [], temp = {};
        const response = await fetch(staffManagementUrl).then(res => res.text());
        const $ = cheerio.load(response);

        const results = $('#recent-jobs-content > tr').each(function (i, elem) {
            if (((i + 1) % 2) != 0) {
                temp = {
                    company: $(elem).find('td:nth-child(2)').text().trim(),    // division
                    jobType: 'staff',
                    location: 'Northridge',
                    title: $(elem).find('a').text(), // position
                    url: `${baseManagementUrl}${$(elem).find('a').attr('href')}`
                }
                data.push(temp);
            }
        });
        return data;
    }

    const handleDropdownClick = async (itemLabel) => {
        let results;
        setIsLoading(true);
        setDropdownLabel(itemLabel);
        tabStatus != 'On-Campus' ? setTabStatus('On-Campus'): null;
        itemLabel == 'Students' ? results = await scrapeUSUCareers() : results = await scrapeManagementCareers();
        setFilteredJobResults(results);
        setIsLoading(false);
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

    const handleJobIconClick = (iconState, setIconState, data) => {
        if (iconState.name == inactive.name) {
            iconState.color == inactive.color ? setIconState(active) : setIconState(inactive);
            pushJob(data);
            alert("Job info successfully saved to profile.")
        }
    }

    const pushJob = (job) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    savedJobs: arrayUnion(job)
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const JobIcon = ({ data }) => {
        const [iconState, setIconState] = useState(inactive);

        return (
            <TouchableOpacity onPress={() => handleJobIconClick(iconState, setIconState, data)}>
                <MaterialCommunityIcons name={iconState.name} size={hp('3.4%')} color={iconState.color} />
            </TouchableOpacity >
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

    const setTab = (status) => {
        setTabStatus(status);
        setDropdownLabel(status);
        setFilteredJobResults();
    }

    const setStatusFilter = (status) => {
        setIsLoading(true);
        let dataList = [], dateToday = new Date();
        if (jobResults != undefined) {
            if (status == "All") {
                dataList = jobResults;
            } else if (status == "Last 7 days") {
                let day = dateToday.getDate().toString();
                let yearMonth = dateToday.toISOString().substring(0, 8);
                for (let i = day - 7; i < day; i++) {
                    let temp = jobResults.filter(x => x.created.includes(`${yearMonth}${i.toString().length == 1 ? '0' + i : i}`))
                    dataList = [...dataList, ...temp];
                }
            } else if (status == "Today") {
                dateToday = dateToday.getDate().toString();
                dataList = jobResults.filter(x => { return x.created.includes(`-${dateToday.length == 2 ? dateToday : '0' + dateToday}T`); });
            }
            setFilterStatus(status);
            setFilteredJobResults(dataList);
            setIsLoading(false);
        }
    }

    const fetchJobData = async (keyword, location, page) => {
        return fetch(`${BASE_API_URL}${page}?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10&what=${keyword}&where=${location}&max_days_old=${maxDays}`, options)
            .then((res) => res.json())
            .then(data => data.results)
            .catch((err) => { console.log(err); setIsLoading(false); setIsMoreLoading(false); });
    }

    const getPage = (keyword, location) => {
        if (keyword != savedKeyword || location != savedlocation) {
            setIsLoading(true);
            return 1;
        }
        return pageNumber;
    }

    const getJobs = async (keyword, location) => {
        let page = getPage(keyword, location);
        let results = await fetchJobData(keyword, location, page);

        if (results.length > 0) {
            results.forEach((job) => {
                job['company'] = job['company']['display_name'];
                job['jobType'] = 'off-campus';
                job['location'] = job['location']['display_name'];
                job['title'] = job['title'].replace(/<[^>]+>/g, '');
                job['url'] = job['redirect_url']
                fieldsToRemove.forEach((x) => delete job[x]);
                delete job['location']['area'];
                delete job['location']['__CLASS__'];
                delete job['company']['__CLASS__'];
            });
            if (keyword == savedKeyword && location == savedlocation) {
                let temp = jobResults, tempJob = [...temp, ...results];
                setJobResults(tempJob);
                setFilteredJobResults(tempJob);
                setIsMoreLoading(false);
            } else {
                setJobResults(results);
                setFilteredJobResults(results);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
                setEndOfList(false);
            }
            setPageNumber(page + 1);
        } else {
            setIsMoreLoading(false);
            setEndOfList(true);
        }
    }

    const getMoreJobs = () => {
        if (tabStatus == 'Off-Campus' && filterStatus == 'All' && !endOfList) {
            setIsMoreLoading(true);
            getJobs(savedKeyword, savedlocation);
            setPageNumber(pageNumber + 1);
        }
    }

    const Form = () => {
        const [keyword, setKeyword] = useState('');
        const [location, setLocation] = useState('');

        const onFormSubmit = () => {
            if (keyword.length != 0 && location.length != 0) {
                getJobs(keyword, location);
                setSavedKeyword(keyword);
                setSavedLocation(location);
            } else alert('One or both input fields were left empty. Please fill in both fields to perform a job search.')
            setKeyword('');
            setLocation('');
        }

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Feather name="search" size={24} color='lightgrey' style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputField}
                        onChangeText={setKeyword}
                        value={keyword}
                        placeholder={"Job Title"}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="search" size={24} color='lightgrey' style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputField}
                        onChangeText={setLocation}
                        value={location}
                        placeholder={"Location"}
                        onSubmitEditing={() => onFormSubmit()}
                    />
                </View>
            </View>
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

    const renderFooter = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: hp('1%') }}>
                {isMoreLoading ? (
                    <ActivityIndicator size='large' color='grey' />
                ) : null}
            </View>
        );
    }

    useEffect(() => {
        const reset = navigation.addListener('blur', () => {
            setIsLoading(false);
            setFilterStatus('All');
            setPageNumber(1);
            setJobResults([]);
            setFilteredJobResults();
            setDropdownLabel('On-Campus');
            setEndOfList(false);
            setSavedKeyword();
            setSavedLocation();
            setFilterStatus('All');
            setTabStatus('On-Campus');
        })
        return reset;
    }, []);

    useLayoutEffect(() => {
        if(route.params != undefined){
            handleDropdownClick(route.params.section)
        }
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
                <Header />

                <View style={styles.tabSection}>
                    <DropDown />
                    <Tab tabName='Off-Campus' status={tabStatus === 'Off-Campus'} onPress={() => setTab('Off-Campus')} widthSize={(wp('100%') / 2) - 30} />
                </View>
                <View style={{ flex: 1 }}>
                    {tabStatus == 'Off-Campus' &&
                        <View>
                            <Form />
                            <View>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.topTabs}>
                                    {
                                        listTab.map((t, index) => (
                                            <Tab key={index} tabName={t.status} status={filterStatus === t.status} onPress={() => setStatusFilter(t.status)} widthSize={(wp('100%') / 2) - 50} />
                                        ))
                                    }
                                </ScrollView >
                            </View>
                        </View>
                    }
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
                                ListEmptyComponent={listEmptyComponent}
                                ListFooterComponent={renderFooter}
                                onEndReached={getMoreJobs}
                                onEndReachedThreshold={0.5} />)
                    }
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabSection: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'center',
    },
    searchIcon: {
        margin: hp('1%')
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    inputField: {
        flex: 1,
        fontSize: hp('2%'),
    },
    topTabs: {
        marginVertical: 10,
        marginHorizontal: 12,
        marginLeft: 18
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
        color: "#0f6de9"
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