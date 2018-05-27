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
      library: '',
      libraryKey: '',
      issueListArchive: [],
      issueListWishList: [],
    }
  }

  componentWillMount() {
    const userId = this.props.userKey;
    this.setState({
      userKey: this.props.userKey,
      libraryKey: this.props.libraryKey
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

  render() {
    return (
      <div>
        {this.state.userKey === null? 
          <h2> Please login to view this page </h2>:
          <section>
            <h2>WishList</h2>
            <ul>
              {this.state.issueListWishList.map((issue) => {
                <li key={issue.name+issue.key}>
                  {console.log(issue)}
                  <h1>hi</h1>
                  <img src={issue.image} alt={issue.name}/>
                  <p>{issue.name}</p>
                </li>
              })}
            </ul>
            <h2>Comic Stash 🌯</h2>
            <ul>
              {/* {this.state.issueListArchive.map((issue) => {
                <li key={issue.name + issue.key}>
                  {console.log(issue)}
                  <h1>hi</h1>
                  <img src={issue.image} alt={issue.name} />
                  <p>{issue.name}</p>
                </li>
              })} */}
            </ul>
          </section>
        }
      </div>
      
    )
  }
}

export default AccountPage;