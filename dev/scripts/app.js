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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
    }
    this.getUserIdFromAuth = this.getUserIdFromAuth.bind(this);
  }

  getUserIdFromAuth(userKey){
    this.setState({
      userId: userKey,
    })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Auth getUserId={this.getUserIdFromAuth}/>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/">Home</NavLink>
          <Route exact path="/" render={() => <HomePage
            userKey = {this.state.userId} 
            setVolume={this.getVolumesIssuesArrayfromForm}
            issueClicked={this.state.issueSelected}/>}>
          </Route>
          <Route path="/account" component={AccountPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));