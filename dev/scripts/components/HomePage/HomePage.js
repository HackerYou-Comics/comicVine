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
<<<<<<< HEAD
        <Form getResult={this.props.getResult}/>
=======
        <Form setVolume={this.props.setVolume}/>
>>>>>>> 71fa67c0f6835cf1896a98e02dc4bd71e8bc9462
      </div>
    )
  }
}

export default HomePage;