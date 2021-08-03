import React, { useEffect, useContext } from 'react'
import { Container, Logo, CustomButton, CustomButtonText, WelcomeText, ButtonContainer } from './styles';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import 'firebase/firestore';
import MCLogo from '../../assets/Logo.png'
import ical from 'cal-parser'
import cheerio from 'cheerio'
import { UserContext } from '../../contexts/UserContext';
import { CalendarEvents } from '../../utils';

const usuImageUrl = "https://live.staticflickr.com/3948/buddyicons/149217749@N02_r.jpg?1491936417#149217749@N02",
    csunIcalUrl = 'https://www.csun.edu/feeds/ics/events/9321/calexport.ics/2021',
    unusedFields = ['created', 'dtstamp', 'last-modified', 'uid', 'location', 'summary', 'url'];

export default function Index() {
    const navigation = useNavigation();
    const { authContext } = useContext(UserContext);

    const handleLoginClick = async () => {
        navigation.reset({ routes: [{ name: 'Login' }] });
    }

    const handleSignUpClick = () => {
        navigation.reset({ routes: [{ name: 'SignUp' }] });
    }

    const getEvents = () => {
        var request = new XMLHttpRequest();
        request.open('GET', csunIcalUrl, true);
        request.send(null);
        request.onreadystatechange = async function () {
            if (request.readyState !== 4) return;
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf('text') !== 1) {
                    var lines = request.responseText;

                    const parsed = ical.parseString(lines);
                    var data = parsed.events;

                    for (const x of data) {
                        x["title"] = x["summary"].value;

                        x["eventLink"] = x["url"].value;

                        // Fetch image cover from event url
                        const response = await fetch(x["url"].value).then(res => res.text());
                        const $ = cheerio.load(response);
                        const urlElems = $('img')
                        if (urlElems.length == 0 || urlElems.length == 1) x["imgSrc"] = usuImageUrl;
                        else x["imgSrc"] = urlElems[urlElems.length - 1].attribs.src;

                        // Assign value to field to remove nesting and format dtsart and dtend to match "yyyy-mm-dd hh:mm-ss"
                        let dtstartParts = JSON.stringify(x["dtstart"].value).replace("\"", "").replace("\"", "").split("T");
                        x["dtstart"] = `${dtstartParts[0]} ${(dtstartParts.length > 1 ? dtstartParts[1].replace(".000Z", "") : "")}`;
                        let dtendParts = JSON.stringify(x["dtend"].value).replace("\"", "").replace("\"", "").split("T");
                        x["dtend"] = `${dtendParts[0]} ${(dtendParts.length > 1 ? dtendParts[1].replace(".000Z", "") : "")}`;

                        // Remove unwanted characters from description
                        let desc_parts = x["description"].value.split("[1]")
                        let new_description = ""
                        if (desc_parts.length > 2) {
                            // Combine parts not including links from end of description
                            new_description = desc_parts[0] + "[1] " + desc_parts[1]

                            // Cleanup combined description string
                            new_description = new_description.replace(/[/\*]/g, " ")
                            // new_description.replace("\\", " ")
                            new_description.replace(/\[2\]/g, "[2] ")

                            // Combine description with links
                            new_description += "[1]" + desc_parts[2]
                        } else {
                            new_description = desc_parts[0].replace(/[/\*]/g, " ")
                            new_description.replace(/\[2\]/, "[2] ")
                        }
                        // new_description = new_description.replace(/[/\*]/g, " ")

                        new_description = new_description.replace(/\s+/g, " ")
                        new_description = new_description.replace(/ \,/g, ",")
                        new_description = new_description.replace(/ \!/, "!")
                        new_description = new_description.replace(/ \./, ".")
                        x["description"] = new_description;
                        // Continue checking descriptions to see what we need to add or remove from the regex expressions

                        // Delete unused fields
                        unusedFields.forEach((field) => delete x[field]);
                    }
                    console.log(data.length)
                    authContext.saveEvents(data);
                }
            } else {
                authContext.saveEvents(CalendarEvents);
            }
        };
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <LinearGradient
                // colors={['#21537D', '#56C8B7']}
                colors={['#A5FAEA', '#6EC8F5']}
                style={{
                    position: 'absolute',
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '104%'
                }} />

            <Logo source={MCLogo} />

            <ButtonContainer>
                <CustomButton onPress={handleLoginClick}>
                    <CustomButtonText style={{ color: '#2E3862' }}  >Login</CustomButtonText>
                </CustomButton>
                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText style={{ color: '#2E3862' }} >Register Now</CustomButtonText>
                </CustomButton>
            </ButtonContainer>

            <WelcomeText>Welcome to MataConnect</WelcomeText>
        </Container>
    );
}