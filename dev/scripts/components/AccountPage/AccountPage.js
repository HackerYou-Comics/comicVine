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
      userKey: null,
      userName: '',
      issueListArchive: [],
      issueListWishList: [],
    }
    this.deleteIssue = this.deleteIssue.bind(this);
    this.toggleOwnage = this.toggleOwnage.bind(this);
    this.getUserInfoFromFirebase = this.getUserInfoFromFirebase.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserInfoFromFirebase(user.uid);
        this.setState({
          userKey: user.uid,
          userName: user.displayName,
        })
      } else {
        console.log('no user');
      }
    });
  }

  getUserInfoFromFirebase(userKey){
    const dbRef = firebase.database().ref(`users/library/${userKey}/`);
    dbRef.on('value', (snapshot) => {

      const issueList = snapshot.val();
      const issueListArchiveClone = [];
      const issueListWishListClone = [];

      for (let issue in issueList) {
        if (issueList[issue].completed === true) {
          issueListArchiveClone.push(issueList[issue]);
        } else {
          issueListWishListClone.push(issueList[issue]);
        }
      }
      this.setState({
        issueListArchive: issueListArchiveClone,
        issueListWishList: issueListWishListClone,
      });
    });
  }

  deleteIssue(issueId){
    firebase.database().ref(`users/library/${this.state.userKey}/${issueId}`).remove();
  }

  toggleOwnage(issueId, completed){
    firebase.database().ref(`users/library/${this.state.userKey}/${issueId}`).update({
      completed: completed === true ? false : true
    })
  }

  render() {
    return (
      <section className="accountPage">
        <div className="accountBanner">
          <h1 className="results">Welcome {this.state.userName}</h1>
        </div>
        <div className="results">
          <h2>WishList</h2>
          <ul className = "resultList clearfix">
            {this.state.issueListWishList.map((issue) => {
              return(
                <li key={issue.name + issue.key}>
                  <div className="imageContainer">
                    <img src={issue.image} alt={issue.name}/>
                  </div>
                  <p>{issue.name}</p>
                    <div className="buttonContainer">
                      <button onClick={() => this.deleteIssue(issue.name + issue.key)}><i className="fas fa-trash-alt"></i></button>
                    <button onClick={() => this.toggleOwnage(issue.name + issue.key, issue.completed)}><i className="fas fa-archive"></i></button>
                    </div>
                </li>
              )
            })}
          </ul>
          <h2>Comic Stash 🌯</h2>
          <ul className="resultList clearfix">
            {this.state.issueListArchive.map((savedIssue) => {
              return(
                <li key={savedIssue.name + savedIssue.key}>
                  <div className="imageContainer">
                    <img className="issueImg" src={savedIssue.image} alt={savedIssue.name} />
                  </div>
                  <p>{savedIssue.name}</p>
                  <div className="buttonContainer">
                    <button onClick={() => this.deleteIssue(savedIssue.name + savedIssue.key)}><i className="fas fa-trash-alt"></i></button>
                    <button onClick={() => this.toggleOwnage(savedIssue.name + savedIssue.key, savedIssue.completed)}><i className="fas fa-star"></i></button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section> 
    )
  }
}

export default AccountPage;