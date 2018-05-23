import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {firebaseConfig} from './firebase/firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
