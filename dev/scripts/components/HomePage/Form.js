import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import Results from './Results';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Redirect
} from 'react-router-dom';
//created components
import InfoPage from '../InfoPage/InfoPage';

//comicVine Api Key
const apiKey = '9ae979acd25cd191fdc36c5a39ff47c355199161';

class Form extends React.Component{
    constructor(){
        super();

        this.state = {
            userChoice: '',
            searchInput: '',
            enteredInput: '',
            searchResults: [],
            volumeIssuesArray: [],
            submitted: false,
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleIssueClick = this.handleIssueClick.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    //----------------
    // Event handler
    //----------------
    inputHandler(e) {
        this.setState({
            searchInput: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        const inputClone = this.state.searchInput;
        this.setState({
            enteredInput: inputClone,
            searchResults: [],
            submitted: true,
        }, () => {
            // console.log(this.state.enteredInput);
            // console.log(this.state.submitted);
            
            this.getApi(this.state.userChoice);
        })
    }

    handleIssueClick(volumeId) {
        this.setState({
            selectedIssueId: volumeId,
        }, () => {
            // console.log(this.state.selectedIssueId);
            this.getVolumes(volumeId);
        })
    }

    changeHandler(e) {
        this.setState({
            userChoice: e.target.value
        }, () => {
            console.log(this.state.userChoice);
        })
    }

    //-----------
    // Api Calls
    //-----------
    getApi(searchChoice) {
        //API call
        // console.log(this.state.enteredInput);
        axios({
            url: "http://proxy.hackeryou.com",
            method: "GET",
            dataResponse: "jsonp",
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `http://www.comicvine.com/api/${searchChoice}`,
                params: {
                    api_key: apiKey,
                    format: 'json',
                    filter: `name:${this.state.enteredInput}`
                },
                proxyHeaders: {
                    'headers_params': 'value'
                },
                xmlToJSON: false
            }
        }).then((res) => {
            console.log(res.data);

            //results of the data in an array
            const apiArray = res.data.results;

            //clone searchResults state
            const searchResultsClone = [...this.state.searchResults];
            for (let i = 0; i < apiArray.length; i++) {
                searchResultsClone.push(apiArray[i]);
            }

            this.setState({
                searchResults: searchResultsClone
            }, () => {
                console.log(this.state.searchResults);
            })

        });
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
            if(vol.data.error === 'Object Not Found'){
                console.log("No volume :(");
                
            }else{
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

                this.setState({
                    volumeIssuesArray: reducedArray
                })
            }
        });
    }

    render(){
        //redirect for future references
        // console.log(this.state.submitted);
        // if (this.state.submitted) {
        //     return <Redirect to='/' />
        // }
        return(
            <Router>
                <div>
                    <form action="" onSubmit={this.submitHandler}>
                        <input type="text" onChange={this.inputHandler} value={this.state.searchInput} />
                        <select onChange={this.changeHandler} name="" id="">Page
                            <option value="issues">Search by</option>
                            <option value="issues">Issue</option>
                            <option value="publishers">Publisher</option>
                        </select>
                        <button>Search</button>
                    </form>
                    <Route exact path="/" render={ () =>{
                        return(

                    <Results
                        userKey={this.props.userKey}    
                        userChoice={this.state.userChoice}
                        results={this.state.searchResults}
                        handleIssueClick={this.handleIssueClick}
                        issueClicked={this.props.issueClicked}
                        volumesIssueArray={this.state.volumeIssuesArray}/>
                        )}
                    }/>
                    <Route exact path="/:infoId" render={() =>{
                        return (
                            <InfoPage
                                volumeIssuesArray={this.state.volumeIssuesArray}/>
                        )
                    }} />

                </div>
            </Router>
        )
    }
}

export default Form;

