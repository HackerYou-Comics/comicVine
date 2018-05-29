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
            libraryInfo: {},
        }
        this.handleLibrary = this.handleLibrary.bind(this);
        this.singleHandler = this.singleHandler.bind(this);
    }


    // handleIssueClick(volumeId) {
    //     this.setState({
    //         selectedIssueId: volumeId,
    //     }, () => {
    //         // console.log(this.state.selectedIssueId);
    //         this.getVoluqmes(volumeId);
    //     })
    // }

    //grabs the firstChild's "id" of the <Link> tag. this case is the <li>
    singleHandler(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.props.grabId(e.currentTarget.firstChild.id);
    }

    handleLibrary(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        const currentUser = firebase.auth().currentUser.uid;

        this.props.libraryId(this.props.issueName + this.props.infoId);

        const dbRef = firebase.database().ref(`users/library/${currentUser}/${this.props.issueName + this.props.infoId}`)
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
            <React.Fragment>
               
                    {/* adding unique id to each li */}
                        
                <Link to={`/info/${this.props.infoId}`} onClick={this.singleHandler}>
                    <div id={this.props.id}>
                        <img src={this.props.issueImg} alt={this.props.issueName} className='issueImg'/>
                    </div>
                </Link>    
                    <div className="overlay">
                        <p>{this.props.issueName}</p>
                        <p>{this.props.issueNumber}</p>
                        <div className="buttonContainer">
                            <button value="wishList" onClick={this.handleLibrary}><i className="fas fa-star"></i></button>
                            <button value="archive" onClick={this.handleLibrary}><i className="fas fa-archive"></i></button>
                        </div>
                    </div>
                
            </React.Fragment>
        )
    }

}

export default Issue; 

//redirect for future references
// if (this.props.issueClicked) {
//     return <Redirect to='/info' />
// }