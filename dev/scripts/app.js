import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
        Route,
        Link,
        NavLink} from 'react-router-dom';
import InfoPage from './components/InfoPage/InfoPage';
import AccountPage from './components/AccountPage/AccountPage';
import HomePage from './components/HomePage/HomePage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {


    }

  }

  render() {
    return (
      <Router>
        <div>
          <NavLink to="/info">Info</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/">Home</NavLink>
          <Route path="/info" component={InfoPage} />
          <Route path="/account" component={AccountPage} />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));