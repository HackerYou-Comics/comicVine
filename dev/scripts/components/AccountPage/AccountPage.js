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
      issueListArchive: [],
      issueListWishList: [],
    }
    this.deleteIssue = this.deleteIssue.bind(this);
    this.toggleOwnage = this.toggleOwnage.bind(this);
  }

  componentDidMount() {
    const userId = this.props.userKey;
    this.setState({
      userKey: this.props.userKey,
    }, () => {
      
      const dbRef = firebase.database().ref(`users/library/${this.state.userKey}/`);
      dbRef.on('value', (snapshot) => {
        const issueList = snapshot.val();
        const issueListArchiveClone = [];
        const issueListWishListClone = [];

        for(let issue in issueList){
          if(issueList[issue].completed === true){
            issueListArchiveClone.push(issueList[issue]);
          }else{
            issueListWishListClone.push(issueList[issue]);
          }
        }
        this.setState({
          issueListArchive: issueListArchiveClone,
          issueListWishList: issueListWishListClone,
        }, () => {
          console.log(this.state.issueListArchive);
          console.log(this.state.issueListWishList);
        });        
      })
    })
  }

  deleteIssue(issueId){
    firebase.database().ref(`users/library/${this.props.userKey}/${issueId}`).remove();
  }

  toggleOwnage(issueId, completed){
    firebase.database().ref(`users/library/${this.props.userKey}/${issueId}`).update({
      completed: completed === true ? false : true
    })
  }


  render() {
    return (
      <section>
        <h2>WishList</h2>
        <ul>
          {this.state.issueListWishList.map((issue) => {
            return(
              <li key={issue.name + issue.key}>
              <img src={issue.image} alt={issue.name}/>
              <p>{issue.name}</p>
                <button onClick={() => this.deleteIssue(issue.name + issue.key)}><i class="fas fa-trash-alt"></i></button>
              <button onClick={() => this.toggleOwnage(issue.name + issue.key, issue.completed)}>💛</button>
            </li>
            )
          })}
        </ul>
        <h2>Comic Stash 🌯</h2>
        <ul>
          {this.state.issueListArchive.map((savedIssue) => {
            return(
              <li key={savedIssue.name + savedIssue.key}>
                <img src={savedIssue.image} alt={savedIssue.name} />
                <p>{savedIssue.name}</p>
                <button onClick={() => this.deleteIssue(savedIssue.name + savedIssue.key)}><i class="fas fa-trash-alt"></i></button>
                <button onClick={() => this.toggleOwnage(savedIssue.name + savedIssue.key, savedIssue.completed)}>💛</button>
              </li>
            )
          })}
        </ul>
    </section> 
    )
  }
}

export default AccountPage;