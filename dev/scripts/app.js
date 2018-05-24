import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { firebaseConfig } from './firebase/firebase-config';
import axios from 'axios';
import Qs from 'qs';
import {BrowserRouter as Router,
        Route,
        Link,
        NavLink} from 'react-router-dom';
import IssuePage from './components/IssuePage';
import AccountPage from './components/AccountPage';
import Issue from './components/Issue';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//comicVine Api Key
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: null,
      searchInput: '',
      enteredInput: '',
      searchResults: [],
      volumeIssuesArray: []
    }
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleIssueClick = this.handleIssueClick.bind(this);
  }

  componentDidMount() {
    //----------------
    // Authentication
    //----------------
    this.dbRef = firebase.database().ref('users/');

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.dbRef.on('value', (snapshot) => {
          console.log(snapshot.val());
        })
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.log(user.user);

        const firebaseUid = user.user.uid;
        const firebaseName = user.user.displayName;
        const firebaseImg = user.user.photoURL;
        this.setState({
          userId: firebaseUid,
          userName: firebaseName,
          userImg: firebaseImg,
        }, () => {
          console.log('pushing', this.state.userId);
          const userInfo = {
            userName: this.state.userName,
            userImg: this.state.userImg,
          }
          firebase.database().ref('users/' + this.state.userId).set(userInfo);
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout() {
    firebase.auth().signOut();
    this.dbRef.off('value');
    console.log('signed out');
  }

  //----------------
  // Event handler
  //----------------
  inputHandler(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  submitHandler(e) {
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

  //-----------
  // Api Calls
  //-----------
  getApi() {
    //API call
    console.log(this.state.enteredInput);
    axios({
      url: "http://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "jsonp",
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
      for (let i = 0; i < apiArray.length; i++) {
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
  getVolumes(volumeId) {
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
      for (let i = 0; i < 10; i++) {
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

  handleIssueClick(volumeId){
    this.setState({
      selectedIssueId: volumeId,
    }, () => {
      console.log(this.state.selectedIssueId); 
      //call axios here
    })
  }
  //display the results of inital API call data
  displayResults() {
    if (this.state.searchResults !== []) {
      return (
        <ul>
          {this.state.searchResults.map((result, index) => {
            console.log(result);
            return (
              <Issue 
                key={result.id}
                issueId={result.id}
                // issueImg={result.image.medium_url}
                issueImg={result.image.icon_url}
                issueName={result.name}
                issueNumber={result.issue_number}
                issueDescription={result.description}
                handleIssueClick={this.handleIssueClick}/>
            )
          })}
        </ul>
      )
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/issue">Issue</Link>
          <Link to="/account">Account</Link>
          <Route path="/issue" component={IssuePage} />
          <Route path="/account" component={AccountPage} />
          {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>
          }
          {this.state.loggedIn === true &&
            <div>
              <button onClick={this.logout}>Logout</button>
              <h1>Hello {this.state.username} </h1>
            </div>}
          <form action="" onSubmit={this.submitHandler}>
            <input type="text" onChange={this.inputHandler} value={this.state.searchInput} />
            <select name="" id="">Page
              <option value="volume">Search by volume</option>
            </select>
            <button>Search</button>
          </form>
          {this.displayResults()}
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


