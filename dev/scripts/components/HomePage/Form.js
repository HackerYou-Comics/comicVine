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

class Form extends React.Component {
    constructor() {
        super();

        this.state = {
            userChoice: 'issues',
            searchInput: '',
            enteredInput: '',
            searchResults: [],
            submitted: false,
            individualId: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.grabIndividualIdFromIssue = this.grabIndividualIdFromIssue.bind(this);
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
        this.props.router.history.push("/results");
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


    changeHandler(e) {
        this.setState({
            userChoice: e.target.value
        }, () => {
            console.log(this.state.userChoice);
        })
    }

    //goes and grabs the "id" from the li element of whatever that is clicked from issue/publisher
    grabIndividualIdFromIssue(id){
        console.log(id);
        this.setState({
            individualId: id
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

    

    render() {
        //redirect for future references
        // console.log(this.state.submitted);
        // if (this.state.submitted) {
        //     return <Redirect to='/' />
        // }
        return (
                <div className='results'>
                    <form action="" onSubmit={this.submitHandler}>
                        <input type="text" onChange={this.inputHandler} value={this.state.searchInput} />
                        <select onChange={this.changeHandler} name="" id="">Page
                            <option value="issues">Issue</option>
                            <option value="publishers">Publisher</option>
                        </select>
                        <button>Search</button>
                    </form>
                    <Route path="/results" render={() => {
                        return (
                            <Results
                                userChoice={this.state.userChoice}
                                results={this.state.searchResults}
                                issueClicked={this.props.issueClicked}
                                libraryId={this.props.libraryId}
                                // handleIssueClick={this.handleIssueClick}

                                //pass callback function to issue to grab the data of the individual "id" of what is clicked
                                grabId={this.grabIndividualIdFromIssue}
                            />
                        )
                    }
                    } />
                    {/* <Route exact path={`/${this.props.infoId}`} Component={InfoPage} /> */}
                    <Route exact path="/info/:infoId" render={() => {
                        return (
                            <InfoPage
                                individualId={this.state.individualId} 
                                allSearches={this.state.searchResults}
                                userChoice={this.state.userChoice}
                            />
                        )
                    }} />

                </div>
           
        )
    }
}

export default Form;