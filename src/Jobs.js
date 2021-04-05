import React from 'react'
import { View, Text } from 'react-native'
import { Http, HttpModule } from '@angular/http'


const https = require('https');

// Replace with access token for the r_liteprofile permission
const accessToken = 'AQWGadBhDTSJekvkrcRy5ckLV_8ilTlVxmf531mXlkxQn-3NK0Nx00-k2jk8_1en_MGbFvICaAo2rWq1NhRXc6-sYgyYzKgFfvsm_HjWtHIu2kDkBHkgYeTsu5To4MCaOi9r3gYEF970fJ8-152IxItaDIhlpoLU6ujuVdkyrAWVXfzfm619FzhQBJegiBYo3w2JPUR2-HxIdblcOwDgywj_zPuQ8mvmXdhn5qKvZdghWHEtT8h2fTJG48KxHe5wOGCSbVJ4sfr_4mf0ZaT2LRqSxzieM89GAbukN12yu-WL97egKz_mR6OZyRHEdZYN7LR8AIkNBWe4Duv3_mT25CtqyIFGVQ';
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

  GET /v2/jobs HTTP/1.1
Host: api.linkedin.com
Connection: Keep-Alive
Authorization: Bearer {AQWGadBhDTSJekvkrcRy5ckLV_8ilTlVxmf531mXlkxQn-3NK0Nx00-k2jk8_1en_MGbFvICaAo2rWq1NhRXc6-sYgyYzKgFfvsm_HjWtHIu2kDkBHkgYeTsu5To4MCaOi9r3gYEF970fJ8-152IxItaDIhlpoLU6ujuVdkyrAWVXfzfm619FzhQBJegiBYo3w2JPUR2-HxIdblcOwDgywj_zPuQ8mvmXdhn5qKvZdghWHEtT8h2fTJG48KxHe5wOGCSbVJ4sfr_4mf0ZaT2LRqSxzieM89GAbukN12yu-WL97egKz_mR6OZyRHEdZYN7LR8AIkNBWe4Duv3_mT25CtqyIFGVQ"} 
  res.on('end', () => {
    const profileData = JSON.parse(data);
    console.log(JSON.stringify(profileData, 0, 2));
  });
});
profileRequest.end();

POST /oauth/v2/accessToken HTTP/1.1
Host: www.linkedin.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code={AQWGadBhDTSJekvkrcRy5ckLV_8ilTlVxmf531mXlkxQn-3NK0Nx00-k2jk8_1en_MGbFvICaAo2rWq1NhRXc6-sYgyYzKgFfvsm_HjWtHIu2kDkBHkgYeTsu5To4MCaOi9r3gYEF970fJ8-152IxItaDIhlpoLU6ujuVdkyrAWVXfzfm619FzhQBJegiBYo3w2JPUR2-HxIdblcOwDgywj_zPuQ8mvmXdhn5qKvZdghWHEtT8h2fTJG48KxHe5wOGCSbVJ4sfr_4mf0ZaT2LRqSxzieM89GAbukN12yu-WL97egKz_mR6OZyRHEdZYN7LR8AIkNBWe4Duv3_mT25CtqyIFGVQ}&redirect_uri=https://localhost:8080%&client_id={86jz5ns0razjck}&client_secret={4TPmWeL2qdLgSvQz}

