import React from 'react'
import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'

export default function Jobs() {
  const [isLoading, setLoading] = useState(true);
  const[data, setData] = useState([]);
  console.log(data);

  useEffect( () => { 
    fetch('https://linkedin.com/v2/jobs?keyword=computer science&location= los angeles california.json')
    .then((response) =>  response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Jobs Screen</Text>
        </View>
    )
}

const https = require('https');

// Replace with access token for the r_liteprofile permission
const accessToken = 'AQUWvMHCt9WGYzCyCgPC_iGXuF6ZT52Sr05Fk2v6RqGbJ9T9geSsNszkT6xT_H3NArA3twgygpqb0vBf7Rir174dnmzxAvzYXU9t6p8hMg6AqTxnYia96uti7E09kCFmKhUylWS-2txG-4YJDQ3OXUJSzoEtNYxNtY2QmBqC3H3gvKYaYMv3MsmcIsTAtBB1CxMhANzR07iSsnE6WuzrffERc0GRlnkmEzMn00iLVvCY_psORNh_0PEjEari6tSd5cWNGqIjqIvW_F4Ih1zaVCAYCFNhonvKo2pbqxceq4_TXlybsJUGei8c_mp1O1gkYpSCLU-l4lYJnG52Ds_T9ZQqjOWugA';
const options = {
  host: 'api.linkedin.com',
  path: '/v2/me',
  method: 'fetch',
  headers: {
    'Authorization': `Bearer ${AQUWvMHCt9WGYzCyCgPC_iGXuF6ZT52Sr05Fk2v6RqGbJ9T9geSsNszkT6xT_H3NArA3twgygpqb0vBf7Rir174dnmzxAvzYXU9t6p8hMg6AqTxnYia96uti7E09kCFmKhUylWS-2txG-4YJDQ3OXUJSzoEtNYxNtY2QmBqC3H3gvKYaYMv3MsmcIsTAtBB1CxMhANzR07iSsnE6WuzrffERc0GRlnkmEzMn00iLVvCY_psORNh_0PEjEari6tSd5cWNGqIjqIvW_F4Ih1zaVCAYCFNhonvKo2pbqxceq4_TXlybsJUGei8c_mp1O1gkYpSCLU-l4lYJnG52Ds_T9ZQqjOWugA}`,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0'
  }
};
fetch('https://linkedin.com/v2/jobs?keyword=computer science&location=los angeles california')
  .then(response => response.json())
  .then(data => console.log(data));

fetch ('https://linkedin.com/v2/jobs?keyword=computer science&location=los angeles california', {
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
    'https://linkedin.com/v2/jobs?keyword=computer science&location= los angeles california/data.json'
  );
  let json = await response.json();
  return json.jobs;
}

const getJobsFromLinkedin = async () => {
  try{
    let response = await fetch ( 
      'https://linkedin.com/v2/jobs?keyword=computer science&location= los angeles california/data.json'
    );
    let json = await response.json();
    returns response.json(jobs);
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
}
