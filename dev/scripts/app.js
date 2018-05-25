import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
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
      searchResults: []

    }
    this.grabSearchResultsFromForm = this.grabSearchResultsFromForm(this);
  }

  grabSearchResultsFromForm(resultsFromForm){
    console.log('grabSearchResult');
    this.setState({
      searchResults: resultsFromForm
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Auth />
          <NavLink to="/info">Info</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/">Home</NavLink>
          <Route path="/account" component={AccountPage} />
          <Route exact path="/" render={() => <HomePage getResult={this.grabSearchResultsFromForm}/>} />
          <Route path="/info/:result_id" component={InfoPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));