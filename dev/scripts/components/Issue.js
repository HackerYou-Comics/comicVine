import React from 'React';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase-config';

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Issue extends React.Component{
    constructor(){
        super();
        this.state = {
            userKey: '',
            libraryInfo: {}
        }
        this.handleLibrary = this.handleLibrary.bind(this);
    }
    componentDidMount(){
        this.setState({
            userKey: this.props.userKey,
        })
    }

    handleLibrary(e) {
        console.log(e.currentTarget.value)
        this.props.libraryId(this.props.issueName + this.props.infoId)
        const dbRef = firebase.database().ref(`users/${this.state.userKey}/library/${this.props.issueName + this.props.infoId}`)
        if(e.currentTarget.value === 'archive') {
            this.setState({
            libraryInfo: {
                name: this.props.issueName,
                image: this.props.issueImg,
                issueNumber: this.props.issueNumber,
                key: this.props.infoId,
                completed: true
                }
            }, ()=>{
                dbRef.set(this.state.libraryInfo);
            }) 
        } else {
            this.setState({
                libraryInfo: {
                    name: this.props.issueName,
                    image: this.props.issueImg,
                    issueNumber: this.props.issueNumber,
                    key: this.props.infoId,
                    completed: false
                }
            }, ()=> {
                dbRef.set(this.state.libraryInfo)
            })
        }
    }
    render(){
        return(
            <div>
                <Link to={`/${this.props.infoId}`}>
                    <li>
                        <div>
                            <img src={this.props.issueImg} alt={this.props.issueName} />
                            <p>{this.props.issueName}</p>
                            <p>{this.props.issueNumber}</p>
                        </div>
                    </li>
                </Link>
                <button value="wishList" onClick={this.handleLibrary}><i className="fas fa-star"></i></button>
                <button value="archive" onClick={this.handleLibrary}><i className="fas fa-archive"></i></button>
            </div>
        )
    }

}

export default Issue; 

//redirect for future references
// if (this.props.issueClicked) {
//     return <Redirect to='/info' />
// }