import React from 'react';
import Issue from '../Issue';

class Results extends React.Component{
    constructor(){
        super();

    }

    render(){
        if (this.props.results !== []) {
            return (
                <ul>
                    {console.log(this.props.results)}
                    {this.props.results.map((result, index) => {
                        console.log(result);
                        return (
                            <Issue
                                key={result.id}
                                issueId={result.id}
                                // issueImg={result.image.medium_url}
                                issueImg={result.image.icon_url}
                                issueName={result.name}
                                issueNumber={result.issue_number}
                                issueDescription={result.description}
                                handleIssueClick={this.handleIssueClick} />
                        )
                    })}
                </ul>
            )
        }
    }
}

export default Results;