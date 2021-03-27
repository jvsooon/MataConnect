import React from 'react'
import { View, Text } from 'react-native'

export default function Jobs() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Jobs Screen</Text>
        </View>
    );


const https = require('https');

// Replace with access token for the r_liteprofile permission
const accessToken = 'r_emailadress';
const options = {
  host: 'api.linkedin.com',
  path: '/v2/me',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0'
  }
};

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

}
