import React from 'react'
import { View, Text } from 'react-native'

export default function Jobs() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Jobs Screen</Text>
        </View>
    )
}

const https = require('https');

// Replace with access token for the r_liteprofile permission
const accessToken = 'AQWGadBhDTSJekvkrcRy5ckLV_8ilTlVxmf531mXlkxQn-3NK0Nx00-k2jk8_1en_MGbFvICaAo2rWq1NhRXc6-sYgyYzKgFfvsm_HjWtHIu2kDkBHkgYeTsu5To4MCaOi9r3gYEF970fJ8-152IxItaDIhlpoLU6ujuVdkyrAWVXfzfm619FzhQBJegiBYo3w2JPUR2-HxIdblcOwDgywj_zPuQ8mvmXdhn5qKvZdghWHEtT8h2fTJG48KxHe5wOGCSbVJ4sfr_4mf0ZaT2LRqSxzieM89GAbukN12yu-WL97egKz_mR6OZyRHEdZYN7LR8AIkNBWe4Duv3_mT25CtqyIFGVQ';
const options = {
  host: 'api.linkedin.com',
  path: '/v2/me',
  method: 'fetch',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0'
  }
};
fetch('https://linkedin.com/jobs')
  .then(response => response.json())
  .then(data => console.log(data));

fetch ('https://linkedin.com/jobs', {
  method: 'GET',
  headers: { 
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify ({
    firstParam: 'jobs'
  })
});

const getJobsFromLinkedin = async () => {
  let response = await fetch(
    'https://linkedin.com/jobs/data.json'
  );
  let json = await response.json();
  return json.jobs;
}

const getJobsFromLinkedin = async () => {
  try{
    let response = await fetch ( 
      'https://linkedin.com/jobs/data.json'
    );
    let json = await response.json();
    returns json.jobs;
  } catch (error) {
    console.error(error);
  }
}

const profileRequest = https.request(options, function(res) {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const profileData = JSON.parse(data);
    console.log(JSON.stringify(profileData, 0, 2));
  });
});
profileRequest.end();