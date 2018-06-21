import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  browserHistory,
} from 'react-router-dom';
// import pages
import InfoPage from './components/InfoPage/InfoPage';
import AccountPage from './components/AccountPage/AccountPage';
import HomePage from './components/HomePage/HomePage';
// import other components
import Auth from './components/Auth';
//firebase imports
import firebase from 'firebase';
import { firebaseConfig } from './firebase/firebase-config';
import Footer from './components/HomePage/Footer';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      loginStatus: null,
    }
    this.getLibraryKeyFromIssue = this.getLibraryKeyFromIssue.bind(this);
    this.getUserIdandLogin = this.getUserIdandLogin.bind(this);
  }

  getLibraryKeyFromIssue(libraryId){
    this.setState({
      libraryKey: libraryId
    }, () => {
      console.log(this.state.libraryKey)
    })
  }

  getUserIdandLogin (userId, loginStatus){
    this.setState({
      userId: userId,
      loginStatus: loginStatus
    },()=> {
      console.log(this.state.userId, this.state.loginStatus);
    });
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="content">
          <Auth 
            getUserIdandLogin={this.getUserIdandLogin}/>
          <Route path="/" render={(props) => <HomePage
            userKey = {this.state.userId} 
            setVolume={this.getVolumesIssuesArrayfromForm}
            issueClicked={this.state.issueSelected}
            libraryId={this.getLibraryKeyFromIssue}
            getUserIdandLogin={this.getUserIdandLogin}
            router={props}/>}>
          </Route>
          <Route exact path="/account" render={() => <AccountPage 
            userKey={this.state.userId} 
            libraryId={this.state.libraryKey}
          />} />
          <Footer /> 
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));