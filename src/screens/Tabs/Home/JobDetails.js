import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, StatusBar, ImageBackground, Text, Linking, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'
import cheerio from 'cheerio'
import 'intl';
import 'intl/locale-data/jsonp/en';

let url1 = 'https://phe.tbe.taleo.net/phe02/ats/careers/v2/viewRequisition?org=UNISTUDENTUNION&cws=38&rid=1002';
const formatOptions = { month: "long", day: "numeric", year: "numeric" };

const MoreButton = ({ btnTitle, widthSize, url }) => {
    return (
        <View style={styles.shadow}>
            <LinearGradient
                colors={['#A5FAEA', '#9087f5']}
                style={[styles.button, { width: widthSize }]}>
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                    <Text style={styles.bold}>{btnTitle}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

export default function JobDetails({ navigation, route }) {
    const [jobInfo, setJobInfo] = useState();

    const getJobData = async (url) => {
        let response = await fetch(url)
            .then(res => res.text())
            .catch(err => console.log(err))
        const $ = cheerio.load(response);

        let title = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-4 > div > strong')
            .text().trim();

        let location = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-4 > div > div.row > div > strong')
            .text().trim();

        let category = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > section:nth-child(2) > div')
            .text().split(', ')[0].trim();

        let payRate = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > section:nth-child(1) > div > div:nth-child(3) > div.col-sm-6.col-sm-3.cws-V2-reqfieldcell.cws-V2-reqfieldcell-left')
            .text();

        let dateRange = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > section:nth-child(1) > div > div:nth-child(5) > div.col-sm-6.col-sm-3.cws-V2-reqfieldcell.cws-V2-reqfieldcell-left')
            .text().split(' - ');
        let datePosted = new Intl.DateTimeFormat("en-US", formatOptions).format(new Date(dateRange[0]))
        let deadline = new Intl.DateTimeFormat("en-US", formatOptions).format(new Date(dateRange[1]))

        // let description = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > div.col-xs-12.col-sm-12.col-md-8.row > div > p:nth-child(4)')
        //     .text();
        // let des = $('p:contains("Description")').next().text()
        // console.log(des)

        // let duties = [];
        // let dutyElements = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > div.col-xs-12.col-sm-12.col-md-8.row > div > ul:nth-child(6) > li')
        //     .each(function (i, elem) {
        //         duties.push($(elem).text());
        //     })

        // let qualification = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > div.col-xs-12.col-sm-12.col-md-8.row > div > ul:nth-child(9)')
        //     .text().trim()

        // let experience = [];
        // let experienceElements = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > div.col-xs-12.col-sm-12.col-md-8.row > div > ul:nth-child(13)')
        //     .each(function (i, elem) {
        //         experience.push($(elem).text().trim());
        //     })

        // let skills = [];
        // let skillElements = $('#oracletaleocwsv2-wrapper > section:nth-child(2) > div > div.row > div.col-xs-12.col-sm-12.col-md-8 > div.col-xs-12.col-sm-12.col-md-8.row > div > ul:nth-child(15)')
        //     .each(function (i, elem) {
        //         skills.push($(elem).text().trim());
        //     })

        let jobInfo = {
            title,
            location,
            category,
            payRate,
            datePosted,
            deadline,
            url
            // description,
            // duties,
            // qualification,
            // experience,
            // skills
        }
        setJobInfo(jobInfo);
    }

    useEffect(() => {
        getJobData(route.params);
        const reset = navigation.addListener('blur', () => {
            setJobInfo();
        })
        return reset;
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1 }}>
                {jobInfo ?
                    <View style={styles.containerMargin}>
                        <Text style={[styles.title, styles.bold]}>{jobInfo.title}</Text>
                        <Text style={[styles.text, styles.bold]}>CSUN - {jobInfo.location}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons style={{ marginVertical: hp('2%') }} name="room" size={hp('2.4%')} />
                            <Text style={[styles.bold, styles.text]} >University Student Union</Text>
                        </View>
                        <Text style={styles.text}><Text style={styles.bold}>Category: </Text>{jobInfo.category}</Text>
                        <Text style={styles.text}><Text style={styles.bold}>Pay: </Text>{jobInfo.payRate}</Text>
                        <Text style={styles.text}><Text style={styles.bold}>Date Posted: </Text>{jobInfo.datePosted}</Text>
                        <Text style={styles.text}><Text style={styles.bold}>Deadline: </Text>{jobInfo.deadline}</Text>

                        {/* <Text style={[styles.bold, styles.text]}>Description:</Text>
                        <Text style={styles.text}>{jobInfo.description}</Text>
                        <Text style={[styles.bold, styles.text]}>Duties:</Text>
                        {jobInfo.duties.map((i, index) => (
                            <RenderItem key={index} item={i} />
                        ))}
                        <Text style={[styles.bold, styles.text]}>Qualifications:</Text>
                        <Text style={[styles.bold, styles.text, styles.innerSpacing]}>Education</Text>
                        <Text style={[styles.text, styles.innerSpacing]}>{jobInfo.qualification}</Text>
                        <Text style={[styles.bold, styles.text, styles.innerSpacing]}>Experience</Text>
                        {jobInfo.experience.map((i, index) => (
                            <RenderItem key={index} item={i} />
                            ))}
                        <Text style={[styles.bold, styles.text]}>Knowledge, Skills & Abilities</Text>
                        {jobInfo.skills.map((i, index) => (
                            <RenderItem key={index} item={i} />
                            ))} */}
                        <MoreButton btnTitle="Learn More" widthSize={wp('100%') / 3} url={jobInfo.url} />
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='grey' />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), alignSelf: 'center' }}>Loading</Text>
                    </View>
                }
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMargin: {
        marginHorizontal: wp('6%'),
    },
    bold: {
        fontWeight: 'bold',
    },
    title: {
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        fontSize: Platform.OS == 'ios' ? hp('3%') : hp('2.6%'),
    },
    text: {
        fontSize: hp('2.4%'),
        marginVertical: hp('2%')
    },
    itemSpacing: {
        marginVertical: hp('1%'),
    },
    innerSpacing: {
        marginHorizontal: wp('3%')
    },
    shadow: {
        alignItems: 'center',
        marginVertical: hp('2%'),
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
    },
    button: {
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})