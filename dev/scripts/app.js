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

//API call
// axios.get(`http://www.comicvine.com/api/issues?api_key=${apiKey}`)
//   .then((res) => {
//     console.log(res.data);
//   });

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
          firebase.database().ref('users/' + this.state.userId).push(userInfo);
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
        <form action="" onSubmit={this.submitHandler}>
          <input type="text" onChange={this.inputHandler} value={this.state.searchInput}/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
