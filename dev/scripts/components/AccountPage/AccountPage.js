import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';



class AccountPage extends React.Component {
  constructor(){
    super();

    this.state = {
      userKey: ''
    }
  }
  componentDidMount(){
    this.setState({
      userKey: this.props.userKey
    }, () => {
      const dbRef = firebase.database().ref(`users/${this.state.userKey}/`)
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      })
  })

  
    
  }
  render() {
    return (
      <div>
        <ul>
          
        </ul>

        <ul>

        </ul>
      </div>
      
    )
  }
}

export default AccountPage;