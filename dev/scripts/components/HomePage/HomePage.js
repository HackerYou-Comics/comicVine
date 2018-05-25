import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Form from './Form';


class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Form setVolume={this.props.setVolume}
              issueClicked={this.props.issueClicked}/>
      </div>
    )
  }
}

export default HomePage;