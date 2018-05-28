import React from 'React';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase-config';
import axios from 'axios';
import Qs from 'qs';

//comicVine Api Key
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Issue extends React.Component{
    constructor(){
        super();
        this.state = {
            userKey: '',
            libraryInfo: {},
            volumeIssuesArray: []
        }
        this.handleLibrary = this.handleLibrary.bind(this);
        this.singleHandler = this.singleHandler.bind(this);
        this.getVolumes = this.getVolumes.bind(this);
    }
    componentDidMount(){
        this.setState({
            userKey: this.props.userKey,
        })
    }


    // handleIssueClick(volumeId) {
    //     this.setState({
    //         selectedIssueId: volumeId,
    //     }, () => {
    //         // console.log(this.state.selectedIssueId);
    //         this.getVolumes(volumeId);
    //     })
    // }

    //grabs the firstChild's "id" of the <Link> tag. this case is the <li>
    singleHandler(e){
        this.props.grabId(e.currentTarget.firstChild.id);
        // this.getVolumes(this.props.infoId);
        this.getVolumes(this.props.infoId);
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

    //makes the API call to get volume data based on inital api call's returned volume id
    getVolumes(volumeId) {

        axios({
            url: "http://proxy.hackeryou.com",
            method: "GET",
            dataResponse: "json",
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                // "https://comicvine.gamespot.com/api/volume/4050-796/"
                reqUrl: `https://comicvine.gamespot.com/api/volume/4050-${volumeId}`,
                params: {
                    api_key: apiKey,
                    format: 'json'
                },
                proxyHeaders: {
                    'headers_params': 'value'
                },
                xmlToJSON: false
            }
        }).then((vol) => {
            if (vol.data.error === 'Object Not Found') {
                console.log("No volume :(");

            } else {
                //volume data and all the issues in the volume
                const volIssues = vol.data.results.issues;
                //volumeIssuesArray clone
                const volumeIssuesArrayClone = [...volumeIssuesArrayClone];
                let reducedArray = [];
                //only returns 10. over 900 crashes browser
                for (let i = 0; i < 10; i++) {
                    volumeIssuesArrayClone.push(volIssues[i]);
                }
                //first array is undefined for some reason
                //filter all arrays if they are undefined
                reducedArray = volumeIssuesArrayClone.filter(issue => issue !== undefined);

                // this.setState({
                //     volumeIssuesArray: reducedArray
                // }, () => {
                //     console.log(this.state.volumeIssuesArray);
                // })
                console.log(reducedArray);
            }
        });
    }

    render(){
        return(
            <div>
                <Link to={`/${this.props.infoId}`} onClick={this.singleHandler}>
                    {/* adding unique id to each li */}
                    <li id={this.props.id}>
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