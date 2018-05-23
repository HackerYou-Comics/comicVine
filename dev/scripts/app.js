import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {firebaseConfig} from './firebase/firebase-config';
import axios from 'axios';
import Qs from 'qs';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//comicVine Api Key
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      userId: null,
    }
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    //----------
    // API call
    //----------

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

    //----------------
    // Authentication
    //----------------
    this.dbRef = firebase.database().ref('users/');

    firebase.auth().onAuthStateChanged((user) => {
      if(user !== null){
        this.dbRef.on('value', (snapshot) => {
          console.log(snapshot.val());
        })
        this.setState({
          loggedIn: true
        })
      }else{
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  loginWithGoogle(){
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
        },() => {
          console.log('pushing', this.state.userId);
          const userInfo = {
            userName: this.state.userName,
            userImg: this.state.userImg,
          }
          // registers user info in firebase upon login
          firebase.database().ref(`users/${this.state.userId}/`).set({userInfo});
          ;
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout(){
    firebase.auth().signOut();
    this.dbRef.off('value');
    console.log('signed out');
  }

  writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}



  render() {
    return (
      <div>

        {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>
        }
        {this.state.loggedIn === true && 
          <div>
            <button onClick={this.logout}>Logout</button>
            <h1>Hello {this.state.username} </h1>
          </div>}
      </div>
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