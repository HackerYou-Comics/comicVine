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
        <h3>Wish List</h3>
        <ul>
          {Object.keys(this.state.library)
            .filter((key) => {
              return this.state.library[key].completed === false
            })
            .map((key) => {
              console.log(key)
              return (

                <li key={key}>

                  {this.state.library[key].name}

                  {/*<div className="buttonDiv">
                    <button className="completeButton" onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-check"></i></button>

                    <button className="deleteButton" onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
                   </div>*/}
                </li>)
            })}
        </ul>
        
        <h3>Have Read</h3>
        <ul>
          {Object.keys(this.state.library)
            .filter((key) => {
              return this.state.library[key].completed === true
            })
            .map((key) => {
              console.log(key)
              return (

                <li key={key}>

                  {this.state.library[key].name}

                  {/*<div className="buttonDiv">
                    <button className="completeButton" onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-check"></i></button>

                    <button className="deleteButton" onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
              </div>*/}
                </li>)
            })}
        </ul>
      </div>
      
    )
  }
}

export default AccountPage;