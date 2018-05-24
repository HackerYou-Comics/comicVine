import React from 'react';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Auth extends React.Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            userId: null
        }
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.logout = this.logout.bind(this); 
    }

    componentDidMount() {
        //----------------
        // Authentication
        //----------------
        this.dbRef = firebase.database().ref('users/');

        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.dbRef.on('value', (snapshot) => {
                    console.log(snapshot.val());
                })
                this.setState({
                    loggedIn: true
                })
            } else {
                this.setState({
                    loggedIn: false
                })
            }
        })
    }

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                // console.log(user.user);

                const firebaseUid = user.user.uid;
                const firebaseName = user.user.displayName;
                const firebaseImg = user.user.photoURL;
                this.setState({
                    userId: firebaseUid,
                    userName: firebaseName,
                    userImg: firebaseImg,
                }, () => {
                    // console.log('pushing', this.state.userId);
                    const userInfo = {
                        userName: this.state.userName,
                        userImg: this.state.userImg,
                    }
                    firebase.database().ref('users/' + this.state.userId).set(userInfo);
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout() {
        firebase.auth().signOut();
        this.dbRef.off('value');
        // console.log('signed out');
    }

    render(){
        return(
            <div>
                {
                    this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>
                }
                {
                    this.state.loggedIn === true &&
                    <div>
                        <button onClick={this.logout}>Logout</button>
                        <h1>Hello {this.state.username} </h1>
                    </div>
                }
            </div>
        )
    }
}