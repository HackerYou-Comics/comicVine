import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Form from './Form';
import InfoPage from '../InfoPage/InfoPage';


class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Route path="/info/:publisherId" component={ InfoPage }/>
      </div>
    )
  }
}

export default HomePage;
