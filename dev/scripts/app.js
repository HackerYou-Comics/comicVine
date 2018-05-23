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
      enteredInput: '',
      searchResults: [],
      volumeIssuesArray: []
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.displayVolumeResults = this.displayVolumeResults.bind(this);
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
      enteredInput: inputClone,
      searchResults: []
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

      //results of the data in an array
      const apiArray = res.data.results;

      //clone searchResults state
      const searchResultsClone = [...this.state.searchResults];
      for(let i = 0; i < apiArray.length; i++){
        searchResultsClone.push(apiArray[i]);
      }

      this.setState({
        searchResults: searchResultsClone
      }, () => {
        // console.log(this.state.searchResults);
      })

    });
  }


  //makes the API call to get volume data based on inital api call's returned volume id
  getVolumes(event, volumeId){
    console.log(event);
    axios({
      url: "http://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        // "https://comicvine.gamespot.com/api/volume/4050-796/"
        reqUrl: `https://comicvine.gamespot.com/api/volume/4050-${volumeId}`,
        params: {
          api_key: apiKey,
          format: 'json'
        },
        proxyHeaders: {
          'headers_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((vol) => {

      //volume data and all the issues in the volume
      const volIssues = vol.data.results.issues;
      //volumeIssuesArray clone
      const volumeIssuesArrayClone = [...volumeIssuesArrayClone];
      let reducedArray = [];
//only returns 10. over 900 crashes browser
      for(let i = 0; i < 10; i++){
        volumeIssuesArrayClone.push(volIssues[i]);
      }
      //first array is undefined for some reason
      //filter all arrays if they are undefined
      reducedArray = volumeIssuesArrayClone.filter(issue => issue !== undefined);

      this.setState({
        volumeIssuesArray: reducedArray
      }, () => {
        console.log(this.state.volumeIssuesArray);
      })
    });
  }

  //display the results of inital API call data
  displayResults(){
    if(this.state.searchResults !== []){
      return (
        this.state.searchResults.map((result, index) => {
          return (
            <ul key={index} onClick={
                (event) => {
                  //passes the volume's id to getVolume method
//




//need to pass the event of the specific item clicked
                  this.getVolumes(event, result.volume.id)
                }
              }>{result.name}
              {this.displayVolumeResults()}
            </ul>
          )
        })
      )
    }
  }



  //display all the volumes onclick of search result's issue
  displayVolumeResults(){
    if(this.state.volumeIssuesArray !== []){
      return (
        this.state.volumeIssuesArray.map((issues, index) => {
          // console.log(issues);
          return (
            <li key={index}>{issues.issue_number}{issues.name}</li>
          )
        })
      )
    }
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.submitHandler}>
          <input type="text" onChange={this.inputHandler} value={this.state.searchInput}/>
          <select name="" id="">
            <option value="comic">Search by Comic name</option>
            <option value="volume">Search by volume</option>
          </select>
          <button>Search</button>
        </form>
        {this.displayResults()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
