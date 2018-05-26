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
      userKey: '',
      library: '',
      libraryKey: ''
    }
  }



  componentDidMount(){
    this.setState({
      userKey: this.props.userKey,
      libraryKey: this.props.libraryKey
    }, () => {
      const dbRef = firebase.database().ref(`users/${this.state.userKey}/`);
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();

        //if library is empty
        if (data.hasOwnProperty('library')){
          return(
              this.setState({
              library: data.library
            }, () => {
              console.log(this.state.library)
            })
          )
        }else{
          return false;
        }
      })
  })


  
    
  }
  render() {
    return (
      <div>
        <ul>
          {
            // console.log(Object.keys(this.state.library))
          //   this.state.library.map( () => {
            
          // })
        }

        </ul>

        <ul>

        </ul>
      </div>
      
    )
  }
}

export default AccountPage;