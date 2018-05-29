import React from 'react';
import firebase from 'firebase';
//import { firebaseConfig } from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    browserHistory,
} from 'react-router-dom';

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

class Auth extends React.Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            userId: null,
            userName:'',
            userImg:'',
            zero: 0,
        }
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.logout = this.logout.bind(this); 
        this.navScroll = this.navScroll.bind(this);
        this.handleNavScroll = this.handleNavScroll.bind(this);
    }

    componentDidMount() {
        this.navScroll();
        this.dbRef = firebase.database().ref('users/');

        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.dbRef.on('value', (snapshot) => {
                    // console.log(snapshot.val());
                })
                this.setState({
                    loggedIn: true,
                    userName: user.displayName,
                    userImg: user.photoURL,
                    userId: user.uid,
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
                    firebase.database().ref(`users/accountInfo/${this.state.userId}`).set(userInfo);
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

    navScroll() {
        window.addEventListener('scroll', this.handleNavScroll);
    };

    handleNavScroll(e){ 
        this.refs.authBar.classList.toggle('hide', window.pageYOffset > this.state.zero);
        this.setState({
            zero: window.pageYOffset
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.loggedIn === false && 
                    <div ref="authBar" className="auth-bar">
                        <div className="links clearfix">
                            <NavLink className="auth-link results" activeClassName="auth-link-active" to="/">Home</NavLink>
                            <div className="auth-btn">
                                <button onClick={this.loginWithGoogle}><i className="fas fa-sign-in-alt"></i></button>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.loggedIn === true &&
                    <div ref="authBar" className="auth-bar">
                        <div className="links clearfix">
                            <NavLink className="auth-link results" activeClassName="auth-link-active" to="/">Home</NavLink>
                            <NavLink className="auth-btn" to="/">
                                <button onClick={this.logout}><i className="fas fa-sign-out-alt"></i></button>
                            </NavLink>
                            <NavLink to="/account">
                                <img src={this.state.userImg} alt={this.state.userName} />
                            </NavLink>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Auth;

