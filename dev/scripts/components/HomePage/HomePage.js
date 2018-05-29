import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Form from './Form';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../HomePage/Header'


class HomePage extends React.Component {
  render() {
    return (
      <div>
        {this.props.router.location.pathname === "/account" ? null :
          (
            <div>
              <Header />
              <Form
                router={this.props.router}
                libraryId={this.props.libraryId}
                userKey={this.props.userKey} />
            </div>)}     
      </div>
    )
  }
}

export default HomePage;
