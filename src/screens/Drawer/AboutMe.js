import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import cheerio from 'cheerio'

const usuCareersUrl = 'https://phe.tbe.taleo.net/phe02/ats/careers/v2/searchResults?org=UNISTUDENTUNION&cws=38';
const staffManagementUrl = 'https://careers.pageuppeople.com/873/nr/en-us/listing/';
const asCareersUrl = 'https://www.csun.edu/as/jobs';

export default function AboutMe() {
    const [useCareers, setuseCareers] = useState();
    const [managementCareers, setManagementCareers] = useState();

    const scrapeUSUCareers = async () => {
        let data = [];
        const response = await fetch(usuCareersUrl).then(res => res.text())
        const $ = cheerio.load(response);

        const results = $('.oracletaleocwsv2-accordion-head-info').each(function (i, elem) {
            let job = {
                department: $(elem).find('div:nth-child(3)').text(),
                location: $(elem).find('div:nth-child(2)').text(),
                position: $(elem).find('h4').text(),
                url: $(elem).find('a').attr('href')
            }
            data.push(job);
        });
        console.log(data)
    }

    const scrapeManagementCareers = async () => {
        let data = [], temp = {};
        const response = await fetch(staffManagementUrl).then(res => res.text())
        const $ = cheerio.load(response);

        const results = $('#recent-jobs-content > tr').each(function (i, elem) {

            if ((i + 1) % 2 == 0) {
                temp['description'] = $(elem).find(`td`).text();
                data.push(temp);
                temp = {};
            } else {
                temp = {
                    division: $(elem).find('td:nth-child(2)').text().trim(),
                    jobNumber: $(elem).find('td:nth-child(3)').text().trim(),
                    position: $(elem).find('a').text(),
                    url: $(elem).find('a').attr('href')
                }
            }
        });
        console.log(data)
    }

    const scrapeAsCareers = async () => {
        let data = [];
        const response = await fetch(asCareersUrl).then(res => res.text());
        const $ = cheerio.load(response);
        const results = $('.field-items > div > p').each(function (i, elem) { 
            console.log($(elem).text(), '\n');
        });
        // class for div inside Student Job dropdown
        // field field-name-field-body field-type-text-long field-label-hidden ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Job Scrape</Text>
            <Button title="Scrape USU Careers" onPress={scrapeUSUCareers} />
            <Button title="Scrape Staff & Management Careers" onPress={scrapeManagementCareers} />
            <Button title="Scrape AS Careers" onPress={scrapeAsCareers} />
        </View>
    );
}