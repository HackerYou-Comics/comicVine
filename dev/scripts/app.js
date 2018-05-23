import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {firebaseConfig} from './firebase/firebase-config';
import axios from 'axios';
import Qs from 'qs';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';




class App extends React.Component {
  constructor(){
    super();

    this.state = {
      searchInput: '',
      enteredInput: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputHandler(e){
    this.setState({
      searchInput: e.target.value
    })
  }

  submitHandler(e){
    e.preventDefault();
    const inputClone = this.state.searchInput;
    this.setState({
      enteredInput: inputClone
    }, () => {
      console.log(this.state.enteredInput);
      this.getApi();

    })
  }

  getApi(){
    //API call
    console.log(this.state.enteredInput);
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
          format: 'json',
          filter: `name:${this.state.enteredInput}`
        },
        proxyHeaders: {
          'headers_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.submitHandler}>
          <input type="text" onChange={this.inputHandler} value={this.state.searchInput}/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
