import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {firebaseConfig} from './firebase/firebase-config';
import axios from 'axios';
import Qs from 'qs';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';

//API call
// axios.get(`http://www.comicvine.com/api/issues?api_key=${apiKey}`)
//   .then((res) => {
//     console.log(res.data);
//   });

axios({
  url: "http://proxy.hackeryou.com",
  method: "GET",
  dataResponse: "json",
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },
  params: {
    reqUrl: `http://www.comicvine.com/api/issues`,
    params: {
      api_key: apiKey,
      format: 'json'
    },
    proxyHeaders: {
      'headers_params': 'value'
    },
    xmlToJSON: false
  }
}).then((res) => {
  console.log(res.data);
});

class App extends React.Component {
  constructor(){
    super();
    
  }

  render() {
    return (
      <h1>hi</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// please put this in your git ignore
/*
dev/scripts/firebase/firebase-config.js
.firebaserc
firebase.json
*/