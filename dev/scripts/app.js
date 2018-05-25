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
<<<<<<< HEAD
      searchResults: []

    }
    this.grabSearchResultsFromForm = this.grabSearchResultsFromForm(this);
  }

  grabSearchResultsFromForm(resultsFromForm){
    console.log('grabSearchResult');
    this.setState({
      searchResults: resultsFromForm
=======
      volumeIssuesArray: []
    }
    this.getVolumesIssuesArrayfromForm = this.getVolumesIssuesArrayfromForm.bind(this);
  }

  getVolumesIssuesArrayfromForm(array){
    this.setState({
      volumeIssuesArray: array,
    }, () => {
      console.log('Array from form: ', this.state.volumeIssuesArray); 
>>>>>>> 71fa67c0f6835cf1896a98e02dc4bd71e8bc9462
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
<<<<<<< HEAD
          <Route path="/account" component={AccountPage} />
          <Route exact path="/" render={() => <HomePage getResult={this.grabSearchResultsFromForm}/>} />
          <Route path="/info/:result_id" component={InfoPage} />
=======
          <Route path="/info" render={() => <InfoPage volumeIssuesArray={this.state.volumeIssuesArray}/>} />
          <Route path="/account" component={AccountPage} />
          <Route exact path="/" render={() => <HomePage setVolume={this.getVolumesIssuesArrayfromForm}/>} />
>>>>>>> 71fa67c0f6835cf1896a98e02dc4bd71e8bc9462
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));