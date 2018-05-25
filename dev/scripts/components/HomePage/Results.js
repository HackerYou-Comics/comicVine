import React from 'react';
import Issue from '../Issue';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

class Results extends React.Component{
    constructor(){
        super();

    }

    render(){
        if (this.props.results !== []) {
            return (
                <ul>
                    {this.props.results.map((result, index) => {
                        return (
                            <Link key={result.id} to={`info/${result.id}`}>
                                <Issue
                                    issueId={result.id}
                                    // issueImg={result.image.medium_url}
                                    issueImg={result.image.icon_url}
                                    issueName={result.name}
                                    issueNumber={result.issue_number}
                                    issueDescription={result.description}
                                    handleIssueClick={this.props.handleIssueClick} />
                            </Link>

                        )
                    })}
                </ul>
            )
        }
    }
}

export default Results;